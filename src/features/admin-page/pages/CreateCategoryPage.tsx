// CreateCategoryPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateCategoryPage() {
  const navigate = useNavigate();

  // state เก็บชื่อ category
  const [name, setName] = useState("");

  return (
    <div className="space-y-6 px-15">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-(--color-brown-300) pb-4">
        <h1 className="text-xl font-semibold">Create category</h1>

        <button
          onClick={() => {
            // TODO: call create API
            console.log("save category:", name);

            // save เสร็จแล้วกลับไปหน้า list
            navigate("/admin/categories");
          }}
          className="rounded-full bg-black px-6 py-2 text-sm text-white"
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="max-w-md space-y-2">
        <label className="text-sm text-gray-600">Category name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full rounded border px-4 py-2 text-sm"
        />
      </div>
    </div>
  );
}
