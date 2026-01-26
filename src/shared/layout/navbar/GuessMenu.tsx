
import { useNavigate } from "react-router-dom";


function GuestMenu({
  onClose,
}: {
  onClose?: () => void;
}) {
  
  const navigate = useNavigate();


  return (
    <div className="flex gap-x-2 relative">
      {/* mobile */}



        <div className="absolute top-full right-0 w-full bg-white shadow-lg md:hidden">
          <button
            className="w-full py-3"
            onClick={() => {navigate("/login");
              onClose?.(); 
            }}
          >
            Log In
          </button>
          <button
            className="w-full py-3 bg-black text-white"
            onClick={() => {navigate("/signup");
              onClose?.(); 
            }}
          >
            Sign Up
          </button>
        </div>
      

      {/* desktop */}
      <button
        className="hidden md:block w-[127px] h-[48px] border rounded-full"
        onClick={() => navigate("/login")}
      >
        Log In
      </button>
      <button
        className="hidden md:block w-[127px] h-[48px] bg-black text-white rounded-full"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default GuestMenu;
