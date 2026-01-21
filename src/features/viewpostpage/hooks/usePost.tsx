import { useEffect, useState } from "react";
import axios from "axios";

export type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  content: string;
  likes: number;
};

export function usePost(id?: string, initialPost?: Post | null) {
  const [post, setPost] = useState<Post | null>(initialPost ?? null);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    if (post && post.content) return;

    let cancelled = false;
    setLoading(true);

    axios
      .get(`https://blog-post-project-api.vercel.app/posts/${id}`)
      .then((res) => {
        if (!cancelled) setPost(res.data.post ?? res.data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { post, loading, error };
}
