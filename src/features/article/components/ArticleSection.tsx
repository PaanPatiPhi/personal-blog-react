import BlogCard from "./BlogCard";
import useGetPost from "../hook/useGetPost";

type ArticleSectionProps = {
  category: string;
  keyword?: string; // ยังคงรับได้แต่จะไม่ถูกใช้ที่นี่
};

function ArticleSection({ category }: ArticleSectionProps) {
  const { blogData, isLoading, isError, handleLoadMore, hasMore } =
    useGetPost({ category, keyword: "" }); // ส่ง keyword เป็น empty ให้ API (search ไม่ใช้ที่นี่)

  // debug logs (เอาออกได้ถ้าต้องการ)
  console.log("ArticleSection category:", category);
  console.log("ArticleSection blogData length:", blogData?.length);

  if (isLoading && (!blogData || blogData.length === 0)) {
    return <div className="py-20 text-center text-gray-400">Loading articles...</div>;
  }

  if (isError) {
    return <div className="py-20 text-center text-red-500">Failed to load articles</div>;
  }

  // filter by category only (Highlight => all)
  const filteredBlogs =
    category === "Highlight" ? blogData : blogData.filter((b) => b.category === category);

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No articles found.
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
