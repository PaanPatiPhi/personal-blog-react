import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/shared/layout/NavBar";
import ArticlesPage from "./features/article/components/ArticlePage";
import ViewPostPage from "./features/viewpostpage/components/ViewPostPage";
import "./index.css";
import Snowfall from "react-snowfall";

function App() {
  return (
    <BrowserRouter>
    <Snowfall/>
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        {/* อื่นๆ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
