import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Blog = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  content: string;
};

type UseGetPostParams = {
  category?: string;
  keyword?: string;
};

const LIMIT = 6;

function useGetPost({ category, keyword }: UseGetPostParams) {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isFetching = useRef(false);
  const currentController = useRef<AbortController | null>(null);

  // track previous category/keyword to detect param changes
  const prevParams = useRef({ category, keyword });

  const fetchPosts = async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setIsLoading(true);
    setIsError(false);

    // abort previous request if any
    currentController.current?.abort();
    const controller = new AbortController();
    currentController.current = controller;

    try {
      const res = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page,
            limit: LIMIT,
            category: category === "Highlight" ? "" : category,
            search: keyword || "",
          },
          signal: controller.signal,
        }
      );

      const newPosts: Blog[] = res.data.posts ?? [];

      setBlogData((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = newPosts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...unique];
      });

      // safer hasMore calculation:
      // 1) if API provides paging info, use it
      // 2) otherwise fallback to checking returned items count (if === LIMIT, likely more)
      let more = false;
      const currentPage = res.data?.currentPage;
      const totalPages = res.data?.totalPages;
      if (
        typeof currentPage === "number" &&
        typeof totalPages === "number" &&
        !Number.isNaN(currentPage) &&
        !Number.isNaN(totalPages)
      ) {
        more = currentPage < totalPages;
      } else {
        // fallback: if returned items equal LIMIT, assume there might be next page
        more = newPosts.length === LIMIT;
      }
      setHasMore(more);
    } catch (err: any) {
      // ignore if request was aborted
      if (err?.name === "CanceledError" || err?.message === "canceled") {
        // do nothing
      } else {
        setIsError(true);
      }
    } finally {
      isFetching.current = false;
      setIsLoading(false);
      currentController.current = null;
    }
  };

  /** single effect: ถ้าพารามิเตอร์เปลี่ยน -> reset แล้วจัดการ fetch อย่างปลอดภัย */
  useEffect(() => {
    const paramsChanged =
      prevParams.current.category !== category ||
      prevParams.current.keyword !== keyword;

    if (paramsChanged) {
      // cancel ongoing, clear data, reset hasMore
      currentController.current?.abort();
      setBlogData([]);
      setHasMore(true);

      // update prev params
      prevParams.current = { category, keyword };

      // if not on page 1, change page to 1 and let effect re-run to fetch
      if (page !== 1) {
        setPage(1);
        return; // wait for next run when page becomes 1
      }
      // if page is already 1, continue to fetch below
    }

    // fetch for current page/category/keyword
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, keyword]);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    setPage((p) => p + 1);
  };

  return {
    blogData,
    isLoading,
    isError,
    hasMore,
    handleLoadMore,
  };
}

export default useGetPost;
