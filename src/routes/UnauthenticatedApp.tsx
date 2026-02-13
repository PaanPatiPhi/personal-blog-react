import { Routes, Route } from "react-router-dom";
import MainLayout from "@/shared/layout/MainLayout";
import ArticlesPage from "@/features/article/components/ArticlePage";
import ViewPostPage from "@/features/viewpostpage/components/ViewPostPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import Snowfall from "react-snowfall";
import NotFoundPage from "@/shared/layout/NotFoundPage";
import AdminLoginPage from "@/features/auth/pages/AdminLoginPage";



function UnauthenticatedApp(){
    return(
        <>
        <Snowfall /> 
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<ArticlesPage />} />
                <Route path="/posts/:id" element={<ViewPostPage />} />
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />                
            </Route>
            <Route path="*" element={<NotFoundPage/> } />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        </Routes>
        </>
    )
}

export default UnauthenticatedApp