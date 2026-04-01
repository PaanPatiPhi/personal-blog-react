// features/profile/components/ResetPasswordForm.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import ConfirmResetModal from "./ConfirmResetModal"

export default function ResetPasswordForm() {
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (next !== confirm) {
      setError("Password does not match");
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: next
      });

      if (error) {
        throw error;
      }

      setOpenConfirm(false);
      alert("Password updated");
      
      // Clear form
      setNext("");
      setConfirm("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update password";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-(--color-brown-200) p-10 rounded-2xl w-[550px] gap-2 flex flex-col">
        <p>New password</p>
        <input
          type="password"
          placeholder="New password"
          className="w-full mb-3 p-2 rounded bg-white"
          onChange={(e) => setNext(e.target.value)}
        />

        <p>Confirm new password</p>
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full mb-3 p-2 rounded bg-white"
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={() => setOpenConfirm(true)}
          className="mt-4 bg-black text-white px-6 py-2 rounded-full w-[208px]"
        >
          Reset password
        </button>
      </div>

      <ConfirmResetModal
        open={openConfirm}
        loading={loading}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleReset}
      />
    </>
  );
}
