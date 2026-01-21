import { useState } from "react";
import ArticleSearchSection from "./ArticleSearchSection";
import ArticleSection from "./ArticleSection";
import HeroSection from "@/shared/layout/HeroSection";

function ArticlesPage() {
  const [category, setCategory] = useState("Highlight");
  const [keyword, setKeyword] = useState(""); // added

  return (
    <>
      <HeroSection />

      <ArticleSearchSection
        category={category}
        onCategoryChange={setCategory}
        onSearch={setKeyword} // pass search handler
      />

      <ArticleSection
        category={category}
        keyword={keyword} // pass keyword
      />
    </>
  );
}

export default ArticlesPage;
