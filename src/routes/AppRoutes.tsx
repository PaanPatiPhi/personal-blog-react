import { Routes, Route } from "react-router-dom";
//main
import MainLayout from "@/shared/layout/MainLayout";
import AdminLayout from "@/features/admin-page/layouts/AdminLayout";
//article
import ArticlesPage from "@/features/article/components/ArticlePage";
import ViewPostPage from "@/features/viewpostpage/components/ViewPostPage";
//login signup
import SignupPage from "@/features/auth/pages/SignupPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import ResetPasswordPage from "@/features/profile/pages/ResetPasswordPage";
//admin-page
import ArticleManagement from "@/features/admin-page/pages/ArticleManagement";
import CategoryManagement from "@/features/admin-page/pages/CategoryManagement";
import CreateArticlePage from "@/features/admin-page/pages/CreateArticlePage";
import CreateCategoryPage from "@/features/admin-page/pages/CreateCategoryPage";
import ProfileManagement from "@/features/admin-page/pages/ProfileManagement";
import NotificationPage from "@/features/admin-page/notifications/NotificationPage";
import ResetPasswordPageForAdmin from "@/features/admin-page/resetpassword/pages/ResetPasswordPage";
import HealthTestPage from "@/pages/HealthTestPage";

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
  <Route path="categories/create" element={<CreateCategoryPage />} />
  <Route path="profile" element={<ProfileManagement/>} />
  <Route path="notification" element={<NotificationPage/>} />
  <Route path="reset-password" element={<ResetPasswordPageForAdmin />} />
</Route>

    <Route path="health-test" element={<HealthTestPage/>} />
    </Routes>
  );
}
