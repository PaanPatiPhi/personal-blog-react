import { Routes, Route } from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AdminLayout from "@/features/admin-page/layouts/AdminLayout";

import ArticlesPage from "@/features/article/components/ArticlePage";
import ViewPostPage from "@/features/viewpostpage/components/ViewPostPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import ResetPasswordPage from "@/features/profile/pages/ResetPasswordPage";

import ArticleManagement from "@/features/admin-page/pages/ArticleManagement";
import CategoryManagement from "@/features/admin-page/pages/CategoryManagement";
import CreateArticlePage from "@/features/admin-page/pages/CreateArticlePage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* public */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* admin */}

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<ArticleManagement />} />
  <Route path="articles" element={<ArticleManagement />} />
  <Route path="articles/create" element={<CreateArticlePage />} />
  <Route path="articles/:id/edit" element={<CreateArticlePage />} />
  <Route path="categories" element={<CategoryManagement />} />
</Route>


    </Routes>
  );
}
