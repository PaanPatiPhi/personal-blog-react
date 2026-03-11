import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";
import Toast from "@/shared/components/Toast";

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const data = {
      email,
      password,
    };
    // basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      await adminLogin(data);
      // ✅ show success toast
      setShowSuccessToast(true);
      setToastTitle("Login successfully");
      setToastDescription("Admin has been successfully logged in.");
      setToastType("success");
      setShowToast(true);
      // ✅ redirect หลัง toast แสดง
      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* ✅ Success Toast */}
      <Toast
        show={showSuccessToast}
        title="Login successful"
        description="Welcome to admin panel"
        type="success"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-[#EFEEEB] rounded-2xl px-[120px] py-[60px] w-[795px]"
      >
        <p className="text-center text-sm text-orange-400 mb-1">Admin panel</p>
        <h1 className="text-center text-2xl font-semibold mb-8">Log in</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className={`w-full border rounded px-3 py-2 bg-white ${
                error ? "border-red-400" : "border-(--color-brown-300)"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className={`w-full border rounded px-3 py-2 bg-white ${
                error ? "border-red-400" : "border-(--color-brown-300)"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mx-auto block bg-black text-white px-6 py-2 rounded-full"
          >
            Log in
          </button>
        </div>

        {error && (
          <div className="mt-6 bg-red-500 text-white text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}
      </form>
      <Toast
        show={showToast}
        title={toastTitle}
        description={toastDescription}
        type={toastType}
      />
    </div>
  );
}
