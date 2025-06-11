
import { useState, useEffect } from "react";
import { getBlogPosts } from "@/services/contentful";
import { BlogPost } from "./Writing";

const Art = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artPosts, setArtPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    const loadArtPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        // Filter only "Brushes and Broomsticks" category posts
        const artOnly = data.filter(post => post.category === "Brushes and Broomsticks");
        setArtPosts(artOnly);
      } catch (error) {
        console.error("Failed to load art posts:", error);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    
    loadArtPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Art Gallery</h1>
        <p className="text-white max-w-3xl mx-auto">
          Brushes and Broomsticks - A collection of magical artwork from talented artists in our wizarding community.
        </p>
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
      ) : artPosts.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {artPosts.map((post, index) => (
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
          <h3 className="text-xl text-white mb-4">No artwork available yet</h3>
          <p className="text-white/80">Check back soon for amazing magical artwork!</p>
        </div>
      )}
    </div>
  );
};

export default Art;
