import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/features/auth/contexts/auth-provider";

export function usePostLikes(postId?: string) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch initial likes and user's like status
  useEffect(() => {
    if (!postId) return;

    const fetchLikes = async () => {
      try {
        setLoading(true);
        
        // Get total likes count
        const likesResponse = await api.get(`/likes/posts/${postId}/likes/count`);
        const totalLikes = likesResponse.data.count || 0;
        setLikes(totalLikes);
        
        // Check if current user liked this post
        if (user) {
          try {
            const userLikeResponse = await api.get(`/likes/posts/${postId}/likes/user/${user.id}`);
            setIsLiked(userLikeResponse.data.liked || false);
          } catch (err) {
            // If no like record exists, user hasn't liked
            setIsLiked(false);
          }
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
        setLikes(0);
        setIsLiked(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [postId, user?.id]);

  const toggleLike = async () => {
    if (!user || !postId) return;

    setLoading(true);
    try {
      const requestData = {
        user_id: user.id
      };

      
      const response = await api.post(`/likes/posts/${postId}/likes`, requestData);
 
      
      // Update state based on response
      if (response.data.liked) {
        setLikes(prev => prev + 1);
        setIsLiked(true);
      } else {
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      }
    } catch (error: any) {
      console.error("Error toggling like:", error);
      console.error("Error response:", error.response?.data);
      
      // Show user-friendly error
      if (error.response?.status === 500) {
        console.error("Backend error - check server logs");
      }
    } finally {
      setLoading(false);
    }
  };

  return { likes, isLiked, toggleLike, loading };
}
