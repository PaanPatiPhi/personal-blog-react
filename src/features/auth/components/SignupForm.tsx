import { useState } from "react";
import SignupSuccess from "./SignupSuccess";
import { useNavigate } from "react-router-dom";

type SignupFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type SignupFormErrors = Partial<Record<keyof SignupFormValues, string>>;

type SignupFormProps = {
  onSuccess?: () => void;
};

function SignupForm({ onSuccess }: SignupFormProps) {
  const [form, setForm] = useState<SignupFormValues>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = (): SignupFormErrors => {
    const newErrors: SignupFormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // mock API
      console.log("signup payload:", form);
      await new Promise((res) => setTimeout(res, 800));

      // persist mock user for demo
      const mockUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        username: form.username,
      };
      localStorage.setItem("mock_user", JSON.stringify(mockUser));

      setRegistered(true);
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return <SignupSuccess onContinue={onSuccess ? onSuccess : () => navigate("/")} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full rounded-xl border px-4 py-3"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm mb-1">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full rounded-xl border px-4 py-3"
        />
        {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-xl border px-4 py-3"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm mb-1">Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-xl border px-4 py-3 pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-black text-white rounded-full py-3 disabled:opacity-60"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>

      {!registered && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-black underline ml-1"
          >
            Login
          </button>
        </div>
      )}
    </form>
  );
}

export default SignupForm;
