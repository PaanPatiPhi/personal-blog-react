/**
 * useGetPublishedPost Hook
 * 
 * หน้าที่: ดึงข้อมูลบทความที่ publish แล้วจาก API
 * รองรับ: pagination, category filtering, keyword search
 * 
 * การทำงาน:
 * 1. เรียก API /posts/published ด้วย params (page, category, search)
 * 2. จัดการ state: blogData, isLoading, isError, hasMore
 * 3. รองรับ infinite scroll ด้วย handleLoadMore
 * 4. มีการ reset state เมื่อ category/keyword เปลี่ยน
 * 5. มีการ cancel request ป้องกัน race condition
 */

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";

// จำนวนบทความต่อหน้า (pagination)
const LIMIT = 6;

// ประเภทข้อมูลสำหรับบทความ
interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  category_name: string;
  date: string;
  content: string;
  status_id: number;
  likes_count: number;
}

// ประเภทข้อมูลสำหรับ parameters ที่ส่งเข้า hook
interface UseGetPostParams {
  category: string;  // ชื่อ category สำหรับ filter ("" สำหรับทั้งหมด)
  keyword: string;   // คำค้นหาสำหรับ search ("" สำหรับทั้งหมด)
}

function useGetPublishedPost({ category, keyword }: UseGetPostParams) {
  // ========== STATE MANAGEMENT ==========
  const [blogData, setBlogData] = useState<Blog[]>([]);      // เก็บข้อมูลบทความทั้งหมด
  const [page, setPage] = useState(1);                        // หน้าปัจจุบัน (pagination)
  const [hasMore, setHasMore] = useState(true);               // ยังมีข้อมูลอีกไหม (สำหรับ infinite scroll)
  const [isLoading, setIsLoading] = useState(false);          // กำลังโหลดข้อมูลอยู่หรือไม่
  const [isError, setIsError] = useState(false);              // เกิดข้อผิดพลาดหรือไม่

  // ========== REFS FOR STATE MANAGEMENT ==========
  const isFetching = useRef(false);                          // ป้องกันการเรียกซ้ำระหว่าง fetch
  const currentController = useRef<AbortController | null>(null); // สำหรับ cancel request
  const prevParams = useRef({ category, keyword });          // เก็บค่า params ก่อนหน้าเพื่อตรวจการเปลี่ยนแปลง

  // ========== API CALL FUNCTION ==========
  const fetchPosts = async () => {
    setIsLoading(true);
    setIsError(false);

    // ยกเลิก request เก่า (ป้องกัน race condition)
    currentController.current?.abort();

    // สร้าง AbortController ใหม่สำหรับ request ปัจจุบัน
    const controller = new AbortController();
    currentController.current = controller;

    try {
      // ========== สร้าง API PARAMETERS ==========
      const params = {
        page,                    // หน้าปัจจุบันสำหรับ pagination
        limit: LIMIT,           // จำนวนบทความต่อหน้า (6)
        
        // Category filtering: "" หมายถึงไม่ filter (แสดงทั้งหมด)
        // "Highlight" เป็นพิเศษ ให้แสดงทุก category
        category: category === "Highlight" ? "" : category,
        
        // Keyword search: "" หมายถึงไม่ค้นหา (แสดงทั้งหมด)
        search: keyword || "",
      };

      // ========== API CALL ==========
      const res = await api.get(
        "/posts/published",
        { params }
      );

      // ========== PROCESS RESPONSE ==========
      const newPosts: Blog[] = res.data.posts ?? [];

      // ========== STATE UPDATE ==========
      // ป้องกัน duplicate articles (กรณี infinite scroll)
      setBlogData((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = newPosts.filter((p) => !existingIds.has(p.id));
        const result = [...prev, ...unique];
        
        return result;
      });

      // ========== CALCULATE HASMORE ==========
      // ใช้ข้อมูลจาก backend ก่อน (แม่นสุด)
      let more = false;

      const currentPage = res.data?.currentPage;
      const totalPages = res.data?.totalPages;

      if (
        typeof currentPage === "number" &&
        typeof totalPages === "number"
      ) {
        more = currentPage < totalPages;
      } else {
        // fallback: ถ้า backend ไม่ส่งมา ให้ดูจากจำนวน posts
        more = newPosts.length >= LIMIT;
      }

      setHasMore(more);
    } catch (err: any) {
      // ========== ERROR HANDLING ==========
      // ถ้าเป็น error จากการ abort request ให้ ignore (ไม่ต้องทำอะไร)
      if (
        err?.name === "CanceledError" ||
        err?.message === "canceled"
      ) {
        return;
      }

      // ถ้าเป็น error จริง ให้แสดง error state
      console.error("Error fetching posts:", err);
      setIsError(true);
    } finally {
      // ========== CLEANUP ==========
      // ตั้งค่า loading เป็น false เสมอ (ไม่ว่าจะสำเร็จหรือ error)
      setIsLoading(false);
      isFetching.current = false;
    }
  };

  /**
   * 🔁 Effect หลัก (single source of truth)
   *
   * ทำ 2 อย่าง:
   * 1. ถ้า category / keyword เปลี่ยน → reset state แล้ว fetch ใหม่
   * 2. fetch data ตาม page ปัจจุบัน
   */
  useEffect(() => {
    // ตรวจสอบว่ามีการเปลี่ยนแปลง params หรือไม่
    const paramsChanged =
      prevParams.current.category !== category ||
      prevParams.current.keyword !== keyword;

    if (paramsChanged) {
      // ========== RESET STATE (เมื่อ params เปลี่ยน) ==========
      
      // ยกเลิก request เก่า
      currentController.current?.abort();

      // รีเซ็ตข้อมูลทั้งหมด
      setBlogData([]);
      setHasMore(true);

      // อัพเดทค่า params ล่าสุด
      prevParams.current = { category, keyword };

      // ถ้ายังไม่ใช่ page 1 → set แล้วรอ effect ยิงใหม่
      if (page !== 1) {
        setPage(1);
        return;
      }

      // ถ้า page = 1 อยู่แล้ว → fetch ต่อได้เลย
      fetchPosts();
    } else {
      // ========== NORMAL FETCH (เมื่อ page เปลี่ยน) ==========
      fetchPosts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, keyword]); // รันเมื่อ page, category, หรือ keyword เปลี่ยน

  /**
   * ➕ ใช้สำหรับ infinite scroll / load more
   * 
   * การทำงาน:
   * 1. ตรวจสอบว่ากำลังโหลดอยู่หรือไม่
   * 2. ตรวจสอบว่ายังมีข้อมูลอีกไหม
   * 3. เพิ่ม page แล้วรอ useEffect ทำงาน
   */
  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;

    setPage((prev) => prev + 1);
  };

  // ========== RETURN VALUES ==========
  // ส่งค่าออกไปให้ component ใช้งาน
  return {
    blogData,      // ข้อมูลบทความทั้งหมด
    isLoading,     // กำลังโหลดอยู่หรือไม่
    isError,       // เกิดข้อผิดพลาดหรือไม่
    handleLoadMore, // ฟังก์ชันสำหรับ infinite scroll
    hasMore,       // ยังมีข้อมูลอีกไหม
  };
}

export default useGetPublishedPost;