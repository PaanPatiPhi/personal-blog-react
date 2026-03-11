import { api } from "@/lib/api";
import { useEffect, useRef, useState } from "react";

/**
 * type สำหรับข้อมูลบทความแบบ detail
 * ใช้กับหน้า view / edit
 */
export type PostDetail = {
  id: number;
  image: string;
  category_id: number;
  title: string;
  description: string;
  date: string;
  content: string;
  status_id: 1 | 2;
  like_count:number;
};

/**
 * Hook สำหรับดึงข้อมูลบทความตาม id
 * ใช้กับหน้า Article Detail หรือ Admin Edit
 */
function useGetPostById(postId?: number) {
  // state เก็บข้อมูลบทความ (ได้ทีละ 1 ชิ้น)
  const [data, setData] = useState<PostDetail | null>(null);

  // state สำหรับเช็คสถานะกำลังโหลด
  const [isLoading, setIsLoading] = useState(false);

  // state สำหรับเช็ค error
  const [isError, setIsError] = useState(false);

  // เก็บ AbortController ไว้ยกเลิก request ก่อนหน้า
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // ถ้าไม่มี postId ไม่ต้องยิง API
    if (!postId) return;

    // ถ้ามี request เก่าอยู่ → ยกเลิกก่อน
    controllerRef.current?.abort();

    // สร้าง controller ใหม่สำหรับ request รอบนี้
    const controller = new AbortController();
    controllerRef.current = controller;

    // เริ่มโหลด
    setIsLoading(true);
    setIsError(false);

    api
      // เรียก API ตาม id ของบทความ
      .get(`/posts/${postId}`, {
        // ส่ง signal เพื่อรองรับ abort
        signal: controller.signal,
      })
      .then((res) => {
        // ถ้าได้ข้อมูล → เก็บลง state
        setData(res.data);
      })
      .catch((err) => {
        // ถ้า error ไม่ใช่จากการ abort → ถือว่า error จริง
        if (
          err?.name !== "CanceledError" &&
          err?.message !== "canceled"
        ) {
          setIsError(true);
        }
      })
      .finally(() => {
        // ปิดสถานะโหลด
        setIsLoading(false);

        // เคลียร์ controller
        controllerRef.current = null;
      });

    // cleanup: ถ้า component unmount → ยกเลิก request
    return () => controller.abort();
  }, [postId]);

  // ส่งค่าที่ component ต้องใช้
  return {
    data,
    isLoading,
    isError,
  };
}

export default useGetPostById;
