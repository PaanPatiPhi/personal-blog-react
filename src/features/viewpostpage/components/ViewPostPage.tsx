import { useParams, useLocation} from "react-router-dom";
import { useState } from "react";

import PostContent from "./PostContent";
import AuthorCard from "./AuthorCard";
import PostActions from "./PostActions";
import CommentInput from "./CommentInput";
import CommentSection from "./CommentSection";
import LoginModal from "../../auth/LoginModal";
import PostMeta from "./PostMeta";

import { useAuth } from "@/features/auth/context/AuthContext";
import { usePost } from "../hooks/usePost";
import { usePostActions } from "../hooks/usePostActions";
import { useComments } from "../hooks/useComments";

function ViewPostPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();


  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { post, loading, error } = usePost(id, location.state?.post);
  const { comments, addComment } = useComments();

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error || !post) return <div>Error loading post</div>;

  const actions = usePostActions({
    isLoggedIn: !!user,
    onRequireLogin: () => setShowLoginModal(true),
    title: post.title,
  });

  return (
    <>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-[184px] md:h-[585px] md:w-[1200px] md:mx-auto object-cover rounded-2xl"
      />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_305px] gap-10">
          <div className="flex flex-col gap-8">
            <PostMeta
              category={post.category}
              date={post.date}
              title={post.title}
              description={post.description}
            />

            <PostContent content={post.content} />

            <div className="lg:hidden">
              <AuthorCard name={post.author} image={post.authorImage} bio="I am a pet enthusiast and freelance writer who specializes in animal behavior and care." />
            </div>

            <PostActions
            likes={post.likes}
            onLike={actions.handleLike}
            onCopyLink={actions.handleCopyLink}
            onShareFacebook={actions.handleShareFacebook}
            onShareLinkedIn={actions.handleShareLinkedIn}
            onShareTwitter={actions.handleShareTwitter}
            />


            <CommentInput onSubmit={addComment} />

            {comments.map((c) => (
              <CommentSection key={c.id} {...c} />
            ))}
          </div>

          <aside className="hidden lg:block sticky top-24">
            <AuthorCard name={post.author} image={post.authorImage} bio="I am a pet enthusiast and freelance writer who specializes in animal behavior and care." />
          </aside>
        </div>
      </main>

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default ViewPostPage;
