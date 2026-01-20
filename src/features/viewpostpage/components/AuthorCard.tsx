import DefaultAuthorImage from "../../../assets/image/authors/ThomsanP.png";

type AuthorCardProps = {
  name: string;
  image?: string;
  bio?: string;
};

function AuthorCard({ name, image, bio }: AuthorCardProps) {
  return (
    <div className="flex flex-col items-center gap-5 mt-10 w-85.75 bg-(--color-brown-200) mx-auto rounded-md py-6 px-6">
      <div className="flex w-73.75 gap-3">
        <img
          src={image || DefaultAuthorImage}
          alt={name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span>author</span>
          <h4 className="text-[20px] font-semibold">{name}</h4>
        </div>
      </div>

      <hr className="w-73.75 border-t border-(--color-brown-300)" />

      <p className="text-(length:--font-size-body-1)/[24px] text-(--color-brown-400) tracking-wide">
        {bio}
      </p>
    </div>
  );
}

export default AuthorCard;
