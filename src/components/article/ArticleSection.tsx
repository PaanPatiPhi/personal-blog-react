import BlogCard from "./BlogCard";
import useGetPost from "../hook/useGetPost";

type ArticleSectionProps = {
  category: string;
};

function ArticleSection({ category }: ArticleSectionProps) {
  const { blogData, isLoading, isError } = useGetPost();

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

  const filteredBlogs =
    category === "Highlight"
      ? blogData
      : blogData.filter((blog) => blog.category === category);

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No articles found in this category.
          </div>
        )}
      </div>
    </article>
  );
}

export default ArticleSection;
