import { Pencil, Trash2, Plus } from "lucide-react";
import useGetPost from "@/features/article/hook/useGetPost";
import { useNavigate } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
  },
  {
    id: 2,
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Published",
  },
  {
    id: 3,
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    id: 4,
    title: "The Science of the Cat’s Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    id: 5,
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Published",
  },
  {
    id: 6,
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
];



export default function ArticleManagement() {
    const navigate = useNavigate();
    const { blogData } = useGetPost({keyword:""});
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Article management</h1>


<button
  onClick={() => navigate("/admin/articles/create")}
  className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white"
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
            className="w-full rounded border px-4 py-2 text-sm focus:outline-none"
          />
        </div>

        <select className="rounded border px-4 py-2 text-sm">
          <option>Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>

        <select className="rounded border px-4 py-2 text-sm">
          <option>Category</option>
          <option>Cat</option>
          <option>General</option>
          <option>Inspiration</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_140px_120px_80px] border-b px-6 py-3 text-sm text-gray-500">
          <div>Article title</div>
          <div>Category</div>
          <div>Status</div>
          <div></div>
        </div>

        {/* Table rows */}
        {blogData.map((article, index) => (
          <div
            key={article.id}
            className={`grid grid-cols-[1fr_140px_120px_80px] items-center px-6 py-4 text-sm ${
              index % 2 === 1 ? "bg-gray-50" : ""
            }`}
          >
            <div className="truncate">{article.title}</div>
            <div>{article.category}</div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {article.status || "published"}
            </div>

            <div className="flex items-center gap-3 text-gray-500">
<button
  onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
  className="hover:text-black"
>
  <Pencil size={16} />
</button>

              <button className="hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
