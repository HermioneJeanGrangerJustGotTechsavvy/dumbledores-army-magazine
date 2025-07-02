import { useState, useEffect } from "react";
import { getPosts } from "@/services/contentful";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

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

const Art = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artPosts, setArtPosts] = useState<BlogPost[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  useEffect(() => {
    const loadArtPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
        const artOnly = data.filter(post => post.category === "Brushes and Broomsticks");
        const artWithDetails = artOnly.map(post => {
          const postDate = new Date(post.publishedDate);
          return {
            id: String(post.id),
            title: post.title,
            content: post.content,
            date: post.publishedDate,
            author: post.author,
            image: post.imageUrl || "",
            category: post.category || "Brushes and Broomsticks",
            month: postDate.toLocaleString('default', { month: 'long' }),
            year: postDate.getFullYear().toString()
          };
        });
        setArtPosts(artWithDetails);
      } catch (error) {
        console.error("Failed to load art posts:", error);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    
    loadArtPosts();
  }, []);

  const filteredPosts = artPosts.filter(post => {
    if (selectedMonth !== "all" && post.month !== selectedMonth) return false;
    if (selectedArtist !== "all" && post.author !== selectedArtist) return false;
    if (selectedYear !== "all" && post.year !== selectedYear) return false;
    return true;
  });

  useEffect(() => {
    if (loaded) {
      console.log("Filtered Art Posts for display:", filteredPosts);
    }
  }, [filteredPosts, loaded]);

  const months = Array.from(new Set(artPosts.map(post => post.month).filter(Boolean)));
  const artists = Array.from(new Set(artPosts.map(post => post.author)));
  const years = Array.from(new Set(artPosts.map(post => post.year).filter(Boolean))).sort((a, b) => parseInt(b!) - parseInt(a!));

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-8 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Art Gallery</h1>
        <p className="text-white max-w-3xl mx-auto mb-8">
          Brushes and Broomsticks - A collection of magical artwork from talented artists in our wizarding community.
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

        <Select value={selectedArtist} onValueChange={setSelectedArtist}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Artists" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            {artists.map(artist => (
              <SelectItem key={artist} value={artist}>{artist}</SelectItem>
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
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`break-inside-avoid bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105 hover:shadow-xl`}
            >
              <div className="overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-auto object-contain bg-white transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 text-white">{post.title}</h3>
                <p className="text-white/70 text-sm">{post.date} • by {post.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-4">No artwork matches your filters</h3>
          <p className="text-white/80">Try adjusting your filter selection to see more content!</p>
        </div>
      )}
    </div>
  );
};

export default Art;
