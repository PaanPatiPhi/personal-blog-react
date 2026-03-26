import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Blog = {
  id: number;
  image: string;
  category_id: number;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  content: string;
  status_id: number;
  introduction?: string;
};

type UseGetPostParams = {
  category?: string;
  keyword?: string;
};

const LIMIT = 100;

function useGetPost({ category, keyword }: UseGetPostParams) {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // ใช้กันยิง request ซ้ำระหว่างที่กำลัง fetch อยู่
  const isFetching = useRef(false);

  // ใช้ cancel request เก่า (เช่น เปลี่ยน category ระหว่างโหลด)
  const currentController = useRef<AbortController | null>(null);

  // เก็บค่า filter ก่อนหน้า เพื่อตรวจว่ามีการเปลี่ยนจริงไหม
  const prevParams = useRef({ category, keyword });

  const fetchPosts = async () => {
    // ❗ กันยิงซ้ำ + กันโหลดเกิน (hasMore = false)
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setIsLoading(true);
    setIsError(false);

    // ❗ cancel request เก่า (กัน race condition ระดับหนึ่ง)
    currentController.current?.abort();

    const controller = new AbortController();
    currentController.current = controller;

    try {
      const res = await axios.get(
        "http://localhost:4002/posts",
        {
          params: {
            page,
            limit: LIMIT,

            // ❗ Highlight = ไม่ filter category
            category: category === "Highlight" ? "" : category,

            // ❗ ถ้าไม่มี keyword ให้ส่งเป็น string ว่าง
            search: keyword || "",
          },
          signal: controller.signal,
        }
      );

      // DEBUG: ดู data จริงจาก API
      console.log("posts:", res.data.posts);

      const newPosts: Blog[] = res.data.posts ?? [];

      // ❗ ป้องกัน duplicate (กรณี scroll/load more)
      setBlogData((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = newPosts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...unique];
      });

      // ❗ คำนวณ hasMore
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
        // fallback: ถ้าได้ครบ LIMIT แปลว่า "อาจจะ" ยังมีหน้าเพิ่ม
        more = newPosts.length === LIMIT;
      }

      setHasMore(more);
    } catch (err: any) {
      // ❗ ignore error จากการ abort
      if (
        err?.name === "CanceledError" ||
        err?.message === "canceled"
      ) {
        // ไม่ต้องทำอะไร
      } else {
        setIsError(true);
      }
    } finally {
      // reset state หลัง fetch เสร็จ
      isFetching.current = false;
      setIsLoading(false);
      currentController.current = null;
    }
  };

  /**
   * 🔁 Effect หลัก (single source of truth)
   *
   * ทำ 2 อย่าง:
   * 1. ถ้า category / keyword เปลี่ยน → reset state
   * 2. fetch data ตาม page ปัจจุบัน
   */
  useEffect(() => {
    const paramsChanged =
      prevParams.current.category !== category ||
      prevParams.current.keyword !== keyword;

    if (paramsChanged) {
      // ❗ cancel request เดิมก่อน reset
      currentController.current?.abort();

      // reset data + pagination
      setBlogData([]);
      setHasMore(true);

      // update ค่า params ล่าสุด
      prevParams.current = { category, keyword };

      // ❗ ถ้ายังไม่ใช่ page 1 → set แล้วรอ effect ยิงใหม่
      if (page !== 1) {
        setPage(1);
        return;
      }

      // ถ้า page = 1 อยู่แล้ว → fetch ต่อได้เลย
    }

    // ❗ fetch data (ทั้ง initial load + load more)
    fetchPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, keyword]);

  /**
   * ➕ ใช้สำหรับ infinite scroll / load more
   */
  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;

    setPage((p) => p + 1);
  };

  return {
    blogData,
    isLoading,
    isError,
    hasMore,
    handleLoadMore,
  };
}

export default useGetPost;