
import { useState, useEffect } from "react";
import DormCustomizer from "@/components/DormCustomizer";

const DormDesigner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Design Your Hogwarts Dormitory</h1>
        <p className="text-white/80 max-w-3xl mx-auto">
          Customize your magical living space with enchanted furniture and decorations. 
          Create the perfect dormitory that reflects your house pride and personal style.
        </p>
      </div>
      
      <div className={`transition-all duration-700 delay-150 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <DormCustomizer />
      </div>
    </div>
  );
};

export default DormDesigner;
