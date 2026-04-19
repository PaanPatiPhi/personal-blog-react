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

      console.log('Request Headers:', {
        'Content-Type': 'application/json',
        'Authorization': api.defaults.headers.common.Authorization || 'No Authorization header'
      });
      console.log('Full Headers Object:', api.defaults.headers);
      console.log('Common Headers:', api.defaults.headers.common);
      console.log('Request Payload:', payload);

      const res = await api.put(`/posts/${postId}`, payload);

      return res.data;

    } catch (err) {
      console.log('Update Post Error:', (err as any)?.response?.data || (err as any)?.message || err)

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