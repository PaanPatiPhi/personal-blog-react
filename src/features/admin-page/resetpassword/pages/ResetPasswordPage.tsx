import { useState } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import ConfirmResetPasswordModal from "../components/ConfirmResetPasswordModal";

export default function ResetPasswordPage() {
  const [openModal, setOpenModal] = useState(false);


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
        <ResetPasswordForm />
      </div>

      {/* Confirm modal */}
      <ConfirmResetPasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          console.log("confirm reset password");
          // TODO: call reset password API
        }}
      />
    </div>
  );
}
