import { api } from "@/lib/api";
import { useEffect, useRef, useState } from "react";

/**
 * type สำหรับข้อมูลบทความแบบ detail
 * ใช้กับหน้า view / edit
 */
export type CategoryDetail = {
  id: number;
  name: string;
};

/**
 * Hook สำหรับดึงข้อมูลบทความตาม id
 * ใช้กับหน้า Article Detail หรือ Admin Edit
 */
function useGetCategoryById(categoryId?: number) {

  // state เก็บข้อมูลบทความ (ได้ทีละ 1 ชิ้น)
  const [category, setCategory] = useState<CategoryDetail | null>(null);

  // state สำหรับเช็คสถานะกำลังโหลด
  const [isLoading, setIsLoading] = useState(false);

  // state สำหรับเช็ค error
  const [isError, setIsError] = useState(false);

  // เก็บ AbortController ไว้ยกเลิก request ก่อนหน้า
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setIsError(false);

    api
      .get(`/categories/${categoryId}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setCategory(res.data[0]);
      })
      .catch((err) => {
        if (err?.name !== "CanceledError" && err?.message !== "canceled") {
          setIsError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
        controllerRef.current = null;
      });

    return () => controller.abort();
  }, [categoryId]);

  useEffect(() => {
    console.log("EFFECT TEST");
  }, []);

  // ส่งค่าที่ component ต้องใช้
  return {
    category,
    isLoading,
    isError,
  };
}

export default useGetCategoryById;
