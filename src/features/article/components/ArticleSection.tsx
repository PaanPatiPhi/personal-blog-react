import BlogCard from "./BlogCard";
import useGetPost from "../hook/useGetPost";

type ArticleSectionProps = {
  category: string;
};


function ArticleSection({ category,keyword }: ArticleSectionProps) {
  const { blogData, isLoading, isError ,handleLoadMore, hasMore} = useGetPost({category, keyword});

  // debug logs
  console.log("ArticleSection keyword:", JSON.stringify(keyword));
  console.log("ArticleSection blogData length:", blogData?.length);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading articles...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load articles
      </div>
    );
  }

  // filter by category first
  const categoryFiltered =
    category === "Highlight"
      ? blogData
      : blogData.filter((blog) => blog.category === category);

  // client-side keyword filter (fallback if API search isn't applied)
  const q = keyword?.trim().toLowerCase() ?? "";
  const filteredBlogs = q
    ? categoryFiltered.filter((blog) => {
        const title = String(blog.title ?? "").toLowerCase();
        const desc = String(blog.description ?? "").toLowerCase();
        const cat = String(blog.category ?? "").toLowerCase();
        return (
          title.includes(q) ||
          desc.includes(q) ||
          cat.includes(q)
        );
      })
    : categoryFiltered;

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog.id}{...blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No articles found in this category.
          </div>
        )}
      </div>
      {hasMore && (
    <div className="text-center mt-8">
      <button
        onClick={handleLoadMore}
        className="hover:text-muted-foreground font-medium underline"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "View more"}
      </button>
    </div>
  )}
    </article>
  );
}

export default ArticleSection;
