import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultAuthorImage from "../../../assets/image/authors/ThomsanP.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  content: string;
  likes: number;
};

function ViewPostPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(location.state?.post ?? null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState(false);

if (!post) return null; // หรือ Loading / Error UI

const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});



  useEffect(() => {
    // ถ้ามี post อยู่แล้ว แต่ไม่มี content ให้ยังคง fetch
    if (!id) return;
    if (post && post.content) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    axios
      .get(`https://blog-post-project-api.vercel.app/posts/${id}`)
      .then((res) => {
        if (!cancelled) {
          setPost(res.data.post ?? res.data);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, post]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error || !post)
    return (
      <div className="py-20 text-center">
        <p>Failed to load post.</p>
        <button onClick={() => navigate(-1)} className="mt-4 underline">
          Go back
        </button>
      </div>
    );

  return (
    <main className="max-w-[900px] mx-auto py-10 px-4">
      <div className="rounded-lg overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg" />
      </div>

      <div className="mt-6">
        <span className="w-fit px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-md mr-5">
        {post.category}
        </span>
        <span className="text-sm text-gray-500">  {formattedDate} </span>

        <h3 className="text-[24px] font-semibold mt-6">{post.title}</h3>

        <div className="prose mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-semibold mt-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold mt-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold mt-2">{children}</h3>,
              h4: ({ children }) => <h4 className="text-base font-medium mt-2">{children}</h4>,
              p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
              li: ({ children }) => <li className="text-sm leading-relaxed ml-4">{children}</li>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
                <div className="flex items-center gap-3 mt-4">
          <img src={post.authorImage || DefaultAuthorImage} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-semibold">{post.author}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ViewPostPage;