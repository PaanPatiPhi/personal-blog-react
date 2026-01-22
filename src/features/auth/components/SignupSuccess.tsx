import { useNavigate } from "react-router-dom";
import React from "react";

type SignupSuccessProps = {
  onContinue?: () => void;
};

export default function SignupSuccess({ onContinue }: SignupSuccessProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-md text-center">
        <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="w-10 h-10 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold mb-2">Registration success</h3>


        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}