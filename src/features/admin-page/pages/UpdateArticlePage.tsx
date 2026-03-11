import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetPostById from "@/features/admin-page/hook/useGetPostById";
import useGetCategories from "@/features/category/hooks/useGetCategories";
import imageIcon from "../../../assets/icon/admin-page/Img_box_light.png";
import LoadingPage from "@/shared/layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import useUpdatePost from "../hook/useUpdatePost";

type FormState = {
  title: string;
  category_id: number;
  introduction: string;
  content: string;
  thumbnailUrl: string | null;
  thumbnailFile: File | null;
};

export default function UpdateArticlePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const articleId = id ? Number(id) : undefined;
  const isEditMode = Boolean(articleId);

  const { data: article, isLoading } = useGetPostById(articleId);
  const { data: categories = [] } = useGetCategories();
  const { updatePost } = useUpdatePost();

  const [form, setForm] = useState<FormState>({
    title: "",
    category_id: 0,
    introduction: "",
    content: "",
    thumbnailUrl: null,
    thumbnailFile: null,
  });
  type StatusType = "draft" | "published";

  const STATUS_MAP: Record<StatusType, number> = {
    draft: 1,
    published: 2,
  };

  /**
   * preload data ตอน edit
   */
  useEffect(() => {
    if (!article || !isEditMode) return;

    setForm({
      title: article.title ?? "",
      category_id: article.category_id ?? 0,
      introduction: article.description ?? "",
      content: article.content ?? "",
      thumbnailUrl: article.image ?? null,
      thumbnailFile: null,
    });
  }, [article, isEditMode]);

  /**
   * submit form
   */
  const handleSubmit = async (status: StatusType) => {
    if (!articleId) return;

    const payload = {
      title: form.title,
      category_id: form.category_id,
      description: form.introduction,
      content: form.content,
      image: form.thumbnailUrl ?? "",
      status_id: STATUS_MAP[status],
    };

    await updatePost(articleId, payload);

    navigate("/admin/articles");
  };

  if (isEditMode && isLoading) {
    return <LoadingPage />;
  }

  if (isEditMode && !article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="max-w-full space-y-6 px-15">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 cursor-pointer">
        <h1 className="text-xl font-semibold">
          {isEditMode ? "Edit article" : "Create article"}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            className="rounded-full border px-4 py-2 text-sm cursor-pointer"
          >
            Save as draft
          </button>

          <button
            onClick={() => handleSubmit("published")}
            className="rounded-full bg-black px-4 py-2 text-sm text-white cursor-pointer"
          >
            {isEditMode ? "Update article" : "Save and publish"}
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">
          Thumbnail image
        </label>

        <div className="flex gap-6 items-end mt-3">
          <div className="flex h-[260px] w-[460px] items-center justify-center rounded border border-(--color-brown-300) border-dashed bg-(--color-brown-200) overflow-hidden">
            {form.thumbnailFile ? (
              <img
                src={URL.createObjectURL(form.thumbnailFile)}
                alt="thumbnail preview"
                className="h-[260px] w-[460px] object-cover"
              />
            ) : form.thumbnailUrl ? (
              <img
                src={form.thumbnailUrl}
                alt="thumbnail"
                className="h-[260px] w-[460px] object-cover"
              />
            ) : (
              <img src={imageIcon} alt="imageIcon" />
            )}
          </div>

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

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Category</label>

        <select
          value={form.category_id}
          onChange={(e) =>
            setForm({
              ...form,
              category_id: Number(e.target.value),
            })
          }
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        >
          <option value="">Select category</option>

          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Title</label>

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Article title"
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>

      {/* Introduction */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Introduction</label>

        <textarea
          rows={3}
          value={form.introduction}
          onChange={(e) => setForm({ ...form, introduction: e.target.value })}
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Content</label>

        <textarea
          rows={10}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>
    </div>
  );
}
