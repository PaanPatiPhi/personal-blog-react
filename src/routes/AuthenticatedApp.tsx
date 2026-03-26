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
import ArticleManagement from "@/features/admin-page/pages/article/ArticleManagement";
import CategoryManagement from "@/features/admin-page/pages/category/CategoryManagement";
import ArticleFormPage from "@/features/admin-page/pages/article/ArticleFormPage";
import CreateCategoryPage from "@/features/admin-page/pages/category/CreateCategoryPage";
import ProfileManagement from "@/features/admin-page/pages/ProfileManagement";
import NotificationPage from "@/features/admin-page/notifications/NotificationPage";
import ResetPasswordPageForAdmin from "@/features/admin-page/resetpassword/pages/ResetPasswordPage";
import {ProfileProvider } from "@/features/profile/contexts/ProfileProvider";
import { PublicProfileProvider } from "@/features/profile/contexts/PublicProfileProvider";
import { UserProfileProvider } from "@/features/profile/contexts/UserProfileProvider";


//admin-auth
import AdminLoginPage from "@/features/auth/pages/AdminLoginPage";
import NotFoundPage from "@/shared/layout/NotFoundPage";
import Snowfall from "react-snowfall";


function AuthenticatedApp(){
     return (
        <>
            <Snowfall />
            
            <Routes>
                {/* public routes - use PublicProfileProvider for content, UserProfileProvider for NavBar */}
                <Route element={          
                    <UserProfileProvider>
                        <MainLayout />
                    </UserProfileProvider>
                }>
                    <Route path="/" element={
                        <PublicProfileProvider>
                            <ArticlesPage />
                        </PublicProfileProvider>
                    } />
                    <Route path="/posts/:id" element={
                        <PublicProfileProvider>
                            <ViewPostPage />
                        </PublicProfileProvider>
                    } />
                </Route>
                
                {/* auth routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* admin routes - use ProfileProvider */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route path="/admin" element={<ProfileProvider><AdminLayout /></ProfileProvider>}>
                    <Route index element={<ArticleManagement />} />
                    <Route path="articles" element={<ArticleManagement />} />
                    <Route path="articles/create" element={<ArticleFormPage />} />
                    <Route path="articles/:id/edit" element={<ArticleFormPage />} />
                    <Route path="categories" element={<CategoryManagement />} /> 
                    <Route path="categories/create" element={<CreateCategoryPage />} />
                    <Route path="profile" element={<ProfileManagement/>} />
                    <Route path="notification" element={<NotificationPage/>} />
                    <Route path="reset-password" element={<ResetPasswordPageForAdmin />} />
                </Route>
                
                {/* user profile routes */}
                <Route element={<UserProfileProvider><MainLayout /></UserProfileProvider>}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                </Route>
                
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
     )
}

export default AuthenticatedApp