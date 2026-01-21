import { SmileIcon } from "lucide-react";
import { Copy } from "lucide-react";
import Facebook from "../../../assets/icon/post/Facebook_black.png";
import LinkedIn from "../../../assets/icon/post/LinkedIN_black.png";
import Twitter from "../../../assets/icon/post/Twitter_black.png";


type PostActionsProps = {
  likes: number;
  onLike: () => void;
  onCopyLink?: () => void;
  onShareFacebook?: () => void;
  onShareLinkedIn?: () => void;
  onShareTwitter?: () => void;
};

function PostActions({
  likes,
  onLike,
  onCopyLink,
  onShareFacebook,
  onShareLinkedIn,
  onShareTwitter,
}: PostActionsProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 mt-6 -mx-4 md:mx-auto bg-(--color-brown-200) w-[375px] md:w-full md:rounded-[16px]">
      <button
        onClick={onLike}
        className="flex items-center gap-2 text-sm mx-auto md:ml-10 my-5 bg-white w-[343px] md:w-[135px] h-[48px] rounded-[999px] justify-center border-(--color-brown-400) border-1"
      >
        <SmileIcon />
        <span>{likes}</span>
      </button>
    <div className="flex justify-around mb-5 md:my-5 md:gap-5 md:mr-10">
      <button
        onClick={onCopyLink}
        className="flex items-center gap-2 text-sm  bg-white w-[161px] h-[48px] rounded-[999px] justify-center border-(--color-brown-400) border-1"
      >
        <Copy /> 
        <span>Copy link</span>
      </button>
      <button
        onClick={onShareFacebook}
        className="text-sm underline"
      >
        <img src={Facebook} alt="Facebook" />
      </button>
            <button
        onClick={onShareLinkedIn}
        className="text-sm underline"
      >
        <img src={LinkedIn} alt="LinkedIn" />
      </button>
            <button
        onClick={onShareTwitter}
        className="text-sm underline"
      >
        <img src={Twitter} alt="Twitter" />
      </button>
      </div>
    </div>
  );
}

export default PostActions;
