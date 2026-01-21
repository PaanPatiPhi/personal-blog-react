export function usePostActions({
  isLoggedIn,
  onRequireLogin,
  title,
}: {
  isLoggedIn: boolean;
  onRequireLogin: () => void;
  title: string;
}) {
  const handleLike = () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    console.log("LIKE POST");
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
