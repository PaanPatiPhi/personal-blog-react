import { Routes, Route } from "react-router-dom";
import MainLayout from "./shared/layout/MainLayOut";
import ArticlePage from './features/article/components/ArticlePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ArticlePage />} />
      </Route>
    </Routes>
  );
}
