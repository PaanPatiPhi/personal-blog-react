import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hamburgerIcon from "../../assets/icon/hamburger_bar.png";

function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full border-b border-brown-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:mx-auto py-4 md:max-w-[1217px]">
        {/* Title as Link */}
        <Link to="/" className="font-bold text-2xl">
          Patiparn T<span className="text-(--color-brand-green)">.</span>
        </Link>

        {/* Hamburger / buttons */}
        <div className="flex justify-evenly gap-x-2">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img
              src={hamburgerIcon}
              alt="menu"
              className="w-6 h-6 object-contain md:hidden"
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top duration-300 space-y-6 px-6 py-4 border-t md:hidden">
              <button className="w-full h-[48px] border-solid rounded-full border-black border-1 block">
                Log In
              </button>
              <button className="w-full h-[48px] border-solid rounded-full border-1 bg-black text-white block"
              onClick={()=>navigate("/signup")}>
                Sign Up
              </button>
            </div>
          )}

          <button className="w-[127px] h-[48px] border-solid rounded-full border-black border-1 md:block hidden">
            Log In
          </button>
          <button className="w-[127px] h-[48px] border-solid rounded-full border-1 bg-black text-white md:inline hidden"
          onClick={()=>navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;