import { useAuth } from "@/features/auth/contexts/auth-provider";
import { notifyNewLike } from "@/lib/notifications";

export function usePostActions({
  isLoggedIn,
  onRequireLogin,
  title,
  postId,
}: {
  isLoggedIn: boolean;
  onRequireLogin: () => void;
  title: string;
  postId: string;
}) {
  const { user } = useAuth();
  
  const handleLike = async () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    
    console.log("LIKE POST");
    
    // Send notification to admin
    if (user) {
      await notifyNewLike(postId, title, user.user_metadata?.name || user.email || "Anonymous");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  return {
    handleLike,
    handleCopyLink,
    handleShareFacebook,
    handleShareLinkedIn,
    handleShareTwitter,
  };
}