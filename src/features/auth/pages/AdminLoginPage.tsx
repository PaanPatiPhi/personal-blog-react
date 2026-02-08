import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../components/AdminLoginForm";
import Toast from "@/shared/components/Toast";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setShowSuccess(true);

    // redirect หลัง toast โชว์
    setTimeout(() => {
      navigate("/admin");
    }, 1200);
  };

return (
  <>
    <Toast
      show={showSuccess}
      title="Login successful"
      description="Redirecting to admin dashboard"
      type="success"
    />

    <AdminLoginForm onSuccess={handleLoginSuccess} />
  </>
);

}
