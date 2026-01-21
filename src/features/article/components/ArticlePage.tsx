import { useState } from "react";
import ArticleSearchSection from "./ArticleSearchSection";
import ArticleSection from "./ArticleSection";
import HeroSection from "@/shared/layout/HeroSection";

function ArticlesPage() {
  const [category, setCategory] = useState("Highlight");
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <HeroSection />

      <ArticleSearchSection
        category={category}
        onCategoryChange={setCategory}
        onSearch={(k: string) => setKeyword(k)} // wrapper to satisfy types
      />

      <ArticleSection
        category={category}
        keyword={keyword}
      />
    </>
  );
}

export default ArticlesPage;
