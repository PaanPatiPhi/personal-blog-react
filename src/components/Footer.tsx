import Snowfall from "react-snowfall";
import { Linkedin } from "lucide-react";
import { Github } from 'lucide-react';
import { Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full bg-(--color-brown-200) h-[144px] md:h-[152px]">
      <Snowfall color="#f3e5d8" />
      <div className="flex flex-col md:flex-row md:justify-between md:py-15 md:px-30 py-4 px-10 ">
        <div className="flex md:justify-between gap-6 justify-center items-center">
          <h1 className="text-(length:--text-size-headline-1) font-medium">
            Get in touch
          </h1>
          <button>
          <Linkedin />
          </button>
          <button>
          <Github />
          </button>
          <button>
          <Mail />
          </button>
          </div>
        <button>
        <h1 className="text-(length:--text-size-headline-1) font-medium">
          Homepage
        </h1>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
