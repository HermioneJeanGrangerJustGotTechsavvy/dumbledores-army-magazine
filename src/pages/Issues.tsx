
import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Download } from "lucide-react";
import { toast } from "sonner";

// Sample issues data - in a real implementation, this would come from a CMS or database
const sampleIssues = [
  {
    id: 1,
    title: "The Art of Magical Writing",
    description: "Featuring exclusive interviews with renowned wizarding authors",
    coverImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    date: "Summer 2023",
    volume: "Vol. 42",
    issue: "Issue 7",
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Magical Creatures and Where to Write Them",
    description: "A deep dive into creating fantastical beings in your stories",
    coverImage: "https://images.unsplash.com/photo-1618944847828-82e943c3bdb7",
    date: "Spring 2023",
    volume: "Vol. 42",
    issue: "Issue 6",
    pdfUrl: "#"
  },
  {
    id: 3,
    title: "Potions for the Creative Mind",
    description: "Breaking writer's block and unleashing your magical creativity",
    coverImage: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b",
    date: "Winter 2022",
    volume: "Vol. 42",
    issue: "Issue 5",
    pdfUrl: "#"
  },
  {
    id: 4,
    title: "The Prophecy of New Voices",
    description: "Highlighting emerging talents in magical literature",
    coverImage: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc",
    date: "Fall 2022",
    volume: "Vol. 42",
    issue: "Issue 4",
    pdfUrl: "#"
  }
];

const Issues = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const showAdminInfo = () => {
    toast("Admin Information", {
      description: "To add new issues, you'll need to update the issues array in the Issues.tsx file or connect to a content management system like Contentful.",
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Magazine Issues</h1>
        <p className="text-white max-w-3xl mx-auto">
          Browse and download all past issues of Dumbledore's Army Magazine in PDF format.
        </p>
        
        <div className="mt-4">
          <CustomButton variant="outline" size="sm" onClick={showAdminInfo}>
            Admin Info
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sampleIssues.map((issue, index) => (
          <div 
            key={issue.id}
            className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              <img 
                src={issue.coverImage} 
                alt={issue.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <div className="text-white/80 text-sm">{issue.volume} • {issue.issue}</div>
                <div className="text-primary text-sm font-medium">{issue.date}</div>
                <h3 className="text-lg font-bold text-white mt-1">{issue.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-white/80 text-sm mb-4">{issue.description}</p>
              <CustomButton variant="default" className="w-full" asChild>
                <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`mt-16 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center transition-all duration-700 delay-450 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-2xl font-bold mb-3 text-white">Subscribe to Dumbledore's Army Magazine</h2>
        <p className="text-white mb-4">
          Get early access to new issues and exclusive content delivered straight to your inbox.
        </p>
        <CustomButton variant="default">
          Subscribe Now
        </CustomButton>
      </div>
    </div>
  );
};

export default Issues;
