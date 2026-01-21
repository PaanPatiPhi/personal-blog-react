import { Routes, Route } from "react-router-dom";
import MainLayout from "./shared/layout/MainLayout";
import ArticlePage from './features/article/components/ArticlePage';
import ViewPostPage from "./features/viewpostpage/components/ViewPostPage";
import SignupPage from "./features/auth/pages/SignupPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ArticlePage />} />
        <Route path="/post/:id" element={<ViewPostPage />} />
        <Route path="/signup" element={<SignupPage />} />

        </Route>
    </Routes>
  );
}
