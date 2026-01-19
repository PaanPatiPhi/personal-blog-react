import axios from "axios";
import { useState, useEffect } from "react";

type Blog = {
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
};

function useGetPost() {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const result = await axios.get("https://blog-post-project-api.vercel.app/posts");
      setBlogData(Array.isArray(result.data.posts) ? result.data.posts: []);
      console.log(result.data.posts)
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return { blogData, isLoading, isError };
}

export default useGetPost;
