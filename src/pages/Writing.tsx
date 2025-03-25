import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getBlogPosts } from "@/services/contentful";

// This type definition will be useful when integrating with a CMS
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

// Sample blog posts data - this will be replaced with data from the CMS
const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Magical Storytelling",
    excerpt: "Discover how to weave enchanting tales with these writing techniques from Hogwarts professors.",
    author: "Minerva McGonagall",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1456513080867-f24f120351fc",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    title: "Character Development in Wizarding Fiction",
    excerpt: "Learn how to create memorable magical characters that leap off the page and into readers' hearts.",
    author: "Filius Flitwick",
    date: "June 20, 2023",
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    title: "World-Building Beyond Hogwarts",
    excerpt: "Expand your magical universes with these creative world-building techniques for aspiring writers.",
    author: "Pomona Sprout",
    date: "July 10, 2023",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

// This is where we would fetch content from a CMS
// In a real implementation, this function would connect to your CMS API
const fetchPostsFromCMS = async (): Promise<BlogPost[]> => {
  // In a real implementation, we would fetch from a CMS API here
  // For example:
  // const response = await fetch('https://your-cms-api.com/posts');
  // return await response.json();
  
  // For now, just return sample data with a delay to simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => resolve(samplePosts), 1000);
  });
};

const Writing = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    
    loadPosts();
  }, [toast]);

  // This function would be called when clicking on a post to view the full content
  const handleReadMore = (postId: number) => {
    // In a real implementation, this would navigate to a full post page
    // or open a modal with the full content
    const post = posts.find(p => p.id === postId);
    
    toast({
      title: post?.title || "Blog Post",
      description: "In a real implementation, this would open the full post from your CMS.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Writing</h1>
        <p className="text-white max-w-3xl mx-auto">
          A collection of articles, tips, and stories about magical writing from the wizarding world.
        </p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-midnight-dark/70 backdrop-blur-sm border border-white/10 shadow-lg">
              <div className="h-48 bg-gray-800 animate-pulse"></div>
              <CardHeader>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-1/3"></div>
                <div className="h-6 bg-gray-700 rounded animate-pulse w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-full"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-4/6"></div>
              </CardContent>
              <CardFooter>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={post.id}
              className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-primary text-sm mb-2">{post.date} • by {post.author}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                <p className="text-white/80 mb-4">{post.excerpt}</p>
                <CustomButton 
                  variant="link" 
                  className="text-primary p-0"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className={`mt-16 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center transition-all duration-700 delay-450 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-2xl font-bold mb-3 text-white">Submit Your Writing</h2>
        <p className="text-white mb-4">
          Are you a passionate writer with stories from the wizarding world to share? We'd love to feature your work!
        </p>
        <CustomButton variant="default">
          Contact Us
        </CustomButton>
      </div>
    </div>
  );
};

export default Writing;
