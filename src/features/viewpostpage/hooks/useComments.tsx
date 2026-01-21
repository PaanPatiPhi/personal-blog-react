import { useState } from "react";
import mockComments from "../data/mockComments";

export type Comment = {
  id: number;
  image: string;
  name: string;
  date: string;
  comment: string;
};

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const addComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      image: "/avatar.png",
      name: "Guest",
      date: new Date().toISOString(),
      comment: text,
    };

    setComments((prev) => [newComment, ...prev]);
  };

  return { comments, addComment };
}
