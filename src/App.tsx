import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/shared/layout/NavBar";
import ArticlesPage from "./features/article/components/ArticlePage";
import ViewPostPage from "./features/viewpostpage/components/ViewPostPage";
import SignupPage from "./features/auth/pages/SignupPage";
import LoginPage from "./features/auth/pages/LoginPage";
import { AuthProvider } from "./features/auth/context/AuthContext";

import "./index.css";
import Snowfall from "react-snowfall";
import Footer from "./shared/layout/Footer";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Snowfall/>
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* อื่นๆ */}
      </Routes>
      <Footer/ >
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
