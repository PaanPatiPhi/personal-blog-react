import { useState } from "react";
import ArticleSearchSection from "./ArticleSearchSection";
import ArticleSection from "./ArticleSection";
import HeroSection from "@/shared/layout/HeroSection";

function ArticlesPage() {
  const [category, setCategory] = useState("Highlight");

  return (
    <>
      <HeroSection />

      <ArticleSearchSection
        category={category}
        onCategoryChange={setCategory}
      />

      <ArticleSection
        category={category}
      />
    </>
  );
}

export default ArticlesPage;
