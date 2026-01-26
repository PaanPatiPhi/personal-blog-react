import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import profileIcon from "../../../assets/icon/NavBar/User_duotone.png"
import reserPasswordIcon from "../../../assets/icon/NavBar/Refresh_light.png"
import logoutIcon from "../../../assets/icon/NavBar/Sign_out_squre_light.png"



function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

    const handleLogout = () => {
    logout();        // ล้าง state + localStorage
    navigate("/");   // เด้งกลับหน้าแรก
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <img
  src={user?.image || "/avatar.png"}
  alt={user?.name}
  className="w-8 h-8 rounded-full object-cover"
/>

        <span>{user?.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 py-2 bg-white rounded-3xl shadow-lg ">
          
          <button
            className="w-full text-left px-4 py-2 flex gap-3"
            onClick={() => navigate("/profile?tab=profile")}
          >
            <img src={profileIcon} /> Profile
          </button>
          
          <button
            className="w-full text-left px-4 py-2 flex gap-3"
            onClick={() => navigate("/profile?tab=password")}
          >
            <img src={reserPasswordIcon} /> Reset password
          </button>
          <hr className="w-[90%] mx-auto text-(--color-brown-300)"/>
          <button
            className="w-full text-left px-4 py-2 flex gap-3"
            onClick={handleLogout}
          >
           <img src={logoutIcon} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
