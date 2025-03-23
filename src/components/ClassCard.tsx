
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
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-blue-100 text-blue-700";
      case "Advanced": return "bg-purple-100 text-purple-700";
    }
  };
  
  const houseColors = house ? {
    gryffindor: "from-gryffindor-primary/20 to-gryffindor-secondary/20",
    slytherin: "from-slytherin-primary/20 to-slytherin-secondary/20",
    ravenclaw: "from-ravenclaw-primary/20 to-ravenclaw-secondary/20",
    hufflepuff: "from-hufflepuff-primary/20 to-hufflepuff-secondary/20",
  } : null;
  
  return (
    <div 
      className={`bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${hovered ? "transform -translate-y-1" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`h-2 ${house ? `bg-gradient-to-r ${houseColors?.[house]}` : "bg-gradient-to-r from-primary/80 to-secondary/80"}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor()}`}>
            {level}
          </span>
        </div>
        
        <p className="text-foreground/70 mb-4">{description}</p>
        
        <div className="text-sm mb-4">
          <span className="font-medium">Professor:</span> {professor}
        </div>
        
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Topics covered:</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded-full text-xs bg-muted ${house ? `text-${house}-primary` : "text-primary"}`}
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
