import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const menuClass =
  "flex items-center gap-3 px-4 py-2 rounded text-sm";

export default function AdminSidebar() {
  return (
    <aside className="w-68 bg-[#f6f4f1] border-r min-h-screen pt-15 pb-6 flex flex-col border-none">
      {/* Logo */}
      <div className="mb-10 px-6 flex flex-col space-y-5">
        <Link to="/" className="font-bold text-2xl">
          Patiparn T<span className="text-(--color-brand-green)">.</span>
        </Link>
        <div className="text-sm text-orange-400">Admin panel</div>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {[
          { to: "/admin/articles", label: "Article management" },
          { to: "/admin/categories", label: "Category management" },
          { to: "/admin/profile", label: "Profile" },
          { to: "/admin/notification", label: "Notification" },
          { to: "/admin/reset-password", label: "Reset Password" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${menuClass} ${
                isActive
                  ? "bg-(--color-brown-300) text-black font-medium shadow-sm py-6"
                  : "text-gray-600 hover:bg-white/60 py-6"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-10 text-sm text-gray-500 px-6">
        <a href="/" className="block mb-4">↗ hh.website</a>
        <hr className="text-(--color-brown-300) my-5"/>
        <button className="text-left">⎋ Log out</button>
      </div>
    </aside>
  );
}