import { Pencil, Trash2} from "lucide-react";
import useGetPost from "@/features/article/hook/useGetPost";
import { useNavigate } from "react-router-dom";

export default function ArticleManagement() {
	const navigate = useNavigate();
	const { blogData } = useGetPost({ keyword: "" });
	return (
		<div className="space-y-6 px-15">
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
						className="w-full rounded border px-4 py-2 text-sm focus:outline-none text-(--color-brown-400) bg-white"
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
				>
					<option>Status</option>
					<option>Published</option>
					<option>Draft</option>
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
				>
					<option>Category</option>
					<option>Cat</option>
					<option>General</option>
					<option>Inspiration</option>
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
				{blogData.map((article, index) => (
					<div
						key={article.id}
						className={`grid grid-cols-[1fr_140px_120px_80px] items-center px-6 py-4 text-sm ${
							index % 2 === 1 ? "bg-(--color-brown-200)" : ""
						}`}
					>
						<div className="truncate">{article.title}</div>
						<div>{article.category}</div>
						<div className="flex items-center gap-2 text-green-600">
							<span className="h-2 w-2 rounded-full bg-green-500" />
							{article.status || "published"}
						</div>

						<div className="flex items-center gap-3 text-(--color-brown-500)">
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
