import BlogCard from "./BlogCard";
import useGetPublishedPost from "../hooks/useGetPublishedPost";

type ArticleSectionProps = {
  category: string;
};

function ArticleSection({ category }: ArticleSectionProps) {
  const { blogData, isLoading, isError, handleLoadMore, hasMore } = useGetPublishedPost({
    category,
    keyword: "", // ไม่มี search filtering
  });

  // debug logs (เอาออกได้ถ้าต้องการ)
  console.log("ArticleSection category:", category);
  console.log("ArticleSection blogData length:", blogData?.length);

  if (isLoading && (!blogData || blogData.length === 0)) {
    return (
      <div className="py-20 text-center text-gray-400">Loading articles...</div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load articles
      </div>
    );
  }

  // API ทำการ filter ให้แล้ว ไม่ต้อง filter ซ้ำ
  // ถ้า category เป็น "Highlight" จะแสดงทั้งหมด
  const displayBlogs = blogData;
  console.log("blogData", blogData);
  console.log("category", category);
  console.log("displayBlogs", displayBlogs);

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
        {displayBlogs.length > 0 ? (
          displayBlogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
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
