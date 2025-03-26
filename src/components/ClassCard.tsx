
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

type ClassCardProps = {
  title: string;
  description: string;
  professor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  house?: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  onClick: () => void;
};

const ClassCard = ({ 
  title, 
  description, 
  professor, 
  level, 
  topics, 
  house,
  onClick 
}: ClassCardProps) => {
  const [hovered, setHovered] = useState(false);
  
  const getLevelColor = () => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
    }
  };
  
  // Get background gradient based on house
  const houseColors = house ? {
    gryffindor: "from-gryffindor-primary/30 to-gryffindor-secondary/30",
    slytherin: "from-slytherin-primary/30 to-slytherin-secondary/30",
    ravenclaw: "from-ravenclaw-primary/30 to-ravenclaw-secondary/30",
    hufflepuff: "from-hufflepuff-primary/30 to-hufflepuff-secondary/30",
  } : null;
  
  // Get title color based on house
  const getTitleColor = () => {
    if (!house) return "text-white";
    
    switch (house) {
      case "gryffindor": return "text-gryffindor-secondary";
      case "slytherin": return "text-slytherin-light";
      case "ravenclaw": return "text-ravenclaw-secondary";
      case "hufflepuff": return "text-hufflepuff-primary";
    }
  };

  // Get topic tag colors based on house
  const getTopicColors = () => {
    if (!house) return "bg-muted/30 text-white";
    
    switch (house) {
      case "gryffindor": return "bg-gryffindor-primary/20 text-gryffindor-secondary";
      case "slytherin": return "bg-slytherin-primary/20 text-slytherin-light";
      case "ravenclaw": return "bg-ravenclaw-primary/20 text-ravenclaw-secondary";
      case "hufflepuff": return "bg-hufflepuff-primary/20 text-hufflepuff-primary";
    }
  };
  
  return (
    <div 
      className={`bg-midnight-dark/80 border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${hovered ? "transform -translate-y-1" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`h-2 ${house ? `bg-gradient-to-r ${houseColors?.[house]}` : "bg-gradient-to-r from-primary/80 to-secondary/80"}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-semibold ${getTitleColor()}`}>{title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor()}`}>
            {level}
          </span>
        </div>
        
        <p className="text-white/90 mb-4">{description}</p>
        
        <div className="text-sm mb-4">
          <span className="font-medium text-white">Professor:</span>{" "}
          <span className="text-white/90">{professor}</span>
        </div>
        
        <div className="mb-6">
          <p className="text-sm font-medium text-white mb-2">Topics covered:</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded-full text-xs ${getTopicColors()}`}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <CustomButton 
          variant={house || "default"} 
          size="sm" 
          className="w-full"
          onClick={onClick}
        >
          Enter Class <ArrowRight className="ml-2 h-4 w-4" />
        </CustomButton>
      </div>
    </div>
  );
};

export default ClassCard;
