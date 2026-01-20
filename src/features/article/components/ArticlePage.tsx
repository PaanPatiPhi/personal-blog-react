import { useState } from "react";
import ArticleSearchSection from "./ArticleSearchSection";
import ArticleSection from "./ArticleSection";

function ArticlesPage() {
  const [category, setCategory] = useState("Highlight");
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <ArticleSearchSection
        category={category}
        onCategoryChange={setCategory}
        onSearch={setKeyword}
      />

      <ArticleSection 
      category={category}
      keyword={keyword} />
    </>
  );
}

export default ArticlesPage;

