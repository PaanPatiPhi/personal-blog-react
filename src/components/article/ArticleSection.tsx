// ArticleList.tsx
import BlogCard from "./BlogCard";
import Cat1Image from "../../assets/image/Cat1.png"
import ThompsonImage from "../../assets/image/ThomsanP.png"

const blogData = [
  {
    image: Cat1Image,
    category: "Cat",
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts The Way They Do",
    description: "Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase...",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },
  // เพิ่มข้อมูลตัวอื่นๆ...
];

function ArticleSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
      {blogData.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
  );
}
export default ArticleSection