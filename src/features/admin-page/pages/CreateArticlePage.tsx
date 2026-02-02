import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetPostById from "@/features/admin-page/hook/useGetPostById";
import imageIcon from "../../../assets/icon/admin-page/Img_box_light.png"


/**
 * หน้า Create / Edit Article
 * - ถ้ามี id → edit mode
 * - ถ้าไม่มี id → create mode
 */
export default function CreateArticlePage() {
  const { id } = useParams(); // อ่าน id จาก url (/admin/articles/:id/edit)

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
    <div className="max-w-full space-y-6 px-15">
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
        <label className="text-sm text-(--color-brown-400)">Thumbnail image</label>

        <div className="flex gap-6 items-end mt-3">
          {/* Preview */}
          <div className="flex h-[260px] w-[460px] items-center justify-center rounded border border-(--color-brown-300) border-dashed bg-(--color-brown-200) overflow-hidden">
            {/* ถ้ามีไฟล์ใหม่ → preview จาก File */}
            {form.thumbnailFile ? (
              <img
                src={URL.createObjectURL(form.thumbnailFile)}
                alt="thumbnail preview"
                className="h-[260px] w-[460px] object-cover"
              />
            ) : form.thumbnailUrl ? (
              /* ถ้า edit และยังไม่เปลี่ยนรูป → แสดงรูปเดิม */
              <img
                src={form.thumbnailUrl}
                alt="thumbnail"
                className="h-[260px] w-[460] object-cover"
              />
            ) : (
              <img
              src={imageIcon}
              alt="imageIcon"/>
            )}
          </div>

          {/* Upload button */}
          <label className="rounded-full border px-10 py-3 text-sm cursor-pointer bg-white border-(--color-brown-400)">
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
        <label className="text-sm text-(--color-brown-400)">Category</label>
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        >
          <option value="">Select category</option>
          <option value="Cat">Cat</option>
          <option value="General">General</option>
          <option value="Inspiration">Inspiration</option>
        </select>
      </div>

      {/* ================= Author ================= */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Author name</label>
        <input
          disabled
          value="Thompson P."
          className="w-full rounded border bg-gray-100 px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>

      {/* ================= Title ================= */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Title</label>
        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Article title"
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>

      {/* ================= Introduction ================= */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">
          Introduction (max 120 letters)
        </label>
        <textarea
          placeholder="Introduction"
          rows={3}
          value={form.introduction}
          onChange={(e) =>
            setForm({ ...form, introduction: e.target.value })
          }
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>

      {/* ================= Content ================= */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Content</label>
        <textarea
          placeholder="content"
          rows={10}
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>
    </div>
  );
}
