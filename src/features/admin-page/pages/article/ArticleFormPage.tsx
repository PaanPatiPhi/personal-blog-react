import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetCategories from "@/features/category/hooks/useGetCategories";
import useGetPostById from "@/features/admin-page/hook/useGetPostById";
import useCreatePost from "../../hook/useCreatePost";
import useUpdatePost from "../../hook/useUpdatePost";
import { supabase } from "@/lib/supabase";
import imageIcon from "../../../../assets/icon/admin-page/Img_box_light.png";
import Loading from "@/shared/layout/loading/Loading";
import { useProfile } from "@/features/profile/contexts/profile-context.tsx";

type FormState = {
  title: string;
  category_id: number;
  introduction: string;
  content: string;
  thumbnailUrl: string | null;
  thumbnailFile: File | null;
};

type StatusType = "draft" | "published";

export default function ArticleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const { data: categories = [], isLoadingCat } = useGetCategories();
  const { data: article, isLoading: isLoadingArticle } = useGetPostById(isEditMode ? Number(id) : undefined);
  const { createPost } = useCreatePost();
  const { updatePost } = useUpdatePost();
  const profile = useProfile();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    category_id: 0,
    introduction: "",
    content: "",
    thumbnailUrl: null,
    thumbnailFile: null,
  });

  const STATUS_MAP: Record<StatusType, number> = {
    draft: 1,
    published: 2,
  };

  // ถ้า edit mode ให้ populate form ด้วยข้อมูล article เดิม
  useEffect(() => {
    if (article && isEditMode) {
      setForm({
        title: article.title || "",
        category_id: article.category_id || 0,
        introduction: (article as any).introduction || "",
        content: article.content || "",
        thumbnailUrl: article.image || null,
        thumbnailFile: null,
      });
    }
  }, [article, isEditMode]);

  const uploadImage = async (file: File) => {
    const filePath = `posts/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    return publicUrl.publicUrl;
  };

  const handleSubmit = async (status: StatusType) => {
    // ป้องกัน double click
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      let imageUrl = form.thumbnailUrl;

      // upload image ก่อน
      if (form.thumbnailFile) {
        imageUrl = await uploadImage(form.thumbnailFile);
      }

      const payload = {
        title: form.title,
        category_id: form.category_id,
        description: form.introduction,
        content: form.content,
        image: imageUrl ?? "",
        status_id: STATUS_MAP[status] as 1 | 2,
      };

      if (isEditMode && id) {
        // Update mode
        await updatePost(Number(id), {
          title: payload.title,
          category_id: payload.category_id,
          description: payload.description,
          content: payload.content,
          image: payload.image,
          status_id: STATUS_MAP[status] as 1 | 2,
        });
      } else {
        // Create mode
        await createPost(payload);
      }

      navigate("/admin/articles");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isLoadingCat || (isEditMode && isLoadingArticle);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-full space-y-6 px-15">

      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold">
          {isEditMode ? "Edit article" : "Create article"}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            className="rounded-full border px-4 py-2 text-sm cursor-pointer"
            disabled={isSubmitting}
          >
            Save as draft
          </button>

          <button
            onClick={() => handleSubmit("published")}
            className="rounded-full bg-black px-4 py-2 text-sm text-white cursor-pointer"
            disabled={isSubmitting}
          >
            Save and publish
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
                alt="thumbnail preview"
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
          disabled={isLoadingCat}
          className="w-full rounded border px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        >
          <option value="">
            {isLoadingCat ? "Loading..." : "Select category"}
          </option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Author */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Author name</label>

        <input
          disabled
          value={(profile as any)?.name || "Thompson P."}
          className="w-full rounded border bg-gray-100 px-4 py-2 mt-3 text-sm text-(--color-brown-400)"
        />
      </div>

      {/* Title */}
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

      {/* Introduction */}
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

      {/* Content */}
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
