import { SmileIcon } from "lucide-react";
import { Copy } from "lucide-react";
import Facebook from "../../../assets/icon/post/Facebook_black.png";
import LinkedIn from "../../../assets/icon/post/LinkedIN_black.png";
import Twitter from "../../../assets/icon/post/Twitter_black.png";

type PostActionsProps = {
  likes: number;
  isLiked: boolean;
  isLoggedIn: boolean;
  onLike: () => void;
  onRequireLogin?: () => void;
  loading?: boolean;
  onCopyLink?: () => void;
  onShareFacebook?: () => void;
  onShareLinkedIn?: () => void;
  onShareTwitter?: () => void;
};

function PostActions({
  likes,
  isLiked,
  isLoggedIn,
  onLike,
  onRequireLogin,
  loading = false,
  onCopyLink,
  onShareFacebook,
  onShareLinkedIn,
  onShareTwitter,
}: PostActionsProps) {
  const handleLikeClick = () => {

    
    if (!isLoggedIn) {

      onRequireLogin?.();
      return;
    }

    onLike();
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 mt-6 -mx-4 md:mx-auto bg-(--color-brown-200) w-[375px] md:w-full md:rounded-[16px]">
      <button
        onClick={handleLikeClick}
        disabled={loading}
        className={`flex items-center gap-2 text-sm mx-auto md:ml-10 my-5 w-[343px] md:w-[135px] h-[48px] rounded-[999px] justify-center border-(--color-brown-400) border-1 transition-all duration-300 cursor-pointer ${
          isLiked 
            ? "bg-yellow-100 border-yellow-400 text-yellow-800" 
            : "bg-white text-black hover:bg-gray-50"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <SmileIcon className={`transition-colors duration-300 ${isLiked ? "text-yellow-600" : ""}`} />
        <span className="transition-all duration-300">{likes}</span>
      </button>
    <div className="flex justify-around mb-5 md:my-5 md:gap-5 md:mr-10">
      <button
        onClick={onCopyLink}
        className="flex cursor-pointer items-center gap-2 text-sm  bg-white w-[161px] h-[48px] rounded-[999px] justify-center border-(--color-brown-400) border-1"
      >
        <Copy /> 
        <span>Copy link</span>
      </button>
      <button
        onClick={onShareFacebook}
        className="text-sm underline cursor-pointer"
      >
        <img src={Facebook} alt="Facebook" />
      </button>
            <button
        onClick={onShareLinkedIn}
        className="text-sm underline cursor-pointer"
      >
        <img src={LinkedIn} alt="LinkedIn" />
      </button>
            <button
        onClick={onShareTwitter}
        className="text-sm underline cursor-pointer"
      >
        <img src={Twitter} alt="Twitter" />
      </button>
      </div>
    </div>
  );
}

export default PostActions;
