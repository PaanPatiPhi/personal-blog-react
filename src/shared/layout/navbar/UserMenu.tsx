import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/contexts/auth-provider";
import { useProfile } from "@/features/profile/hooks/useProfile";

// icon ต่าง ๆ
import profileIcon from "../../../assets/icon/NavBar/User_duotone.png";
import resetPasswordIcon from "../../../assets/icon/NavBar/Refresh_light.png";
import logoutIcon from "../../../assets/icon/NavBar/Sign_out_squre_light.png";
import avatar from "../../../assets/image/profile/avatar.png";
import notification_bell from "../../../assets/icon/NavBar/notification_bell_icon.svg";
import Expand_down_light from "../../../assets/icon/NavBar/Expand_down_light.svg";

/**
 * Props ของ UserMenu
 * - mobile: ใช้บอกว่า render ใน mobile dropdown หรือไม่
 * - onClose: callback สำหรับปิด menu จาก parent (NavBar)
 */
type UserMenuProps = {
  mobile?: boolean;
  onClose?: () => void;
};

function UserMenu({ mobile = false, onClose }: UserMenuProps) {
  // ดึง user และ logout function จาก auth context
  const { user, logout, isAdmin } = useAuth();

  // state สำหรับ desktop dropdown (mobile ไม่ใช้)
  const [open, setOpen] = useState(false);

  // ใช้สำหรับเปลี่ยนหน้า
  const navigate = useNavigate();

  /**
   * logout + ปิด menu + redirect
   */
  const handleLogout = () => {
    logout(); // ล้าง auth state + localStorage
    onClose?.(); // ปิด mobile menu (ถ้ามี)
    navigate("/"); // กลับหน้าแรก
  };

  /**
   * navigate ไปหน้าต่าง ๆ
   * - ปิด dropdown (desktop)
   * - ปิด mobile menu (ถ้ามี)
   */
  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); // ปิด desktop dropdown
    onClose?.(); // ปิด mobile menu
  };
  const profile = useProfile().profile as {
    name?: string;
    profile_pic?: string;
  } | null;

  // ===============================
  // ===== Mobile version ==========
  // ===============================
  // mobile menu ไม่มี dropdown
  if (mobile) {
    return (
      <div className="flex flex-col gap-2">
        {isAdmin && (
          <button className="flex items-center justify-center rounded-full border border-(--color-blown-200)">
            <img src={notification_bell} alt="notification" />
          </button>
        )}
        <button
          className="w-full text-left px-4 py-2 flex gap-3"
          onClick={() => handleNavigate("/profile?tab=profile")}
        >
          <img src={profileIcon} alt="profile icon" />
          Profile
        </button>

        <button
          className="w-full text-left px-4 py-2 flex gap-3"
          onClick={() => handleNavigate("/profile?tab=password")}
        >
          <img src={resetPasswordIcon} alt="reset password icon" />
          Reset password
        </button>

        <hr className="w-[90%] mx-auto text-(--color-brown-300)" />

        <button
          className="w-full text-left px-4 py-2 flex gap-3"
          onClick={handleLogout}
        >
          <img src={logoutIcon} alt="logout icon" />
          Log out
        </button>
      </div>
    );
  }

  // ===============================
  // ===== Desktop version =========
  // ===============================
  // desktop ใช้ dropdown
  return (
    <div className="relative">
      {/* ปุ่ม avatar + name */}
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer flex items-center gap-2"
          onClick={() => setOpen(!open)}
        >
          <img
            src={profile?.profile_pic || avatar}
            alt={profile?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{profile?.name || user?.email}</span>
          <img
            src={Expand_down_light}
            alt="expand down icon"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 py-2 bg-white rounded-3xl shadow-lg">
          <button
            className="w-full text-left px-4 py-2 flex gap-3"
            onClick={() => {
              if (isAdmin === true) {
                handleNavigate("/admin/profile");
              } else {
                handleNavigate("/profile?tab=profile");
              }
            }}
          >
            <img src={profileIcon} alt="profile icon" />
            Profile
          </button>

          <button
            className="w-full text-left px-4 py-2 flex gap-3"
            onClick={() => {
              if (isAdmin === true) {
                handleNavigate("/admin/reset-password");
              } else {
                handleNavigate("/profile?tab=password");
              }
            }}
          >
            <img src={resetPasswordIcon} alt="reset password icon" />
            Reset password
          </button>

          <hr className="w-[90%] mx-auto text-(--color-brown-300)" />

          <button
            className="w-full text-left px-4 py-2 flex gap-3"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="logout icon" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
