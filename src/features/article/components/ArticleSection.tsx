import BlogCard from "./BlogCard";
import useGetPublishedPost from "../hooks/useGetPublishedPost";

type ArticleSectionProps = {
  category: string;
};

function ArticleSection({ category }: ArticleSectionProps) {
  const { blogData, isLoading, isError, handleLoadMore, hasMore } = useGetPublishedPost({
    category: category === "Highlight" ? "" : category,
    keyword: "", // ไม่มี search filtering
  });

  // debug logs (เอาออกได้ถ้าต้องการ)

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

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
        {displayBlogs.length > 0 ? (
          displayBlogs.map((blog) => (
            <BlogCard 
              key={blog.id} 
              id={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              category_id={(blog as any).category_id}
              author={blog.category_name || "Unknown"}
              authorImage={blog.image}
              date={blog.date}
              categoryName={blog.category_name}
            />
          ))
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
