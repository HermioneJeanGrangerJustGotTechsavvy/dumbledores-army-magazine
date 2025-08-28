
import { useState, useEffect } from "react";
import { getBlogPosts } from "@/services/contentful";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen } from "lucide-react";
import WritingModal from "@/components/WritingModal";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  month?: string;
  year?: string;
}

// Local poems for Tortured Poets Department
const localPoems: BlogPost[] = [
  {
    id: "poem-misunderstood",
    title: "Misunderstood",
    content: `I'm tired....
Of being misunderstood 
Of being taken for granted 
Of being disrespected by words and actions 
I'm tired of being tired`,
    date: "August 11, 2025",
    author: "Jenny Mylva",
    image: "/lovable-uploads/6445d996-4240-4ffe-bb9f-3b107d743d17.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-loving",
    title: "Loving",
    content: `what is more harmful 
than loving too loud 
is being incapable of loving at all
being quiet about love 
will only make your heart bleed`,
    date: "August 11, 2025",
    author: "Jenny Mylva", 
    image: "/lovable-uploads/c3742878-f7b1-456a-8253-25e664faa373.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-heartache",
    title: "Heartache",
    content: `what aches the heart
grows the heart`,
    date: "August 11, 2025",
    author: "Jenny Mylva",
    image: "/lovable-uploads/4ca7e58d-1fa6-4b28-957b-f37be34f5954.png", 
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-attachment",
    title: "Attachment", 
    content: `if it hurts the heart 
more than it pleasures 
it is not love,
it is attachment`,
    date: "August 11, 2025",
    author: "Jenny Mylva",
    image: "/lovable-uploads/2f2ee732-49e6-4f2a-9312-b9e76a413ef1.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-beating",
    title: "Beating",
    content: `Her heart continues to beat
even after taking a brutal beating`,
    date: "August 11, 2025", 
    author: "Jenny Mylva",
    image: "/lovable-uploads/c933ab0f-1718-4ba9-9ac1-aac5f992ca4b.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  }
];

const Writing = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [writingPosts, setWritingPosts] = useState<BlogPost[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const loadWritingPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        const allowedCategories = ["The Tortured Poets Department", "Amortentia", "Tales of Beedle the Bard"];
        const writingOnly = data.filter(post => allowedCategories.includes(post.category));
        const writingWithDetails = writingOnly.map(post => {
          const postDate = new Date(post.date);
          return {
            ...post,
            id: String(post.id),
            category: post.category,
            month: postDate.toLocaleString('default', { month: 'long' }),
            year: postDate.getFullYear().toString()
          };
        });
        // Combine Contentful posts with local poems
        const allPosts = [...writingWithDetails, ...localPoems];
        setWritingPosts(allPosts);
      } catch (error) {
        console.error("Failed to load writing posts:", error);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    
    loadWritingPosts();
  }, []);

  const filteredPosts = writingPosts.filter(post => {
    if (selectedMonth !== "all" && post.month !== selectedMonth) return false;
    if (selectedAuthor !== "all" && post.author !== selectedAuthor) return false;
    if (selectedYear !== "all" && post.year !== selectedYear) return false;
    if (selectedCategory !== "all" && post.category !== selectedCategory) return false;
    return true;
  });

  useEffect(() => {
    if (loaded) {
      console.log("Filtered Writing Posts for display:", filteredPosts);
    }
  }, [filteredPosts, loaded]);

  const months = Array.from(new Set(writingPosts.map(post => post.month).filter(Boolean)));
  const authors = Array.from(new Set(writingPosts.map(post => post.author)));
  const years = Array.from(new Set(writingPosts.map(post => post.year).filter(Boolean))).sort((a, b) => parseInt(b!) - parseInt(a!));

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-8 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Writing Gallery</h1>
        <p className="text-white max-w-3xl mx-auto mb-8">
          Typewriter's Creed - A collection of powerful writings from talented authors in our community.
        </p>
      </div>

      <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {months.map(month => (
              <SelectItem key={month} value={month!}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors.map(author => (
              <SelectItem key={author} value={author}>{author}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <SelectValue placeholder="All Years" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year!}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[250px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-midnight-dark border-white/20">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="The Tortured Poets Department">The Tortured Poets Department</SelectItem>
            <SelectItem value="Amortentia">Amortentia</SelectItem>
            <SelectItem value="Tales of Beedle the Bard">Tales of Beedle the Bard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gray-800 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105 hover:shadow-xl`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onLoad={() => console.log(`Image loaded successfully: ${post.image}`)}
                  onError={(e) => {
                    console.error(`Failed to load image: ${post.image}`, e);
                    console.log('Image element:', e.currentTarget);
                  }}
                />
              </div>
              
               <div className="p-4">
                 <h3 className="text-lg font-bold mb-2 text-white">{post.title}</h3>
                 <p className="text-white/70 text-sm mb-2">{post.date} • by {post.author}</p>
                 <p className="text-white/80 text-sm line-clamp-3 mb-3">{post.content}</p>
                 <Button 
                   onClick={() => handleReadMore(post)}
                   variant="outline"
                   size="sm"
                   className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                 >
                   <BookOpen className="h-4 w-4 mr-2" />
                   Read More
                 </Button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-4">No writing matches your filters</h3>
          <p className="text-white/80">Try adjusting your filter selection to see more content!</p>
        </div>
      )}
      
      <WritingModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Writing;
