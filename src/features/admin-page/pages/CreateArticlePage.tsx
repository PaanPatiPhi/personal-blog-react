import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetPostById from "@/features/admin-page/hook/useGetPostById";

/**
 * หน้า Create / Edit Article
 * - ถ้ามี id → edit mode
 * - ถ้าไม่มี id → create mode
 */
export default function CreateArticlePage() {
  const { id } = useParams(); // อ่าน id จาก url (/admin/articles/:id/edit)
  const navigate = useNavigate();

  const isEditMode = Boolean(id); // ใช้แยก create / edit

  /**
   * เรียก API เฉพาะตอน edit
   * - ถ้า id ไม่มี → hook ควร return null / skip fetch
   */
  const { data: article, isLoading } = useGetPostById(id);

  /**
   * state ของฟอร์ม
   * - thumbnailUrl : รูปเดิมจาก backend (edit)
   * - thumbnailFile: รูปใหม่ที่ user เลือก
   */
  const [form, setForm] = useState({
    title: "",
    category: "",
    introduction: "",
    content: "",
    thumbnailUrl: null as string | null,
    thumbnailFile: null as File | null,
  });

  /**
   * preload ข้อมูลตอน edit
   * ทำงานเมื่อ article ถูกโหลดเสร็จ
   */
  useEffect(() => {
    if (!article || !isEditMode) return;

    setForm({
      title: article.title ?? "",
      category: article.category ?? "",
      introduction: article.introduction ?? "",
      content: article.content ?? "",
      thumbnailUrl: article.image ?? null, // รูปเดิมจาก backend
      thumbnailFile: null, // ยังไม่เลือกไฟล์ใหม่
    });
  }, [article, isEditMode]);

  /**
   * handle submit
   * - ตอนนี้ยังไม่ยิง API (ไว้ต่อขั้นถัดไป)
   */
  const handleSubmit = (status: "draft" | "published") => {
    /**
     * ตัวอย่างโครงสร้างที่ถูกต้องสำหรับ backend
     * (ยังไม่ส่งจริง)
     */
    const payload = {
      ...form,
      status,
    };

    console.log("submit payload:", payload);

    // ตัวอย่าง redirect หลัง save
    // navigate("/admin/articles");
  };

  if (isEditMode && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold">
          {isEditMode ? "Edit article" : "Create article"}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            className="rounded-full border px-4 py-2 text-sm"
          >
            Save as draft
          </button>

          <button
            onClick={() => handleSubmit("published")}
            className="rounded-full bg-black px-4 py-2 text-sm text-white"
          >
            {isEditMode ? "Update article" : "Save and publish"}
          </button>
        </div>
      </div>

      {/* ================= Thumbnail ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Thumbnail image</label>

        <div className="flex gap-6 items-end">
          {/* Preview */}
          <div className="flex h-40 w-72 items-center justify-center rounded border border-dashed bg-gray-100 overflow-hidden">
            {/* ถ้ามีไฟล์ใหม่ → preview จาก File */}
            {form.thumbnailFile ? (
              <img
                src={URL.createObjectURL(form.thumbnailFile)}
                alt="thumbnail preview"
                className="h-full w-full object-cover"
              />
            ) : form.thumbnailUrl ? (
              /* ถ้า edit และยังไม่เปลี่ยนรูป → แสดงรูปเดิม */
              <img
                src={form.thumbnailUrl}
                alt="thumbnail"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Image</span>
            )}
          </div>

          {/* Upload button */}
          <label className="rounded-full border px-4 py-2 text-sm cursor-pointer">
            Upload thumbnail image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setForm({
                  ...form,
                  thumbnailFile: e.target.files?.[0] || null,
                })
              }
            />
          </label>
        </div>
      </div>

      {/* ================= Category ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Category</label>
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full rounded border px-4 py-2 text-sm"
        >
          <option value="">Select category</option>
          <option value="Cat">Cat</option>
          <option value="General">General</option>
          <option value="Inspiration">Inspiration</option>
        </select>
      </div>

      {/* ================= Author ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Author name</label>
        <input
          disabled
          value="Thompson P."
          className="w-full rounded border bg-gray-100 px-4 py-2 text-sm"
        />
      </div>

      {/* ================= Title ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Title</label>
        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Article title"
          className="w-full rounded border px-4 py-2 text-sm"
        />
      </div>

      {/* ================= Introduction ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Introduction (max 120 letters)
        </label>
        <textarea
          rows={3}
          value={form.introduction}
          onChange={(e) =>
            setForm({ ...form, introduction: e.target.value })
          }
          className="w-full rounded border px-4 py-2 text-sm"
        />
      </div>

      {/* ================= Content ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Content</label>
        <textarea
          rows={10}
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="w-full rounded border px-4 py-2 text-sm"
        />
      </div>
    </div>
  );
}
