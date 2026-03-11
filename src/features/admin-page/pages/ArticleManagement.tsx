import { Pencil, Trash2 } from "lucide-react";
import useGetPost from "@/features/article/hook/useGetPost";
import { useNavigate } from "react-router-dom";
import useGetCategories from "@/features/category/hooks/useGetCategories";
import LoadingPage from "@/shared/layout/loading/Loading";
import Modal from "@/shared/Modal";
import { useState } from "react";
import { api } from "@/lib/api";

export default function ArticleManagement() {
  const navigate = useNavigate();
  const { blogData, isLoading } = useGetPost({ keyword: "" });
  const { data } = useGetCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [open, setOpen] = useState(false);

  const CATEGORY_MAP = data.reduce<Record<number, string>>((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const STATUS_MAP: Record<number, string> = {
    1: "Draft",
    2: "Published",
  };

  const filteredItems = blogData.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selected === "" ||
      selected === "All" ||
      item.category_id === Number(selected);

    const matchesStatus =
      !selectedStatus || item.status_id === Number(selectedStatus);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (isLoading) return <LoadingPage />;
  return (
    <div className="space-y-6 px-15">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Article management</h1>

        <button
          onClick={() => navigate("/admin/articles/create")}
          className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white cursor-pointer"
        >
          + Create article
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded border px-4 py-2 text-sm focus:outline-none text-(--color-brown-400) bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Smaller dropdown arrow: appearance-none + SVG background with larger backgroundSize (24x24) */}
        <select
          className="rounded border px-4 py-2 text-sm text-(--color-brown-400) bg-white appearance-none"
          style={{
            paddingRight: "3rem", // leave room for larger arrow
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23666' stroke-width='1.5'><path d='M6 8l4 4 4-4' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "24px 24px", // <-- bigger arrow
          }}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="1">Draft</option>
          <option value="2">Published</option>
        </select>

        <select
          className="rounded border px-4 py-2 text-sm text-(--color-brown-400) bg-white appearance-none"
          style={{
            paddingRight: "3rem",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23666' stroke-width='1.5'><path d='M6 8l4 4 4-4' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "24px 24px", // <-- bigger arrow
          }}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option>All</option>
          {data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-(--color-brown-100) border-(--color-brown-300)">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_140px_120px_80px] border-b border-(--color-brown-300) px-6 py-3 text-sm text-(--color-brown-400)">
          <div>Article title</div>
          <div>Category</div>
          <div>Status</div>
          <div></div>
        </div>

        {/* Table rows */}
        {filteredItems.map((article, index) => (
          <div
            key={article.id}
            className={`grid grid-cols-[1fr_140px_120px_80px] items-center px-6 py-4 text-sm ${
              index % 2 === 1 ? "bg-(--color-brown-200)" : ""
            }`}
          >
            <div className="truncate">{article.title}</div>
            <div>{CATEGORY_MAP[article.category_id]}</div>
            <div
              className={`flex items-center gap-2 ${article.status_id === 1 ? "text-gray-500" : "text-green-600" }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${article.status_id === 1 ? "bg-gray-500" : "bg-green-500"}`}
              />
              {STATUS_MAP[article.status_id]}
            </div>

            <div className="flex items-center gap-3 text-(--color-brown-500)">
              <button
                onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                className="hover:text-red-500 cursor-pointer"
              >
                <Pencil size={16} />
              </button>

              <button
                className="hover:text-red-500 cursor-pointer"
                onClick={()=>setOpen(true)}
              >
                <Trash2 size={16} />
              </button>
            </div>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              title="Delete Article"
              message="Do you sure to delete this Article?"
              rightText="Delete"
              leftText="Cancel"
              onRightClick={async () => {
                try {
                  handleDelete(article.id);
                } catch (error) {
                  console.log(error);
                } finally {
                  setOpen(false);
                }
              }}
              onLeftClick={() => {
                setOpen(false);
              }}
              type="secondary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
