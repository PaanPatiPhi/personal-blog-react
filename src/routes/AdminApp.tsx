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

//admin-page
import ArticleManagement from "@/features/admin-page/pages/article/ArticleManagement";
import CategoryManagement from "@/features/admin-page/pages/category/CategoryManagement";
import ArticleFormPage from "@/features/admin-page/pages/article/ArticleFormPage";
import CreateCategoryPage from "@/features/admin-page/pages/category/CreateCategoryPage";
import ProfileManagement from "@/features/admin-page/pages/ProfileManagement";
import NotificationPage from "@/features/admin-page/notifications/NotificationPage";
import ResetPasswordPageForAdmin from "@/features/admin-page/resetpassword/pages/ResetPasswordPage";
import {ProfileProvider } from "@/features/profile/contexts/ProfileProvider";


//admin-auth
import AdminLoginPage from "@/features/auth/pages/AdminLoginPage";
import NotFoundPage from "@/shared/layout/NotFoundPage";
import Snowfall from "react-snowfall";
import AdminSetupPage from "@/features/admin-page/pages/AdminSetupPage";
import UpdateCategoryPage from "@/features/admin-page/pages/category/UpdateCategoryPage";
function AdminApp(){
    return(
        <>
        <Snowfall />
    <Routes>

      {/* public */}
      <Route element={          
        <ProfileProvider>
            <MainLayout />
          </ProfileProvider>
        }>
      
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
      </Route>

      {/* auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* admin */}
<Route path="/admin/login" element={<AdminLoginPage />} />

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<ArticleManagement />} />
  <Route path="articles" element={<ArticleManagement />} />
  <Route path="articles/create" element={<ArticleFormPage />} />
  <Route path="articles/:id/edit" element={<ArticleFormPage />} />
  <Route path="categories" element={<CategoryManagement />} /> 
  <Route path="categories/create" element={<CreateCategoryPage />} />
  <Route path="categories/:id/edit" element={<UpdateCategoryPage/>} />
  <Route path="profile" element={<ProfileManagement/>} />
  <Route path="notification" element={<NotificationPage/>} />
  <Route path="reset-password" element={<ResetPasswordPageForAdmin />} />
</Route>

    <Route path="/admin/setup" element={<AdminSetupPage />} />
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    </>
    )
}

export default AdminApp