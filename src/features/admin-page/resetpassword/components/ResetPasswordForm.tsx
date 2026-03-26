import { useState } from "react";
import { supabase } from "@/lib/supabase";
import FormInput from "./FormInput";

export default function ResetPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-6">
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
      
      <FormInput 
        label="Current password" 
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      <FormInput 
        label="New password" 
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <FormInput 
        label="Confirm new password" 
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2 text-sm text-white bg-neutral-900 rounded-full disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset password"}
      </button>
    </form>
  );
}