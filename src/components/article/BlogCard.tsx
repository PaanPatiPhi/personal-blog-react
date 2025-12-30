// BlogCard.tsx
interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  date: string;
}

function BlogCard({ 
  image, 
  category, 
  title, 
  description, 
  authorName, 
  authorImage, 
  date 
}: BlogCardProps) {
  return (
    <div className="flex flex-col gap-4 group cursor-pointer">
      {/* ส่วนรูปภาพ - ใช้ aspect-video เพื่อให้ขนาดเท่ากันทุก Card */}
      <div className="overflow-hidden rounded-2xl aspect-[16/10]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover "
        />
      </div>

      {/* ส่วนเนื้อหา */}
      <div className="flex flex-col gap-3">
        {/* หมวดหมู่ (Badge) */}
        <span className="w-fit px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-md">
          {category}
        </span>

        {/* หัวข้อ */}
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug text-left">
          {title}
        </h2>

        {/* คำอธิบายย่อ */}
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed text-left">
          {description}
        </p>

        {/* ข้อมูลผู้เขียน */}
        <div className="flex items-center gap-3 mt-1">
          <img 
            src={authorImage} 
            alt={authorName} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">{authorName}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;