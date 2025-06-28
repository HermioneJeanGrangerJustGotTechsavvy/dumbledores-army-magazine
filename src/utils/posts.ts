
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  image?: string;
}

// Mock data for now - in a real app this would fetch from an API or CMS
const mockPosts: Post[] = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    date: "2024-01-15",
    excerpt: "A beginner's guide to understanding React fundamentals and building your first component.",
    tags: ["React", "JavaScript", "Frontend"],
    author: "Hermione Granger",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices",
    date: "2024-01-10",
    excerpt: "Learn the essential TypeScript patterns and practices for building maintainable applications.",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    author: "Luna Lovegood",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176"
  },
  {
    slug: "css-grid-vs-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Each",
    date: "2024-01-05",
    excerpt: "Understanding the differences between CSS Grid and Flexbox and when to use each layout system.",
    tags: ["CSS", "Layout", "Frontend"],
    author: "Neville Longbottom",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  }
];

export const getAllPosts = async (): Promise<Post[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts;
};
