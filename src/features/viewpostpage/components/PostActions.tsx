type PostActionsProps = {
  likes: number;
  onLike: () => void;
  onCopyLink?: () => void;
  onShareFacebook?: () => void;
};

function PostActions({
  likes,
  onLike,
  onCopyLink,
  onShareFacebook,
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-4 mt-6">
      <button
        onClick={onLike}
        className="flex items-center gap-1 text-sm"
      >
        👍
        <span>{likes}</span>
      </button>

      <button
        onClick={onCopyLink}
        className="text-sm underline"
      >
        Copy link
      </button>

      <button
        onClick={onShareFacebook}
        className="text-sm underline"
      >
        Share
      </button>
    </div>
  );
}

export default PostActions;
