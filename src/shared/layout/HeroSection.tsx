import CatImage from "../../assets/image/hero/cat_hero.jpeg";
import { useProfile } from "@/features/profile/contexts/profile-context.tsx";

function HeroSection() {
  const { profile, loading } = useProfile();

  return (
      <section className="flex flex-col md:flex-row items-center md:justify-around py-10 px-2 md:px-auto md:py-15 md:max-w-[1217px] md:mx-auto md:gap-8 gap-6">

        {/* Left content: headline and description */}
        <div className="w-[347px] flex flex-col space-y-1.5 items-center md:items-end ">
          <h1 className="font-semibold md:text-(length:--font-size-headline-1) text-(length:--font-size-headline-2)">
            Stay Informed, <br />
            Stay Inspired
          </h1>
          <p className="text-(length:--font-size-body-1) text-(--color-brown-400)">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>

        {/* Profile image with fixed aspect ratio */}
          <div
            className="flex-none my-5
            relative overflow-hidden rounded-[2rem] shadow-2xl 
                  w-[386px] h-[450px] 
                  md:w-[386px] md:h-[511px]"
          >
            <img
              className="w-full h-full object-cover"
              src={profile?.profile_pic || CatImage}
              alt="Profile"
            ></img>
          </div>

        {/* Author information */}
        <div className="w-[347px] items-center ">
          <h4 className="text-(length:--font-size-headline-4) text-(--color-brown-400) md:text-left text-center">
            -author
          </h4>
          <h3 className="text-(length:--font-size-headline-3) font-semibold md:text-left text-center">
            {loading ? "Loading..." : profile?.name || "Patiparn T."}
          </h3>
          <p className="text-(length:--font-size-body-1) text-(--color-brown-400) md:text-left text-center">
            {loading ? "Loading..." : profile?.bio || "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos debitis reiciendis, repellat recusandae pariatur, autem perferendis dolores quaerat facere dignissimos distinctio aliquam consectetur perspiciatis magnam veritatis iste odio cupiditate quos?"}
          </p>
        </div>
      </section>
  );
}

export default HeroSection;
