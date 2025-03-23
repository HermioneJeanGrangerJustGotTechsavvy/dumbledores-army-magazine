
import { useState, useEffect } from "react";
import HouseQuiz from "@/components/HouseQuiz";

const HouseSorting = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Sorting Hat Quiz</h1>
        <p className="text-foreground/70 max-w-3xl mx-auto">
          Answer honestly to discover which of the four Hogwarts houses you truly belong to. 
          Will it be brave Gryffindor, cunning Slytherin, wise Ravenclaw, or loyal Hufflepuff?
        </p>
      </div>
      
      <div className={`transition-all duration-700 delay-150 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <HouseQuiz />
      </div>
    </div>
  );
};

export default HouseSorting;
