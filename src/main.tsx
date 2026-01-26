import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import LoginModal from "@/features/auth/components/LoginModal";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      {/* mount modal globally so any openLoginModal() opens it */}
      <LoginModal />
    </AuthProvider>
  </React.StrictMode>
);
