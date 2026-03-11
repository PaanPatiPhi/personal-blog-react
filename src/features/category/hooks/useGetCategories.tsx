import { api } from "@/lib/api";
import { useEffect, useRef, useState } from "react";

/**
 * type สำหรับข้อมูล category
 */
export type Category = {
  id: number;
  name: string;
};

/**
 * Hook สำหรับดึงรายการ category ทั้งหมด
 */
function useGetCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoadingCat, setIsLoadingCat] = useState(false);
  const [isErrorCat, setIsErrorCat] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // ถ้ามี request เก่าอยู่ → ยกเลิกก่อน
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoadingCat(true);
    setIsErrorCat(false);

    api
      .get("/categories", {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (
          err?.name !== "CanceledError" &&
          err?.message !== "canceled"
        ) {
          setIsErrorCat(true);
        }
      })
      .finally(() => {
        setIsLoadingCat(false);
        controllerRef.current = null;
      });

    return () => controller.abort();
  }, []);

  return {
    data,
    isLoadingCat,
    isErrorCat,
  };
}

export default useGetCategories;