import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";


function LoginPage() {
  const navigate = useNavigate();
    const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // 🔜 ต่อ API ทีหลัง
    console.log("LOGIN:", { email, password });
    const success = login(email, password);

    if (!success) {
    toast.error("Invalid email or password");
    return;
  }

  toast.success("Login successful");

  setTimeout(() => {
    navigate("/");
  }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="w-[343px] bg-(--color-brown-100) rounded-2xl p-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Log in
        </h1>

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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border "
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white rounded-full py-3 mb-4"
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
    </div>
  );
}

export default LoginPage;
