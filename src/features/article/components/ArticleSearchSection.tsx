import SearchBar from "../../search/components/SearchBar";
import CategoriesSelector from "./CategoriesSelector";
import CategoryTabs from "./CategoryTabs";

type ArticleSearchSectionProps = {
  category: string;
  onCategoryChange: (value: string) => void;
};

function ArticleSearchSection({
  category,
  onCategoryChange,
  onSearch,
}: ArticleSearchSectionProps) {
  const categoryOptions = [
    { label: "Highlight", value: "Highlight" },
    { label: "Cat", value: "Cat" },
    { label: "Inspiration", value: "Inspiration" },
    { label: "General", value: "General" },
  ];

  return (
    <article>
      <div className="py-4 md:mx-auto w-[343px] md:w-[1217px]">
        <h3 className="text-xl font-semibold">Latest articles</h3>
      </div>

      <div
        className="flex flex-col md:flex-row-reverse md:justify-around justify-center items-center
        h-[172px] bg-(--color-brown-200) gap-4
        md:w-[1217px] md:h-[80px] md:mx-auto md:mb-15 md:rounded-2xl"
      >
        <SearchBar
          className="w-[343px] bg-white rounded-md"
          category={category}      // pass category so SearchBar can query correct posts
        />

        {/* Mobile */}
        <div className="md:hidden">
          <p className="font-medium mb-1">Category</p>
          <CategoriesSelector
            className="w-[343px]  border-(--color-brown-200) bg-white text- text-(--color-brown-400)"
            value={category}
            onChange={onCategoryChange}
            options={categoryOptions}
          />
        </div>

        {/* Desktop */}
        <CategoryTabs
          className="hidden md:flex w-[438px]"
          options={categoryOptions}
          activeValue={category}
          onChange={onCategoryChange}
        />
      </div>
    </article>
  );
}

export default ArticleSearchSection;
