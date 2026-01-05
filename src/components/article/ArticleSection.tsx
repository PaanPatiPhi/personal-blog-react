// ArticleList.tsx
import BlogCard from "./BlogCard";
import Cat1Image from "../../assets/image/articles/Cat1.png"
import Cat2Image from "../../assets/image/articles/Cat2.png"
import Cat3Image from "../../assets/image/articles/Cat3.png"
import Cat4Image from "../../assets/image/articles/Cat4.png"
import Cat5Image from "../../assets/image/articles/Cat5.png"
import Cat6Image from "../../assets/image/articles/Cat6.png"
import ThompsonImage from "../../assets/image/authors/ThomsanP.png"

const blogData = [
  {
    image: Cat1Image,
    category: "Cat",
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts The Way They Do",
    description: "Dive into the curious world of cat behavior, eDive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines.xploring why cats knead, purr, and chase...",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },
    {
    image: Cat2Image,
    category: "Cat",
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    description: "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let’s dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating.",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },  {
    image: Cat3Image,
    category: "Cat",
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    description: "This article explores strategies to maintain motivation when faced with personal or professional challenges. From setting small goals to practicing mindfulness and surrounding yourself with positive influences, it provides actionable tips to reignite your passion and keep moving forward.",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },  {
    image: Cat4Image,
    category: "Cat",
    title: "The Science of the Cat’s Purr: How It Benefits Cats and Humans Alike",
    description: "Discover the fascinating science behind the cat's purr, including its potential healing properties for both cats and humans. Learn how this unique sound is produced and the emotional and physical benefits it brings to both species.",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },  {
    image: Cat5Image,
    category: "Cat",
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    description: "Discover practical ways to nurture creativity in your everyday life. Whether it's through journaling, taking breaks, or exploring new hobbies, this article offers simple yet effective habits to help you tap into inspiration and stay creatively charged.",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },  {
    image: Cat6Image,
    category: "Cat",
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    description: "This guide offers essential tips on keeping your cat in peak health. Covering topics like proper nutrition, regular vet visits, grooming, and mental stimulation, it’s a must-read for cat owners who want to ensure their pets live long, happy lives.",
    authorName: "Thompson P.",
    authorImage: ThompsonImage,
    date: "11 September 2024"
  },
  // เพิ่มข้อมูลตัวอื่นๆ...
];

type ArticleSectionProps = {
  category: string;
};

function ArticleSection({ category }: ArticleSectionProps) {
  const filteredBlogs = blogData.filter((blog) => {
    if (category === "Highlight") return true;
    return blog.category === category;
  });

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1200px] mx-auto py-10 px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No articles found in this category.
          </div>
        )}
      </div>
    </article>
  );
}

export default ArticleSection;
