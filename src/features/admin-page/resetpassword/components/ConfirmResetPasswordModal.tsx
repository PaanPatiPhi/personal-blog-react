interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmResetPasswordModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md rounded-2xl bg-white px-8 py-6">
          {/* close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-neutral-500 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-lg font-semibold text-center">
            Reset password
          </h2>

          <p className="mt-3 text-sm text-center text-neutral-600">
            Do you want to reset your password?
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="
                px-6 py-2 text-sm
                rounded-full
                border border-neutral-400
                text-neutral-700
                hover:bg-neutral-100
              "
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="
                px-6 py-2 text-sm
                rounded-full
                bg-neutral-900
                text-white
                hover:bg-black
              "
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
