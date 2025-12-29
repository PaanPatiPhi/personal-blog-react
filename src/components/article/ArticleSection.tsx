import SearchBar from "./SearchBar";
import CategoriesSelector from "./CategoriesSelector";
import { useState } from "react";

function ArticleSection() {
  const [category, setCategory] = useState("Highlight");

  return (
    <article>
      <div className="p-4 gap-2.5 text-(--color-brown-400)  md:px-30 ">
        <h3 className="text-(length:--font-size-headline-3) font-semibold text-left md:mx-20">
          Latest articles
        </h3>
      </div>
      <div className="flex flex-col md:flex-row-reverse md:justify-around justify-center items-center h-[172px] bg-(--color-brown-200) gap-4 md:w-[1200px] md:h-[80px] md:mx-50 md:mb-15">
        <SearchBar className="w-[343px] bg-white" />
        <div>
          <p className="text-(--color-brown-400) font-medium text-left md:hidden flex">
            Category
            </p>
          <CategoriesSelector
            className="w-[343px] text-(--color-brown-400) bg-white md:hidden "  
            value={category}
            onChange={setCategory}
            options={[
              { label: "Highlight", value: "Highlight" },
              { label: "Cat", value: "Cat" },
              { label: "Inspiration", value: "Inspiration" },
              { label: "General", value: "General" },
            ]}
          />
          <div className="hidden md:flex justify-between w-[438px]">
            <button>Highlight</button>
            <button>Cat</button>
            <button>Inspiration</button>
            <button>General</button>

          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleSection;
