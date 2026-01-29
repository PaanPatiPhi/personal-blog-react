import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSideBar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="flex max-w-[1400px] mx-auto">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 bg-[#faf9f7] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout