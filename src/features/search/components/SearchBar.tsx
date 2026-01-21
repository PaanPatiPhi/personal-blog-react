import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPost from "@/features/article/hook/useGetPost";
import { Search } from "lucide-react";

type SearchBarProps = {
  className?: string;
};

function SearchBar({className}: SearchBarProps) {
  const navigate = useNavigate();
  const { blogData = [] } = useGetPost({});
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  const results =
    q.length > 0
      ? blogData.filter((blog) => {
          const title = blog.title?.toLowerCase() ?? "";
          const desc = blog.description?.toLowerCase() ?? "";
          const content = blog.content?.toLowerCase() ?? "";

          return (
            title.includes(q) ||
            desc.includes(q) ||
            content.includes(q)
          );
        })
      : [];

  return (
    <div className={`relative max-w-sm ${className}`}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-full py-2 px-3  border-1 border-(--color-brown-200) rounded-lg"
      />

      {results.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-10">
          {results.map((blog) => (
            <li
              key={blog.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/posts/${blog.id}`);
                setQuery("");
              }}
            >
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
