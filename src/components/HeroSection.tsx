import CatImage from "../assets/image/Cat_punching.png";
function HeroSection() {
  return (
      <section className="flex flex-col md:flex-row items-center md:justify-around py-10 px-2 md:px-auto md:py-15 md:max-w-[1217px] md:mx-auto ">

        {/* Left content: headline and description */}
        <div className="max-w-[343px] flex flex-col space-y-1.5 items-center md:items-end ">
          <h1 className="font-semibold md:text-(length:--font-size-headline-1) text-(length:--font-size-headline-2)">
            Stay Informed, <br />
            Stay Inspired
          </h1>
          <p className="text-(length:--font-size-body-1) text-(--color-brown-400)">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>

        {/* Hero image with fixed aspect ratio */}
          <div
            className="flex-none my-5
            relative overflow-hidden rounded-[2rem] shadow-2xl 
                  w-[343px] h-[400px] 
                  md:w-[400px] md:h-[530px]"
          >
            <img
              className="w-full h-full object-cover"
              src={CatImage}
              alt="Cat??"
            ></img>
          </div>

        {/* Author information */}
        <div className="md:max-w-[343px] items-center ">
          <h4 className="text-(length:--font-size-headline-4) text-(--color-brown-400) md:text-left text-center">
            -author
          </h4>
          <h3 className="text-(length:--font-size-headline-3) font-semibold md:text-left text-center">
            Patiparn T.
          </h3>
          <p className="text-(length:--font-size-body-1) text-(--color-brown-400) md:text-left text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            debitis reiciendis, repellat recusandae pariatur, autem perferendis
            dolores quaerat facere dignissimos distinctio aliquam consectetur
            perspiciatis magnam veritatis iste odio cupiditate quos?
          </p>
        </div>
      </section>
  );
}

export default HeroSection;
