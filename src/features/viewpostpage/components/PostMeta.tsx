type PostMetaProps = {
  category: string;
  date: string;
  title: string;
  description: string;
};

export default function PostMeta({
  category,
  date,
  title,
  description,
}: PostMetaProps) {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <div>
      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-md mr-4">
        {category}
      </span>
      <span className="text-sm text-gray-500">{formattedDate}</span>

      <h1 className="text-[28px] font-semibold mt-4">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
