import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export type Comment = {
  id: string;
  user_id: string;
  post_id: string;
  comment_text: string;
  created_at: string;
  users?: {
    username: string;
    name: string;
    profile_pic: string | null;
  };
};

export type SupabaseComment = {
  id: string;
  user_id: string;
  post_id: string;
  comment_text: string;
  created_at: string;
  username?: string;
  profile_pic?: string | null;
  user?: {
    username?: string;
    name?: string;
    profile_pic?: string | null;
  };
};

type ApiComment = {
  id: string;
  user_id: string;
  post_id: string;
  comment_text: string;
  created_at: string;
  username: string;
  profile_pic: string | null;
};

export function useComments(postId?: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshComments = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);

        const comment = await api.get(`/comments/post/${postId}`);
        console.log(comment)

        console.log("Fetched comments:", comment.data);
        
        // Map API response to match Comment type
        const commentsWithUsers = comment.data.comments.map((c: ApiComment) => ({
          ...c,
          users: {
            username: c.username,
            name: c.username, // Use username as name
            profile_pic: c.profile_pic
          }
        }));
        
        setComments(commentsWithUsers || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, refreshKey]);

  const addComment = (newComment: SupabaseComment) => {
    console.log("Adding new comment:", newComment);
    console.log("newComment.username:", newComment.username);
    console.log("newComment.profile_pic:", newComment.profile_pic);
    
    // Transform the new comment to match the expected format with users object
    const transformedComment: Comment = {
      ...newComment,
      users: {
        username: newComment.user?.username || newComment.username || 'Anonymous',
        name: newComment.user?.name || newComment.username || 'Anonymous',
        profile_pic: newComment.user?.profile_pic || newComment.profile_pic || null
      }
    };
    
    console.log("Transformed comment:", transformedComment);
    setComments((prev) => [transformedComment, ...prev]);
  };

  return { comments, loading, error, addComment, refreshComments };
}
