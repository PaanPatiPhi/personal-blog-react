import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function SignupPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[380px] bg-(--color-brown-100) rounded-2xl p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Sign up
        </h1>

        <SignupForm
          onSuccess={() => {
            navigate("/login");
          }}
        />

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
