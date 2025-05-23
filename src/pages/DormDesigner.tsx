
import { useState, useEffect } from "react";
import DormCustomizer from "@/components/DormCustomizer";

const DormDesigner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className={`text-center mb-8 md:mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">Design Your Hogwarts Dormitory</h1>
        <p className="text-white/80 max-w-3xl mx-auto">
          Customize your magical living space with enchanted furniture and decorations. 
          Create the perfect dormitory that reflects your house pride and personal style.
          <span className="block text-sm mt-2 text-white/60">
            Pro tip: Click on an item, then click in the dormitory to add it. You can drag and rearrange objects to design your perfect magical room!
          </span>
        </p>
      </div>
      
      <div className={`transition-all duration-700 delay-150 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <DormCustomizer />
      </div>
    </div>
  );
};

export default DormDesigner;
