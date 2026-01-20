import DefaultAuthorImage from "../../../assets/image/authors/ThomsanP.png";

type AuthorCardProps = {
  name: string;
  image?: string;
  bio?: string;
};

function AuthorCard({ name, image, bio }: AuthorCardProps) {
  return (
    <aside
      className="
        flex flex-col items-center gap-5
        bg-(--color-brown-200)
        rounded-md py-6 px-6
        w-full
        md:sticky md:top-24
        md:w-[305px] md:h-[400px]
      "
    >
      <div className="flex w-full gap-3">
        <img
          src={image || DefaultAuthorImage}
          alt={name}
          className="w-11 h-11 rounded-full object-cover"/>
        <div className="flex flex-col">
          <span>author</span>
          <h4 className="text-[20px] font-semibold">{name}</h4>
        </div>
      </div>

      <hr className="w-full border-t border-(--color-brown-300)" />

      <p className="text-(length:--font-size-body-1)/[24px] text-(--color-brown-400) tracking-wide">
        {bio}
      </p>
    </aside>
  );
}


export default AuthorCard;
