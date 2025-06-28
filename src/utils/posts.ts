
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  content: string;
  category: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Eye Contact",
    excerpt: "A poetic exploration romanticizing eye contact depicting connection, vulnerability and identity.",
    author: "Jiya Doshi",
    date: "April 19, 2025",
    image: "/lovable-uploads/b2b6834c-0a1c-423a-b168-d07ad12f22af.png",
    content: "Eye Contact Poem by Jiya Doshi...",
    category: "The Tortured Poets Department"
  },
  // Add more posts here as needed
];
