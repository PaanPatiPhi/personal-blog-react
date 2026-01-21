import type { Post } from "@/types/post";


export function searchPosts(posts: Post[], keyword: string) {
  if (!keyword.trim()) return [];

  const q = keyword.toLowerCase();

  return posts.filter((post) =>
    post.title.toLowerCase().includes(q) ||
    post.description.toLowerCase().includes(q) ||
    (post.content ?? "").toLowerCase().includes(q)
  );
}
