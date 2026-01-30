import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";


/**
 * หน้า Category management
 * - แสดง list ของ category
 * - มี search
 * - มีปุ่ม create
 * - มี action edit / delete
 */
export default function CategoryManagement() {
  // state เก็บค่าค้นหา
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // mock data (ภายหลังค่อยเปลี่ยนเป็น fetch จาก API)
  const categories = [
    { id: 1, name: "Cat" },
    { id: 2, name: "General" },
    { id: 3, name: "Inspiration" },
  ];

  // filter category ตาม search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 px-15">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between border-b border-(--color-brown-300) pb-4">
        <h1 className="text-xl font-semibold ">Category management</h1>

        {/* ปุ่มสร้าง category */}
        <button className="flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm text-white"
        onClick={() => navigate("/admin/categories/create")}>
          <span className="text-lg leading-none">+</span>
          Create category
        </button>
      </div>

      {/* ===== Search ===== */}
      <div className="max-w-sm">
        <div className="relative">
          {/* input ค้นหา */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full rounded border px-10 py-2 text-sm border-(--color-brown-300) bg-white"
          />

          {/* icon search */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-brown-400)">
            🔍
          </span>
        </div>
      </div>

      {/* ===== Category Table ===== */}
      <div className="overflow-hidden rounded border bg-white border-(--color-brown-300)">
        {/* table header */}
        <div className="border-b border-(--color-brown-300) bg-gray-50 px-4 py-3 text-sm font-medium text-(--color-brown-400)">
          Category
        </div>

        {/* table body */}
        <ul>
          {filteredCategories.map((cat, index) => (
            <li
              key={cat.id}
              className={`flex items-center justify-between px-4 py-4 text-sm 
                ${index % 2 === 1 ? "bg-(--color-brown-200)" : "bg-white"}
              `}
            >
              {/* ชื่อ category */}
              <span>{cat.name}</span>

              {/* action buttons */}
              <div className="flex gap-4 text-gray-500">
                {/* edit */}
                <button
                  className="hover:text-black"
                  onClick={() => {
                    console.log("edit", cat.id);
                  }}
                >
                  <Pencil size={16} />
                </button>

                {/* delete */}
                <button
                  className="hover:text-red-600"
                  onClick={() => {
                    console.log("delete", cat.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}

          {/* กรณีไม่เจอข้อมูล */}
          {filteredCategories.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-gray-400">
              No category found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
