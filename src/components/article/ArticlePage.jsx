import { useState } from "react";
import ArticleSearchSection from "./ArticleSearchSection";
import ArticleSection from "./ArticleSection";

function ArticlesPage() {
  const [category, setCategory] = useState("Highlight");

  return (
    <>
      <ArticleSearchSection
        category={category}
        onCategoryChange={setCategory}
      />

      <ArticleSection category={category} />
    </>
  );
}

export default ArticlesPage;
