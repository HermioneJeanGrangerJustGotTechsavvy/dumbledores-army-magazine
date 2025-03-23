
import { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";

type DormItem = {
  id: string;
  name: string;
  description: string;
  category: "furniture" | "decoration" | "magical";
  houseStyles: {
    gryffindor: string;
    slytherin: string;
    ravenclaw: string;
    hufflepuff: string;
  };
};

type DormSection = {
  id: string;
  name: string;
  description: string;
  items: DormItem[];
};

type House = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

const dormSections: DormSection[] = [
  {
    id: "bed",
    name: "Bed",
    description: "Choose your four-poster bed style",
    items: [
      {
        id: "classic-four-poster",
        name: "Classic Four-Poster",
        description: "A traditional Hogwarts bed with rich wooden posts",
        category: "furniture",
        houseStyles: {
          gryffindor: "with scarlet and gold velvet curtains",
          slytherin: "with emerald and silver silk curtains",
          ravenclaw: "with blue and bronze satin curtains",
          hufflepuff: "with yellow and black cotton curtains",
        },
      },
      {
        id: "enchanted-canopy",
        name: "Enchanted Canopy",
        description: "A magical bed with a ceiling that reflects the night sky",
        category: "magical",
        houseStyles: {
          gryffindor: "with animated lion constellations",
          slytherin: "with serpent constellations that slither slowly",
          ravenclaw: "with eagle constellations that occasionally fly",
          hufflepuff: "with badger constellations that twinkle warmly",
        },
      },
      {
        id: "floating-dream",
        name: "Floating Dream",
        description: "A bed that hovers slightly above the ground",
        category: "magical",
        houseStyles: {
          gryffindor: "with a subtle glow of courage emanating below",
          slytherin: "with mystical green mist swirling underneath",
          ravenclaw: "with tiny twinkling stars floating beneath",
          hufflepuff: "with a gentle golden aura of warmth below",
        },
      },
    ],
  },
  {
    id: "desk",
    name: "Study Desk",
    description: "Select your studying space",
    items: [
      {
        id: "antiquarian",
        name: "Antiquarian Desk",
        description: "An old wooden desk with many drawers",
        category: "furniture",
        houseStyles: {
          gryffindor: "with bold brass handles and a subtle lion motif",
          slytherin: "with serpentine silver handles and green inlays",
          ravenclaw: "with bronze astronomical instruments built in",
          hufflepuff: "with warm honey-colored wood and rounded edges",
        },
      },
      {
        id: "self-organizing",
        name: "Self-Organizing Desk",
        description: "A desk that sorts your papers and quills automatically",
        category: "magical",
        houseStyles: {
          gryffindor: "that boldly arranges items by importance",
          slytherin: "that cleverly hides secret compartments",
          ravenclaw: "that sorts items by subject and relevance",
          hufflepuff: "that gently reminds you of homework deadlines",
        },
      },
      {
        id: "levitating-station",
        name: "Levitating Workstation",
        description: "A writing surface that can float to any spot in the room",
        category: "magical",
        houseStyles: {
          gryffindor: "that comes when called with a commanding voice",
          slytherin: "that responds to subtle gestures of your hand",
          ravenclaw: "that anticipates when you need to study",
          hufflepuff: "that ensures comfortable posture while working",
        },
      },
    ],
  },
  {
    id: "decor",
    name: "Wall Decor",
    description: "Decorate your walls",
    items: [
      {
        id: "house-banner",
        name: "House Banner",
        description: "A large fabric banner with your house emblem",
        category: "decoration",
        houseStyles: {
          gryffindor: "with an animated lion that occasionally roars",
          slytherin: "with an emerald serpent that slithers across the fabric",
          ravenclaw: "with a wise eagle whose feathers shimmer in the light",
          hufflepuff: "with a friendly badger that occasionally nods to you",
        },
      },
      {
        id: "magical-painting",
        name: "Magical Painting",
        description: "An enchanted painting that changes scenes",
        category: "magical",
        houseStyles: {
          gryffindor: "depicting famous duels and acts of bravery",
          slytherin: "showing powerful wizards achieving greatness",
          ravenclaw: "illustrating complex magical theories and discoveries",
          hufflepuff: "portraying serene magical gardens and creatures",
        },
      },
      {
        id: "constellation-map",
        name: "Constellation Map",
        description: "A magical map of the stars",
        category: "magical",
        houseStyles: {
          gryffindor: "that highlights constellations named after heroes",
          slytherin: "that reveals hidden celestial patterns to the worthy",
          ravenclaw: "that tracks actual star movements in real-time",
          hufflepuff: "that gently glows with a warm light at night",
        },
      },
    ],
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Illuminate your space",
    items: [
      {
        id: "floating-candles",
        name: "Floating Candles",
        description: "Candles that hover in the air",
        category: "magical",
        houseStyles: {
          gryffindor: "that burn with a bold, bright flame",
          slytherin: "with an eerie green glow that doesn't drip wax",
          ravenclaw: "that adjust their brightness based on your reading",
          hufflepuff: "that emit a warm, cozy glow and pleasant scent",
        },
      },
      {
        id: "moonlight-orb",
        name: "Moonlight Orb",
        description: "A sphere that captures and emits moonlight",
        category: "magical",
        houseStyles: {
          gryffindor: "that pulses with energy during exciting conversations",
          slytherin: "that dims appropriately for secret conversations",
          ravenclaw: "that changes color based on your thoughts",
          hufflepuff: "that brightens when friends enter the room",
        },
      },
      {
        id: "lantern-familiar",
        name: "Lantern Familiar",
        description: "A magical creature-shaped lantern",
        category: "magical",
        houseStyles: {
          gryffindor: "shaped like a tiny dragon that breathes light",
          slytherin: "in the form of a coiled serpent with glowing eyes",
          ravenclaw: "shaped as an owl that hoots the hour",
          hufflepuff: "resembling a badger that purrs softly",
        },
      },
    ],
  },
];

const DormCustomizer = () => {
  const [selectedHouse, setSelectedHouse] = useState<House>("gryffindor");
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleHouseSelect = (house: House) => {
    setSelectedHouse(house);
  };

  const handleItemSelect = (sectionId: string, itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [sectionId]: itemId
    }));
    
    if (currentSection < dormSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (Object.keys(selectedItems).length === dormSections.length - 1) {
      // This means we've now selected all items
      setComplete(true);
      toast.success("Your dormitory is complete!", {
        description: "Your magical living space is ready for the school year."
      });
    }
  };

  const getItemById = (sectionId: string, itemId: string): DormItem | undefined => {
    const section = dormSections.find(s => s.id === sectionId);
    return section?.items.find(item => item.id === itemId);
  };

  const resetDesign = () => {
    setSelectedItems({});
    setCurrentSection(0);
    setComplete(false);
  };

  const getHouseColor = (house: House) => {
    switch (house) {
      case "gryffindor": return "from-gryffindor-primary to-gryffindor-light";
      case "slytherin": return "from-slytherin-primary to-slytherin-light";
      case "ravenclaw": return "from-ravenclaw-primary to-ravenclaw-light";
      case "hufflepuff": return "from-hufflepuff-primary to-hufflepuff-light";
    }
  };

  const renderDormPreview = () => {
    const completedSections = Object.keys(selectedItems).length;
    const progressPercentage = Math.round((completedSections / dormSections.length) * 100);
    
    return (
      <div className="bg-muted rounded-xl p-6 h-full">
        <h3 className="text-xl font-semibold mb-4">Your {selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1)} Dormitory</h3>
        
        {!complete && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Design Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getHouseColor(selectedHouse)} transition-all duration-300 ease-out`} 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className={`mt-4 space-y-4 ${complete ? "" : "opacity-80"}`}>
          {Object.entries(selectedItems).map(([sectionId, itemId]) => {
            const section = dormSections.find(s => s.id === sectionId);
            const item = getItemById(sectionId, itemId);
            
            if (!section || !item) return null;
            
            return (
              <div key={sectionId} className="border-b border-border/50 pb-3 last:border-0">
                <h4 className="font-medium">{section.name}</h4>
                <p className="text-sm">{item.name} {item.houseStyles[selectedHouse]}</p>
              </div>
            );
          })}
        </div>
        
        {complete && (
          <div className="mt-6">
            <p className="text-sm mb-4">Your dormitory is complete! Feel free to show it off to your housemates.</p>
            <CustomButton variant={selectedHouse} size="sm" onClick={resetDesign}>
              Redesign
            </CustomButton>
          </div>
        )}
      </div>
    );
  };

  const renderCurrentSection = () => {
    const section = dormSections[currentSection];
    
    return (
      <div>
        <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
        <p className="text-foreground/70 mb-6">{section.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {section.items.map((item) => (
            <div 
              key={item.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer 
                ${selectedItems[section.id] === item.id 
                  ? `border-${selectedHouse}-primary bg-${selectedHouse}-primary/10` 
                  : 'border-border hover:border-foreground/30'}`}
              onClick={() => handleItemSelect(section.id, item.id)}
            >
              <h4 className="font-medium mb-2">{item.name}</h4>
              <p className="text-sm text-foreground/70 mb-3">{item.description}</p>
              <p className="text-sm italic">{item.houseStyles[selectedHouse]}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <CustomButton 
            variant="outline" 
            onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            disabled={currentSection === 0}
          >
            Previous
          </CustomButton>
          
          <div className="flex items-center gap-1">
            {dormSections.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-colors
                  ${index === currentSection 
                    ? `bg-${selectedHouse}-primary` 
                    : index < currentSection || selectedItems[dormSections[index].id]
                      ? `bg-${selectedHouse}-primary/50` 
                      : 'bg-foreground/20'}`}
              ></div>
            ))}
          </div>
          
          <CustomButton 
            variant="outline" 
            onClick={() => setCurrentSection(prev => Math.min(dormSections.length - 1, prev + 1))}
            disabled={currentSection === dormSections.length - 1 || !selectedItems[dormSections[currentSection].id]}
          >
            Next
          </CustomButton>
        </div>
      </div>
    );
  };

  if (complete) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Dormitory is Ready!</h2>
          <p className="text-foreground/70">
            You've successfully designed your perfect {selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1)} dormitory at Hogwarts.
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
          <div className={`h-20 bg-gradient-to-r ${getHouseColor(selectedHouse)}`}></div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your Dormitory Features:</h3>
            
            <div className="space-y-6">
              {dormSections.map((section) => {
                const itemId = selectedItems[section.id];
                const item = section.items.find(i => i.id === itemId);
                
                if (!item) return null;
                
                return (
                  <div key={section.id} className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">{section.name}: {item.name}</h4>
                    <p>{item.description}</p>
                    <p className="mt-2 italic">{item.houseStyles[selectedHouse]}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-foreground/70 mb-4">
                Want to try something different? You can redesign your dormitory space.
              </p>
              <CustomButton variant={selectedHouse} onClick={resetDesign}>
                Redesign My Dormitory
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-card rounded-xl p-6 border border-border/80 shadow-sm">
          {renderCurrentSection()}
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select Your House</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleHouseSelect("gryffindor")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "gryffindor" 
                      ? "bg-gryffindor-primary text-white shadow-md" 
                      : "bg-muted hover:bg-gryffindor-primary/10"
                  }`}
                >
                  Gryffindor
                </button>
                <button
                  onClick={() => handleHouseSelect("slytherin")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "slytherin" 
                      ? "bg-slytherin-primary text-white shadow-md" 
                      : "bg-muted hover:bg-slytherin-primary/10"
                  }`}
                >
                  Slytherin
                </button>
                <button
                  onClick={() => handleHouseSelect("ravenclaw")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "ravenclaw" 
                      ? "bg-ravenclaw-primary text-white shadow-md" 
                      : "bg-muted hover:bg-ravenclaw-primary/10"
                  }`}
                >
                  Ravenclaw
                </button>
                <button
                  onClick={() => handleHouseSelect("hufflepuff")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "hufflepuff" 
                      ? "bg-hufflepuff-primary text-black shadow-md" 
                      : "bg-muted hover:bg-hufflepuff-primary/10"
                  }`}
                >
                  Hufflepuff
                </button>
              </div>
            </div>
            
            {renderDormPreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormCustomizer;
