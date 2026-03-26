import { useState } from "react";
import { useAddComment } from "../hooks/useAddComment";
import Toast from "@/shared/components/Toast";

type CommentInputProps = {
  postId: string;
  onCommentAdded?: () => void;
};

function CommentInput({ postId, onCommentAdded }: CommentInputProps) {
  const [value, setValue] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const { addComment, loading } = useAddComment({
    showSuccess: (message) => {
      setToastTitle("Success");
      setToastDescription(message);
      setToastType("success");
      setShowToast(true);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
    showError: (message) => {
      setToastTitle("Error");
      setToastDescription(message);
      setToastType("error");
      setShowToast(true);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
    onCommentCreated: () => {
      onCommentAdded?.();
    }
  });

  const handleSend = async () => {
    if (!value.trim()) return;

    const success = await addComment({
      post_id: postId,
      content: value.trim(),
    });

    if (success) {
      setValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span>Comment</span>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={4}
        className="bg-white border rounded-2xl p-3 resize-none"
        placeholder="What are your thoughts?"
        disabled={loading}
      />

      <button
        onClick={handleSend}
        disabled={loading || !value.trim()}
        className="bg-(--color-brown-600) text-white rounded-full w-[121px] h-[48px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {/* Use existing Toast component */}
      <Toast
        show={showToast}
        title={toastTitle}
        description={toastDescription}
        type={toastType}
      />
    </div>
  );
}

export default CommentInput;
