export interface Post {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorImage?: string;
  date: string;
  likes?: number;
  content?: string;
}