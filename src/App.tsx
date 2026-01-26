import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/shared/layout/navbar/NavBar";
import ArticlesPage from "./features/article/components/ArticlePage";
import ViewPostPage from "./features/viewpostpage/components/ViewPostPage";
import SignupPage from "./features/auth/pages/SignupPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import ResetPasswordPage from "./features/profile/pages/ResetPasswordPage";


import "./index.css";
import Snowfall from "react-snowfall";
import Footer from "./shared/layout/Footer";

function App() {
  return (

    <BrowserRouter>
    <Snowfall/>
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* อื่นๆ */}
      </Routes>
      <Footer/ >
    </BrowserRouter>

  );
}

export default App;
