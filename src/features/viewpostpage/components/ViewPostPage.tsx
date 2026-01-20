import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import AuthorCard from "./AuthorCard";
import PostActions from "./PostActions";

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

  const handleLike = () => {
  // ยังไม่มี auth → เด้ง login
  navigate("/login", {
    state: { from: location.pathname },
  });
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
    <>
      <PostHeader post={post} />

      <main className="max-w-[900px] mx-auto py-2 px-4">
        <PostContent content={post.content} />

        <AuthorCard
          name={post.author}
          image={post.authorImage}
          bio="Lorem ipsum dolor, sit amet consectetur adipisicing elit..."
        />
        <PostActions
        likes={post.likes}
        onLike={handleLike}
        onCopyLink={handleCopyLink}
        onShareFacebook={handleShareFacebook}
        />

      </main>
    </>
  );
}

export default ViewPostPage;
