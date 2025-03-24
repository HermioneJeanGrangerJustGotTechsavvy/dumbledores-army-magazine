
import { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";

type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  }[];
};

type House = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

const questions: Question[] = [
  {
    id: 1,
    text: "What quality do you value most in yourself?",
    options: [
      { id: "1a", text: "Courage", house: "gryffindor" },
      { id: "1b", text: "Ambition", house: "slytherin" },
      { id: "1c", text: "Intelligence", house: "ravenclaw" },
      { id: "1d", text: "Loyalty", house: "hufflepuff" },
    ],
  },
  {
    id: 2,
    text: "When faced with a difficult challenge, you usually:",
    options: [
      { id: "2a", text: "Charge in head-first", house: "gryffindor" },
      { id: "2b", text: "Find the solution that benefits you most", house: "slytherin" },
      { id: "2c", text: "Research and analyze all possibilities", house: "ravenclaw" },
      { id: "2d", text: "Seek help from friends and work together", house: "hufflepuff" },
    ],
  },
  {
    id: 3,
    text: "What magical subject interests you most?",
    options: [
      { id: "3a", text: "Defense Against the Dark Arts", house: "gryffindor" },
      { id: "3b", text: "Potions", house: "slytherin" },
      { id: "3c", text: "Astronomy", house: "ravenclaw" },
      { id: "3d", text: "Herbology", house: "hufflepuff" },
    ],
  },
  {
    id: 4,
    text: "What would you most like to be known for?",
    options: [
      { id: "4a", text: "Bravery", house: "gryffindor" },
      { id: "4b", text: "Power", house: "slytherin" },
      { id: "4c", text: "Wisdom", house: "ravenclaw" },
      { id: "4d", text: "Kindness", house: "hufflepuff" },
    ],
  },
  {
    id: 5,
    text: "Which path in the forbidden forest would you take?",
    options: [
      { id: "5a", text: "The one with sounds of creatures ahead", house: "gryffindor" },
      { id: "5b", text: "The one that seems to lead to treasure", house: "slytherin" },
      { id: "5c", text: "The one with mysterious symbols carved in trees", house: "ravenclaw" },
      { id: "5d", text: "The one where you see fellow students need help", house: "hufflepuff" },
    ],
  },
];

const houseInfo = {
  gryffindor: {
    name: "Gryffindor",
    description: "Home to the brave and daring. Gryffindors are known for their nerve, courage, and chivalry.",
    motto: "Where dwell the brave at heart",
    traits: ["Brave", "Daring", "Chivalrous", "Courageous"],
    colors: "Scarlet and Gold",
    emblem: "Lion",
    founder: "Godric Gryffindor",
    element: "Fire",
  },
  slytherin: {
    name: "Slytherin",
    description: "Home to the cunning and ambitious. Slytherins are known for their resourcefulness and determination.",
    motto: "Those cunning folk use any means to achieve their ends",
    traits: ["Ambitious", "Cunning", "Resourceful", "Determined"],
    colors: "Green and Silver",
    emblem: "Serpent",
    founder: "Salazar Slytherin",
    element: "Water",
  },
  ravenclaw: {
    name: "Ravenclaw",
    description: "Home to the wise and witty. Ravenclaws are known for their intelligence, creativity, and wisdom.",
    motto: "Wit beyond measure is man's greatest treasure",
    traits: ["Intelligent", "Creative", "Wise", "Individual"],
    colors: "Blue and Bronze",
    emblem: "Eagle",
    founder: "Rowena Ravenclaw",
    element: "Air",
  },
  hufflepuff: {
    name: "Hufflepuff",
    description: "Home to the loyal and fair. Hufflepuffs are known for their dedication, patience, and tolerance.",
    motto: "Those patient Hufflepuffs are true and unafraid of toil",
    traits: ["Loyal", "Patient", "Fair", "Hardworking"],
    colors: "Yellow and Black",
    emblem: "Badger",
    founder: "Helga Hufflepuff",
    element: "Earth",
  },
};

const HouseQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, House>>({});
  const [result, setResult] = useState<House | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  const handleAnswer = (questionId: number, house: House) => {
    setAnswers((prev) => ({ ...prev, [questionId]: house }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const houseCounts = {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0,
    };

    Object.values(answers).forEach((house) => {
      houseCounts[house] += 1;
    });

    const sortedHouses = Object.entries(houseCounts).sort((a, b) => b[1] - a[1]);
    const winningHouse = sortedHouses[0][0] as House;

    setResult(winningHouse);
    setQuizComplete(true);
    setTimeout(() => {
      setAnimateResult(true);
      toast.success(`The Sorting Hat has decided!`, {
        description: `Welcome to ${houseInfo[winningHouse].name}!`,
      });
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setQuizComplete(false);
    setAnimateResult(false);
  };

  if (quizComplete && result) {
    const houseData = houseInfo[result];
    const bgColorClass = `bg-${result}-primary`;
    const textColorClass = result === "hufflepuff" ? "text-black" : "text-white";

    return (
      <div className="bg-muted rounded-xl p-8 max-w-3xl mx-auto relative overflow-hidden">
        <div className={`absolute inset-0 ${bgColorClass} opacity-20`}></div>
        
        <div className="relative z-10">
          <div className={`text-center transition-all duration-1000 transform ${animateResult ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center border-4 border-hogwarts-gold animate-float" style={{ backgroundColor: result === "gryffindor" ? "#740001" : result === "slytherin" ? "#1A472A" : result === "ravenclaw" ? "#0E1A40" : "#ECB939" }}>
              <h2 className="font-magical text-3xl text-white uppercase">{houseData.name.charAt(0)}</h2>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 font-magical">{houseData.name}</h2>
            
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8 border border-hogwarts-gold/30">
              <p className="italic mb-4 text-black">"{houseData.motto}"</p>
              <p className="mb-6 text-black">{houseData.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-black">
                <div>
                  <h4 className="font-semibold">House Colors</h4>
                  <p>{houseData.colors}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Emblem</h4>
                  <p>{houseData.emblem}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Founder</h4>
                  <p>{houseData.founder}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Element</h4>
                  <p>{houseData.element}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">House Traits</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {houseData.traits.map((trait, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm bg-${result}-primary/20 text-${result}-primary font-medium`}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <CustomButton variant={result} onClick={restartQuiz}>
              Retake Quiz
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-muted rounded-xl p-8 max-w-3xl mx-auto animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gryffindor-primary/20 to-gryffindor-primary/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slytherin-primary/20 to-slytherin-primary/5 rounded-tr-full"></div>
      
      <div className="relative z-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-black">Question {currentQuestion + 1} of {questions.length}</p>
            <div className="flex items-center gap-1">
              {questions.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === currentQuestion ? 'bg-primary' : index < currentQuestion ? 'bg-primary/50' : 'bg-foreground/20'}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="h-1 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black">{question.text}</h2>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(question.id, option.house)}
              className="w-full text-left p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-background transition-all duration-200 group"
            >
              <span className="flex items-center">
                <span className="w-5 h-5 rounded-full border-2 border-foreground/30 group-hover:border-primary flex-shrink-0 mr-3 transition-colors"></span>
                <span className="text-black">{option.text}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseQuiz;
