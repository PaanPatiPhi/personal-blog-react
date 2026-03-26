import { useState, useEffect } from "react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  category_name: string;
  date: string;
  content: string;
  status_id: number;
  likes_count: number;
}

interface UseSearchSuggestionsProps {
  query: string;
  category?: string;
}

function useSearchSuggestions({ query, category }: UseSearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch when there's a query
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        // For search suggestions, get all published posts (no category filter)
        const res = await axios.get("http://localhost:4002/posts/published", {
          params: {
            page: 1,
            limit: 20, // Get more for better suggestions
            category: "", // No category filter for search suggestions
            search: "", // No keyword filter, we'll filter locally
          },
        });

        const allPosts: Blog[] = res.data.posts ?? [];
        
        // Filter locally based on query
        const q = query.toLowerCase();
        const filtered = allPosts.filter((blog) => {
          const title = blog.title?.toLowerCase() ?? "";
          const desc = blog.description?.toLowerCase() ?? "";
          return title.includes(q) || desc.includes(q);
        });

        setSuggestions(filtered);
      } catch (err) {
        console.error("Error fetching search suggestions:", err);
        setError("Failed to load suggestions");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, loading, error };
}

export default useSearchSuggestions;
