import { useNavigate } from "react-router-dom";

/**
 * Props ของ GuestMenu
 * - mobile: บอกว่า render ใน mobile dropdown
 * - onClose: callback ปิด menu จาก NavBar
 */
type GuestMenuProps = {
  mobile?: boolean;
  onClose?: () => void;
};

function GuestMenu({ mobile = false, onClose }: GuestMenuProps) {
  const navigate = useNavigate();

  /**
   * helper สำหรับ mobile
   * - เปลี่ยนหน้า
   * - ปิด menu
   */
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  // ===============================
  // ===== Mobile version ==========
  // ===============================
  if (mobile) {
    return (
      <div className="flex flex-col">
        <button
          className="w-full py-3"
          onClick={() => handleNavigate("/login")}
        >
          Log In
        </button>

        <button
          className="w-full py-3 bg-black text-white"
          onClick={() => handleNavigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    );
  }

  // ===============================
  // ===== Desktop version =========
  // ===============================
  return (
    <div className="flex gap-x-2">
      <button
        className="w-[127px] h-[48px] border rounded-full cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Log In
      </button>

      <button
        className="w-[127px] h-[48px] bg-black text-white rounded-full cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default GuestMenu;
