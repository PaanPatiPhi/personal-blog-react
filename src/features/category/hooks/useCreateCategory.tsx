import { api } from "@/lib/api";
import { useState } from "react";

export type CreateCategoryPayload = {
  name: string;
};

function useCreateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const createCategory = async (payload: CreateCategoryPayload) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const res = await api.post("/categories", payload);
      return res.data;
    } catch (err) {
      setIsError(true);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCategory,
    isLoading,
    isError,
  };
}

export default useCreateCategory;