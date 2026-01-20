import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import PostContent from "./PostContent";
import AuthorCard from "./AuthorCard";
import PostActions from "./PostActions";
// import CommentInput from "./CommentInput";
// import CommentSection from "./CommentSection";

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

  useEffect(() => {
    if (!id) return;
    if (post && post.content) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    axios
      .get(`https://blog-post-project-api.vercel.app/posts/${id}`)
      .then((res) => {
        if (!cancelled) setPost(res.data.post ?? res.data);
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

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="py-20 text-center">
        <p>Failed to load post.</p>
        <button onClick={() => navigate(-1)} className="mt-4 underline">
          Go back
        </button>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleLike = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };
  const handleShareLinkedIn = () => {
  const url = encodeURIComponent(window.location.href);

  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank"
  );
};
const handleShareTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title); // หรือ post.title

  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "_blank"
  );
};


  return (
    <>
      {/* Hero Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-[184px] md:h-[585px] object-cover"
      />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          
          {/* MAIN COLUMN */}
          <div className="flex flex-col gap-8">
            {/* Meta */}
            <div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-md mr-4">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {formattedDate}
              </span>

              <h1 className="text-[28px] font-semibold mt-4">
                {post.title}
              </h1>
              <p>
                {post.description}
              </p>
            </div>

            <PostContent content={post.content} />

            {/* Mobile Author */}
            <div className="lg:hidden">
              <AuthorCard
                name={post.author}
                image={post.authorImage}
                bio="I am a pet enthusiast and freelance writer who specializes in animal behavior and care."
              />
            </div>

            <PostActions
              likes={post.likes}
              onLike={handleLike}
              onCopyLink={handleCopyLink}
              onShareFacebook={handleShareFacebook}
              onShareLinkedIn={handleShareLinkedIn}
              onShareTwitter={handleShareTwitter}
            />

            {/* Future */}
            {/* <CommentInput /> */}
            {/* <CommentSection /> */}
          </div>

          {/* ASIDE (Desktop only) */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <AuthorCard
              name={post.author}
              image={post.authorImage}
              bio="I am a pet enthusiast and freelance writer who specializes in animal behavior and care."
            />
          </aside>
        </div>
      </main>
    </>
  );
}

export default ViewPostPage;
