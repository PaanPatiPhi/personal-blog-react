import SearchBar from "@/features/search/components/SearchBar";
import CategoriesSelector from "./CategoriesSelector";
import CategoryTabs from "./CategoryTabs";
import useCategories from "../hooks/useCategories";

type ArticleSearchSectionProps = {
  category: string;
  onCategoryChange: (value: string) => void;
};

function ArticleSearchSection({
  category,
  onCategoryChange,
}: ArticleSearchSectionProps) {
  const { categories, loading, error } = useCategories();

  // Create category options with Highlight first, then dynamic categories
  const categoryOptions = [
    { label: "Highlight", value: "Highlight" },
    ...categories.map((cat) => ({
      label: cat.displayName, // Use clean name for display
      value: cat.displayName, // Use clean name for API calls too
    })),
  ];

  return (
    <article>
      <div className="py-4 md:mx-auto w-[343px] md:w-[1217px]">
        <h3 className="text-xl font-semibold md:hidden">Latest articles</h3>
      </div>

      <div
        className="flex flex-col md:flex-row-reverse md:justify-between justify-center items-center
        h-[172px] gap-4
        md:w-[1217px] md:h-[80px] md:mx-auto md:mb-15 md:rounded-2xl bg-(--color-brown-200) md:px-6"
      >
        <SearchBar
          className="w-[343px] bg-white rounded-md"
          category={category}
        />

        {/* Mobile: Select */}
        <div className="md:hidden">
          <p className="text-(--color-brown-400) font-medium text-left">
            Category
          </p>
          {loading ? (
            <div className="w-[343px] text-(--color-brown-400) bg-white rounded-md px-3 py-2">
              Loading categories...
            </div>
          ) : error ? (
            <div className="w-[343px] text-red-500 bg-white rounded-md px-3 py-2">
              Failed to load categories
            </div>
          ) : (
            <CategoriesSelector
              className="w-[343px] text-(--color-brown-400) bg-white"
              value={category}
              onChange={onCategoryChange}
              options={categoryOptions}
            />
          )}
        </div>

        {/* Desktop: Tabs */}
        {loading ? (
          <div className="hidden md:flex justify-between w-[438px] items-center">
            <div className="text-(--color-brown-400)">Loading categories...</div>
          </div>
        ) : error ? (
          <div className="hidden md:flex justify-between w-[438px] items-center">
            <div className="text-red-500">Failed to load categories</div>
          </div>
        ) : (
          <CategoryTabs
            className="hidden md:flex justify-between w-[438px]"
            options={categoryOptions}
            activeValue={category}
            onChange={onCategoryChange}
          />
        )}
      </div>
    </article>
  );
}

export default ArticleSearchSection;
