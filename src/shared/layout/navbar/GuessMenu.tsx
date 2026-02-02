import { useNavigate } from "react-router-dom";

/**
 * Props ของ GuestMenu
 * - onClose: callback สำหรับปิด mobile menu (ส่งมาจาก NavBar)
 *   desktop จะไม่ใช้ prop นี้
 */
type GuestMenuProps = {
  onClose?: () => void;
};

function GuestMenu({ onClose }: GuestMenuProps) {
  // ใช้สำหรับเปลี่ยนหน้า
  const navigate = useNavigate();

  /**
   * helper function
   * - navigate ไปหน้าใหม่
   * - ปิด mobile menu (ถ้ามี)
   */
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.(); // ปิด mobile dropdown (ถ้า render ใน mobile)
  };

  return (
    <div className="flex gap-x-2 relative">
      {/* ================= Mobile menu ================= */}
      {/* แสดงเฉพาะ mobile (md:hidden)
          position absolute เหมือนเดิม ไม่เปลี่ยน UI */}
      <div className="absolute top-full right-0 w-full bg-white shadow-lg md:hidden">
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

      {/* ================= Desktop menu ================= */}
      {/* ปุ่ม desktop แสดงเหมือนเดิมทุกอย่าง */}
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
