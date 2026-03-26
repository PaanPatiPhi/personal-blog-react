import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

import PostContent from "./PostContent";
import AuthorCard from "./AuthorCard";
import PostActions from "./PostActions";
import CommentInput from "./CommentInput";
import CommentSection from "./CommentSection";
import LoginModal from "../../auth/components/LoginModal";
import PostMeta from "./PostMeta";
import CopySuccessToast from "@/shared/components/CopySuccessToast";


import { useAuth } from "@/features/auth/contexts/auth-provider";
import { usePost } from "../hooks/usePost";
import { usePostActions } from "../hooks/usePostActions";
import { useComments } from "../hooks/useComments";

function ViewPostPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const { post, loading, error } = usePost(id, location.state?.post);
  const { comments, refreshComments } = useComments(id);

  const actions = usePostActions({
    isLoggedIn: !!user,
    onRequireLogin: () => setShowLoginModal(true),
    title: post?.title || "",
    postId: id || "",
  });

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error || !post) return <div>Error loading post</div>;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowCopyToast(true);

    setTimeout(() => {
      setShowCopyToast(false);
    }, 2000);
  };

  const CATEGORY_MAP: Record<number, string> = {
    1: "Cat",
    2: "Inspiration",
    3: "General"
  };

  return (
    <>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-[184px] md:h-[585px] md:w-[1200px] md:mx-auto object-cover md:rounded-2xl"
      />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_305px] gap-10">
          <div className="flex flex-col gap-8">
            <PostMeta
              category={CATEGORY_MAP[post.category_id]}
              date={post.date}
              title={post.title}
              description={post.description}
            />

            <PostContent content={post.content} />

            <div className="lg:hidden">
              <AuthorCard />
            </div>

            <PostActions
            likes={post.likes}
            onLike={actions.handleLike}
            onCopyLink={handleCopyLink}
            onShareFacebook={actions.handleShareFacebook}
            onShareLinkedIn={actions.handleShareLinkedIn}
            onShareTwitter={actions.handleShareTwitter}
            />
          

            <CommentInput postId={id} onCommentAdded={refreshComments} />

            {comments.map((c) => (
              <CommentSection 
                key={c.id} 
                image={c.users?.profile_pic || c.profile_pic || '/default-avatar.png'}
                name={c.users?.name || c.users?.username || c.username || 'Anonymous'}
                date={c.created_at}
                comment={c.comment_text}
              />
            ))}
          </div>

          <aside className="hidden lg:block sticky top-24">
            <AuthorCard />
          </aside>
        </div>
      </main>

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <CopySuccessToast show={showCopyToast} />

    </>
  );
}

export default ViewPostPage;
