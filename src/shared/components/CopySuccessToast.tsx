type CopySuccessToastProps = {
  show: boolean;
  message?: string;
};

function CopySuccessToast({
  show,
  message = "Copy link success",
}: CopySuccessToastProps) {
  if (!show) return null;

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        px-4 py-3 rounded-xl
        bg-green-500 text-white text-sm font-medium
        shadow-lg
        animate-fade-in
      "
    >
      {message}
    </div>
  );
}

export default CopySuccessToast;
