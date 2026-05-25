import { api } from "@/lib/api";
import { useState } from "react";

export type CreatePostPayload = {
  image: string;
  category_id: number;
  title: string;
  description: string;
  content: string;
  status_id: 1 | 2;
};

function useCreatePost() {
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isErrorPost, setIsErrorPost] = useState(false);

  const createPost = async (payload: CreatePostPayload) => {
  try {
    setIsLoadingPost(true);
    setIsErrorPost(false);

    const res = await api.post("/posts", payload);

    return res.data;
  } catch (err: unknown) {
  console.error(err);
  setIsErrorPost(true);
  throw err;
  } finally {
    setIsLoadingPost(false);
  }
};

  return {
    createPost,
    isLoadingPost,
    isErrorPost,
  };
}

export default useCreatePost;