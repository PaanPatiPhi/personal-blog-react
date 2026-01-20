type PostHeaderProps = {
  post: {
    image: string;
    title: string;
    category: string;
    date: string;
  };
};

function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <img
        src={post.image}
        alt={post.title}
        className="w-full max-w-[375px] h-[184px] object-cover"
      />

      <div className="max-w-[900px] mx-auto px-4 mt-6">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-md mr-5">
          {post.category}
        </span>
        <span className="text-sm text-gray-500">{formattedDate}</span>

        <h3 className="text-[24px] font-semibold mt-6">{post.title}</h3>
      </div>
    </>
  );
}

export default PostHeader;
