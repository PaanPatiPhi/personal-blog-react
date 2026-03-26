// CreateCategoryPage.tsx
import { useState } from "react";
import useCreateCategory from "@/features/category/hooks/useCreateCategory";
import Toast from "@/shared/components/Toast";

export default function CreateCategoryPage() {
  const { createCategory } = useCreateCategory();
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success",
  );

  // state เก็บชื่อ category
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory({
        name: categoryName,
      });
      setToastTitle("Saved Category");
      setToastDescription("Category has been successfully created.");
      setToastType("success");
      setShowToast(true);
      // navigate("/admin/categories");
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      setToastTitle("Save Category failed");
      setToastDescription(`Error ${error}`);
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    finally{
      setShowToast(false);
    }
  };

  return (
    <form className="space-y-6 px-15" onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-(--color-brown-300) pb-4">
        <h1 className="text-xl font-semibold c">Create category</h1>

        <button
          type="submit"
          className="rounded-full bg-black px-6 py-2 text-sm text-white cursor-pointer"
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="max-w-md space-y-2">
        <label className="text-sm text-gray-600">Category name</label>

        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category name"
          className="w-full rounded border px-4 py-2 text-sm"
        />
      </div>
      <Toast
        show={showToast}
        title={toastTitle}
        description={toastDescription}
        type={toastType}
      />
    </form>
  );
}
