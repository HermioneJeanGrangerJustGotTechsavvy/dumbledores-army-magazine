
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { CustomButton } from "@/components/ui/custom-button";

// Import the Class type from Classes.tsx
// We'll use this same type definition
type Class = {
  id: string;
  title: string;
  description: string;
  professor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  house?: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  content: {
    introduction: string;
    lessons: {
      title: string;
      content: string;
      exercise?: string;
    }[];
    conclusion: string;
  };
};

// This function fetches a single class from the Classes.tsx file
// In a real application, this would be an API call
const fetchClass = async (id: string): Promise<Class | undefined> => {
  // In a real app, this would be an API call
  // For now, we'll import the data from the Classes.tsx file
  const { default: classesModule } = await import("./Classes");
  const classes: Class[] = classesModule.classes;
  return classes.find((c) => c.id === id);
};

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClass = async () => {
      if (!id) {
        toast.error("No class ID provided");
        navigate("/classes");
        return;
      }

      try {
        const data = await fetchClass(id);
        if (data) {
          setClassData(data);
        } else {
          toast.error("Class not found");
          navigate("/classes");
        }
      } catch (error) {
        console.error("Error loading class:", error);
        toast.error("Failed to load class");
      } finally {
        setLoading(false);
      }
    };

    loadClass();
  }, [id, navigate]);

  // Get house colors for styling based on class house
  const getHouseColors = () => {
    if (!classData?.house) return { bg: "from-primary/30 to-secondary/30", text: "text-white" };
    
    switch (classData.house) {
      case "gryffindor":
        return { bg: "from-gryffindor-primary/30 to-gryffindor-secondary/30", text: "text-gryffindor-secondary" };
      case "slytherin":
        return { bg: "from-slytherin-primary/30 to-slytherin-secondary/30", text: "text-slytherin-light" };
      case "ravenclaw":
        return { bg: "from-ravenclaw-primary/30 to-ravenclaw-secondary/30", text: "text-ravenclaw-secondary" };
      case "hufflepuff":
        return { bg: "from-hufflepuff-primary/30 to-hufflepuff-secondary/30", text: "text-hufflepuff-primary" };
    }
  };

  // Handle the level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "";
    }
  };

  const houseColors = getHouseColors();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-xl">Loading class...</div>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold text-white mb-4">Class Not Found</h2>
          <CustomButton onClick={() => navigate("/classes")}>
            Return to Classes
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-6">
        <CustomButton 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/classes")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Classes
        </CustomButton>
      </div>

      {/* Class header section */}
      <div className={`bg-gradient-to-r ${houseColors.bg} p-8 rounded-t-xl`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${houseColors.text}`}>{classData.title}</h1>
            <p className="text-white text-lg mt-2">{classData.description}</p>
          </div>
          <span className={`px-3 py-1.5 rounded text-sm font-medium ${getLevelColor(classData.level)}`}>
            {classData.level}
          </span>
        </div>
        
        <div className="mt-4 text-white">
          <span className="font-semibold">Professor:</span> {classData.professor}
        </div>

        <div className="mt-4">
          <span className="text-white font-semibold">Topics:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {classData.topics.map((topic, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-white/10 text-white rounded-full text-xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Class content section */}
      <div className="bg-midnight-dark/80 border border-white/10 rounded-b-xl p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-white">{classData.content.introduction}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Lessons</h2>
          <div className="space-y-8">
            {classData.content.lessons.map((lesson, index) => (
              <div key={index} className="bg-midnight-medium/60 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {index + 1}. {lesson.title}
                </h3>
                <p className="text-white mb-4">{lesson.content}</p>
                {lesson.exercise && (
                  <div className="bg-amber-100/90 text-black rounded-lg p-4 mt-4">
                    <h4 className="font-medium text-black mb-2">Exercise</h4>
                    <p className="text-black">{lesson.exercise}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Conclusion</h2>
          <p className="text-white">{classData.content.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
