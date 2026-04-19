import Snowfall from "react-snowfall";
import { Linkedin } from "lucide-react";
import { Github } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="w-full bg-(--color-brown-200) h-[144px] md:h-[152px]">
      <Snowfall color="#f3e5d8" />
      <div className="flex flex-col md:flex-row md:justify-between items-center md:py-15  py-10 mx-auto md:max-w-[1217px]">
        <div className="flex md:justify-between gap-6 justify-center items-center">
          <h1 className="text-(length:--text-size-headline-1) font-medium">
            Get in touch
          </h1>
          <a 
            href="https://www.linkedin.com/in/patiparn-thamboonrak" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Linkedin />
          </a>
          <a 
            href="https://github.com/PaanPatiPhi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Github />
          </a>
          <a 
            href="mailto:patiparn.phi@gmail.com" 
            className="hover:opacity-80 transition-opacity"
          >
            <Mail />
          </a>
        </div>
        <button>
          <Link to="/" className="text-(length:--text-size-headline-1) font-medium">
            Homepage
          </Link>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
