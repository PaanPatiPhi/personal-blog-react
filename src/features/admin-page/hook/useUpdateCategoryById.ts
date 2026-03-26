import { api } from "@/lib/api";
import { useState } from "react";

export type UpdateCategoryPayload = {
  id: number;
  name: string;
};

function useUpdateCategoryById() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const updateCategory = async (categoryId: number, payload: UpdateCategoryPayload) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const res = await api.put(`/categories/${categoryId}`, payload);

      return res.data;
    } catch (err) {
      setIsError(true);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCategory,
    isLoading,
    isError,
  };
}

export default useUpdateCategoryById;
