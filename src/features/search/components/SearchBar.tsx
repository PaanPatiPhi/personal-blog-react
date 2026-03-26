import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSearchSuggestions from "../hook/useSearchSuggestions";
import { Search } from "lucide-react";

type SearchBarProps = {
  className?: string;
  category?: string; // optional for search suggestions
};

function SearchBar({ className, category }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Use the new search suggestions hook
  const { suggestions } = useSearchSuggestions({ query, category });

  // debounce local query for suggestions (UI only)
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const q = debounced.toLowerCase();

  const results =
    q.length > 0
      ? suggestions.filter((blog) => {
          const title = blog.title?.toLowerCase() ?? "";
          const desc = blog.description?.toLowerCase() ?? "";
          return title.includes(q) || desc.includes(q);
        })
      : [];

  return (
    <div className={`relative max-w-sm ${className}`}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-full py-2 px-3 border rounded-lg"
      />

      {results.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-10">
          {results.map((blog) => (
            <li
              key={blog.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/posts/${blog.id}`, { state: { post: blog } });
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
