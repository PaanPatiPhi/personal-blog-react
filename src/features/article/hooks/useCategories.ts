import { useState, useEffect } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
  displayName: string; // Clean name for display
};

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4002/categories");
        // Clean category names by removing newlines and extra whitespace
        const cleanedCategories = response.data.map((cat: { id: number; name: string }) => ({
          ...cat,
          displayName: cat.name.trim(),
        }));
        setCategories(cleanedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export default useCategories;
