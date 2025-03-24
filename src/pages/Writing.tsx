
import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";

// Sample blog posts data - in a real implementation, this would come from a CMS or database
const samplePosts = [
  {
    id: 1,
    title: "The Art of Magical Storytelling",
    excerpt: "Discover how to weave enchanting tales with these writing techniques from Hogwarts professors.",
    author: "Minerva McGonagall",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1456513080867-f24f120351fc"
  },
  {
    id: 2,
    title: "Character Development in Wizarding Fiction",
    excerpt: "Learn how to create memorable magical characters that leap off the page and into readers' hearts.",
    author: "Filius Flitwick",
    date: "June 20, 2023",
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1"
  },
  {
    id: 3,
    title: "World-Building Beyond Hogwarts",
    excerpt: "Expand your magical universes with these creative world-building techniques for aspiring writers.",
    author: "Pomona Sprout",
    date: "July 10, 2023",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98"
  }
];

const Writing = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Writing</h1>
        <p className="text-white max-w-3xl mx-auto">
          A collection of articles, tips, and stories about magical writing from the wizarding world.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {samplePosts.map((post, index) => (
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
              <CustomButton variant="link" className="text-primary p-0">
                Read More
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
      
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
