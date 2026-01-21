import { useState } from "react";

type CommentInputProps = {
  onSubmit: (text: string) => void;
};

function CommentInput({ onSubmit }: CommentInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <div className="flex flex-col gap-3">
      <span>Comment</span>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        className="bg-white border rounded-2xl p-3"
        placeholder="What are your thoughts?"
      />

      <button
        onClick={handleSend}
        className="bg-(--color-brown-600) text-white rounded-full w-[121px] h-[48px]"
      >
        Send
      </button>
    </div>
  );
}

export default CommentInput;
