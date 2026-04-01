import { useState } from "react";
import { supabase } from "@/lib/supabase";
import ConfirmResetPasswordModal from "../components/ConfirmResetPasswordModal";

export default function ResetPasswordPage() {
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setOpenModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
      setError(errorMessage);
    }
  };

  return (
    <div className="px-15">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-(--color-brown-300)">
        <h1 className="text-xl font-semibold">
          Reset password
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-6 py-2 text-sm text-white bg-neutral-900 rounded-full"
        >
          Reset password
        </button>
      </div>

      <div className="pt-8">
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
              Password reset successfully!
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-[480px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              placeholder="Enter current password"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-120 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              placeholder="Enter new password"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-120 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              placeholder="Confirm new password"
              required
            />
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      <ConfirmResetPasswordModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setError("");
        }}
        onConfirm={handleResetPassword}
      />
    </div>
  );
}
