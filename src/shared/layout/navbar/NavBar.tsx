import { useState } from "react";
import { Link } from "react-router-dom";
import hamburgerIcon from "../../../assets/icon/hamburger_bar.png";
import { useAuth } from "@/features/auth/context/authentication";
import GuestMenu from "./GuessMenu";
import UserMenu from "./UserMenu";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
console.log("NavBar user:", isAuthenticated);

  return (
    <nav className="w-full border-b border-brown-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:mx-auto py-4 md:max-w-[1217px]">
        <Link to="/" className="font-bold text-2xl">
          Patiparn T<span className="text-(--color-brand-green)">.</span>
        </Link>

        <div className="flex items-center gap-x-2 relative">
          {/* hamburger: อยู่เสมอ */}
          <button onClick={() => setIsOpen(!isOpen)}>
            <img
              src={hamburgerIcon}
              alt="menu"
              className="w-6 h-6 object-contain md:hidden"
            />
          </button>

          {/* desktop auth menu */}
          <div className="hidden md:block">
            {isAuthenticated ? <UserMenu /> : <GuestMenu />}
          </div>
        </div>
      </div>

      {/* mobile dropdown */}
{isOpen && (
  <div className="md:hidden border-t bg-white shadow-lg px-6 py-4">
    {isAuthenticated ? (
      <UserMenu mobile onClose={() => setIsOpen(false)} />
    ) : (
      <GuestMenu mobile onClose={() => setIsOpen(false)} />
    )}
  </div>
)}

    </nav>
  );
}

export default NavBar;
