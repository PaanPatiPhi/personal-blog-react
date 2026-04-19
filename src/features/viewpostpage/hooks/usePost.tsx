// import { useEffect, useState } from "react";
// import axios from "axios";

// export type Post = {
//   id: number;
//   image: string;
//   category: string;
//   title: string;
//   description: string;
//   author: string;
//   authorImage: string;
//   date?: string;
//   content: string;
//   likes: number;
// };

// export function usePost(id?: string, initialPost?: Post | null) {
//   const [post, setPost] = useState<Post | null>(initialPost ?? null);
//   const [loading, setLoading] = useState(!initialPost);
//   const [error, setError] = useState(false);


//   useEffect(() => {
//     if (!id) return;
//     if (post && post.content) return;

//     let cancelled = false;
//     setLoading(true);

// axios
//       // .get(`https://blog-post-project-api.vercel.app/posts/${id}`)
//       .get(`http://localhost:4002/posts/${id}`)
//       .then((res) => {
//         if (!cancelled) {
//           console.log(res.data)
//           setPost(res.data.posts ?? res.data);}
//       })
//       .catch(() => {
//         if (!cancelled) setError(true);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });


//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   return { post, loading, error };
// }

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export type Post = {
  id: number;
  image: string;
  category_id: number;
  title: string;
  description: string;
  date: string;      // ❗ ไม่ optional
  content: string;
};

export function usePost(id?: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    api
      .get(`/posts/${id}`)
      .then((res) => {
        if (!cancelled) {
          const data = res.data.posts ?? res.data; // กัน API shape
          setPost(data);
        }
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

