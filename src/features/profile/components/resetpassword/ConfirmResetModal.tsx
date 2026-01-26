// features/profile/components/ConfirmResetModal.tsx
type Props = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmResetModal({
  open,
  loading,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-white rounded-2xl p-6 w-[360px] shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-400"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-2">
          Reset password
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Do you want to reset your password?
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-full border"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-full bg-black text-white"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
}
