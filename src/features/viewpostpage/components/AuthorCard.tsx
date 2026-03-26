import DefaultAuthorImage from "../../../assets/image/authors/ThomsanP.png";
import { useProfile } from "@/features/profile/contexts/profile-context.tsx";

function AuthorCard() {
  const { profile, loading } = useProfile();

  return (
    <aside
      className="
        flex flex-col items-center gap-5
        bg-(--color-brown-200)
        rounded-md py-6 px-6
        w-full
        md:sticky md:top-24
        md:w-[305px] md:h-[440px]
      "
    >
      <div className="flex w-full gap-3">
        <img
          src={profile?.profile_pic || DefaultAuthorImage}
          alt={profile?.name || "Author"}
          className="w-11 h-11 rounded-full object-cover"/>
        <div className="flex flex-col">
          <span>author</span>
          <h4 className="text-[20px] font-semibold">
            {loading ? "Loading..." : profile?.name || "Patiparn T."}
          </h4>
        </div>
      </div>

      <hr className="w-full border-t border-(--color-brown-300)" />

      <p className="text-(length:--font-size-body-1)/[24px] text-(--color-brown-400) tracking-wide">
        {loading ? "Loading..." : profile?.bio || "I am a pet enthusiast and freelance writer who specializes in animal behavior and care."}
      </p>
    </aside>
  );
}


export default AuthorCard;
