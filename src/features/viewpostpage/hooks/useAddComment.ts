import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/features/auth/contexts/auth-provider";
import { notifyNewComment } from "@/lib/notifications";

interface CommentData {
  post_id: string;
  content: string;
}

interface ToastOptions {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

interface CommentOptions extends ToastOptions {
  onCommentCreated?: () => void;
}

export function useAddComment(toast?: CommentOptions) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (commentData: CommentData) => {
    if (!user) {
      const errorMsg = "You must be logged in to comment";
      setError(errorMsg);
      toast?.showError?.(errorMsg);
      return false;
    }

    if (!commentData.post_id) {
      const errorMsg = "Post ID is required";
      setError(errorMsg);
      toast?.showError?.(errorMsg);
      return false;
    }

    if (!commentData.content.trim()) {
      const errorMsg = "Comment cannot be empty";
      setError(errorMsg);
      toast?.showError?.(errorMsg);
      return false;
    }

    try {
      setLoading(true);
      setError(null);


      // Use 'comment_text' column based on the actual table schema
      const insertData: Record<string, unknown> = {
        post_id: commentData.post_id,
        user_id: user.id,
        comment_text: commentData.content.trim(), // Use 'comment_text' column
      };


      const { data, error } = await supabase
        .from("comments")
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      
      // Send notification to admin
      await notifyNewComment(commentData.post_id, "", user.user_metadata?.name || user.email || "Anonymous", data.id);
      
      // Just trigger re-render by calling the callback without comment data
      // This will make the page fetch fresh data from API
      toast?.onCommentCreated?.();
      
      toast?.showSuccess?.("Comment added successfully!");
      return true;
    } catch (err) {
      console.error("Error adding comment:", err);
      const errorMsg = err instanceof Error ? err.message : "Failed to add comment";
      setError(errorMsg);
      toast?.showError?.(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addComment,
    loading,
    error,
    clearError: () => setError(null),
  };
}
