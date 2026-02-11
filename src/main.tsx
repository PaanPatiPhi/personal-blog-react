import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "@/features/auth/context/authentication";
import LoginModal from "@/features/auth/components/LoginModal";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* mount modal globally so any openLoginModal() opens it */}
        <LoginModal />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
