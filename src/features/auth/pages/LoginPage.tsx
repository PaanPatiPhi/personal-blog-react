import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";
import Toast from "@/shared/components/Toast";

function LoginPage() {
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    // ✅ validation ขั้นต่ำ
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    try {
      await userLogin(data);

      
      // ✅ Success toast สำหรับ login สำเร็จ
      setToastTitle("Login Successful");
      setToastDescription("");
      setToastType("success");
      setShowToast(true);
      
      // ❌ Hide toast หลัง 3 วินาที
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      // ❌ Error toast สำหรับ login ไม่สำเร็จ
      setToastTitle("Invalid email or password");
      setToastDescription("Error: " + error);
      setToastType("error");
      setShowToast(true);
      
      // ❌ Hide toast หลัง 3 วินาที
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="w-[343px] bg-(--color-brown-100) rounded-2xl p-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Log in</h1>

        {/* Email */}
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl border"
        />

        {/* Password */}
        <label className="block text-sm mb-1">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border "
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white rounded-full py-3 mb-4 cursor-pointer"
        >
          Log in
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have any account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
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

export default LoginPage;
