// import { useNavigate } from "react-router-dom";

// type LoginModalProps = {
//   open: boolean;
//   onClose: () => void;
// };

// function LoginModal({ open, onClose }: LoginModalProps) {
//   const navigate = useNavigate();

//   if (!open) return null;

//   const goToSignup = () => {
//     onClose();
//     navigate("/signup");
//   };

//   const goToLogin = () => {
//     onClose();
//     navigate("/login");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/50"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-white w-[343px] rounded-2xl p-6 z-10">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500"
//         >
//           ✕
//         </button>

//         <h2 className="text-xl font-semibold text-center mb-6">
//           Create an account to continue
//         </h2>

//         <button
//           onClick={goToSignup}
//           className="w-full bg-black text-white rounded-full py-3 mb-4"
//         >
//           Create account
//         </button>

//         <p className="text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <button
//             onClick={goToLogin}
//             className="underline"
//           >
//             Log in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginModal;
