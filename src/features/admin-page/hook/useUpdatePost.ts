import { api } from "@/lib/api";
import { useState } from "react";

export type UpdatePostPayload = {
  title: string;
  category_id: number;
  description: string;
  content: string;
  image: string;
  status_id: 1 | 2;
};

function useUpdatePost() {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const updatePost = async (postId: number, payload: UpdatePostPayload) => {

    setIsLoading(true);
    setIsError(false);

    try {



      const res = await api.put(`/posts/${postId}`, payload);

      return res.data;

    } catch (err) {
      console.error('Update Post Error:', (err as any)?.response?.data || (err as any)?.message || err)

      setIsError(true);
      throw err;

    } finally {

      setIsLoading(false);

    }

  };

  return {
    updatePost,
    isLoading,
    isError,
  };
}

export default useUpdatePost;