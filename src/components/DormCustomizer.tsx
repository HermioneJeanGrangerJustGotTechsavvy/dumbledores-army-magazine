
import { useState, useRef, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";
import { 
  Bed, 
  BookOpen, 
  Table, 
  Lamp, 
  ShieldCheck, 
  Paintbrush, 
  Sparkles, 
  Moon 
} from "lucide-react";

type DormItem = {
  id: string;
  name: string;
  description: string;
  category: "furniture" | "decoration" | "magical" | "house-merch";
  houseStyles: {
    gryffindor: string;
    slytherin: string;
    ravenclaw: string;
    hufflepuff: string;
  };
  icon: React.ReactNode;
  width?: number;
  height?: number;
};

type DormSection = {
  id: string;
  name: string;
  description: string;
  items: DormItem[];
};

type House = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

type PlacedItem = {
  id: string;
  itemId: string;
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  house?: House;
};

// Furniture and decoration items for the dorm
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
        icon: <Bed size={48} />,
        width: 180,
        height: 150,
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
        icon: <Bed size={48} className="magic-shine" />,
        width: 180,
        height: 150,
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
        icon: <Bed size={48} className="opacity-80" />,
        width: 180,
        height: 150,
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
        icon: <Table size={40} />,
        width: 120,
        height: 80,
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
        icon: <Table size={40} className="magic-shine" />,
        width: 120,
        height: 80,
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
        icon: <Table size={40} className="opacity-80" />,
        width: 100,
        height: 60,
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
        icon: <ShieldCheck size={36} />,
        width: 80,
        height: 120,
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
        icon: <Paintbrush size={36} className="magic-shine" />,
        width: 100,
        height: 80,
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
        icon: <Moon size={36} />,
        width: 90,
        height: 90,
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
        icon: <Lamp size={32} />,
        width: 40,
        height: 60,
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
        icon: <Moon size={32} className="magic-shine" />,
        width: 50,
        height: 50,
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
        icon: <Sparkles size={32} />,
        width: 60,
        height: 70,
      },
    ],
  },
  {
    id: "house-merch",
    name: "House Merchandise",
    description: "Display your house pride",
    items: [
      {
        id: "house-scarf",
        name: "House Scarf",
        description: "A warm scarf in your house colors",
        category: "house-merch",
        houseStyles: {
          gryffindor: "with bold scarlet and gold stripes",
          slytherin: "with elegant emerald and silver pattern",
          ravenclaw: "with sophisticated blue and bronze weave",
          hufflepuff: "with cozy yellow and black design",
        },
        icon: <Sparkles size={36} />,
        width: 120,
        height: 40,
      },
      {
        id: "house-robe",
        name: "House Robe",
        description: "Your magical school uniform with house colors",
        category: "house-merch",
        houseStyles: {
          gryffindor: "with a golden lion embroidered on the chest",
          slytherin: "with a silver serpent embroidered on the chest",
          ravenclaw: "with a bronze eagle embroidered on the chest",
          hufflepuff: "with a black badger embroidered on the chest",
        },
        icon: <Sparkles size={36} />,
        width: 100,
        height: 150,
      },
      {
        id: "magical-trinket",
        name: "Magical Trinket",
        description: "A special magical item for your house",
        category: "house-merch",
        houseStyles: {
          gryffindor: "a miniature sword of Gryffindor that glows when touched",
          slytherin: "a cunning little snake figurine that moves on its own",
          ravenclaw: "a small diadem replica that enhances focus when studying",
          hufflepuff: "a magical plant that blooms with your mood",
        },
        icon: <Sparkles size={32} className="magic-shine" />,
        width: 60,
        height: 60,
      },
    ],
  },
];

const DormCustomizer = () => {
  const [selectedHouse, setSelectedHouse] = useState<House>("gryffindor");
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<{
    item: DormItem;
    section: DormSection;
  } | null>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [roomSize, setRoomSize] = useState({ width: 0, height: 0 });
  
  // Initialize room size on mount
  useEffect(() => {
    if (roomRef.current) {
      setRoomSize({
        width: roomRef.current.clientWidth,
        height: roomRef.current.clientHeight
      });
    }
    
    // Add window resize listener
    const handleResize = () => {
      if (roomRef.current) {
        setRoomSize({
          width: roomRef.current.clientWidth,
          height: roomRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Handle house change
  const handleHouseChange = (house: House) => {
    setSelectedHouse(house);
    toast(`Switched to ${house.charAt(0).toUpperCase() + house.slice(1)} house!`);
  };
  
  // Start dragging an item
  const handleDragStart = (item: DormItem, section: DormSection) => {
    setDraggedItem({ item, section });
    setIsDragging(true);
  };
  
  // Drop an item into the room
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedItem || !roomRef.current) return;
    
    const roomRect = roomRef.current.getBoundingClientRect();
    const x = e.clientX - roomRect.left - (draggedItem.item.width || 100) / 2;
    const y = e.clientY - roomRect.top - (draggedItem.item.height || 100) / 2;
    
    // Ensure the item is within the room boundaries
    const constrainedX = Math.max(0, Math.min(x, roomSize.width - (draggedItem.item.width || 100)));
    const constrainedY = Math.max(0, Math.min(y, roomSize.height - (draggedItem.item.height || 100)));
    
    const newPlacedItem: PlacedItem = {
      id: `${draggedItem.item.id}-${Date.now()}`,
      itemId: draggedItem.item.id,
      sectionId: draggedItem.section.id,
      x: constrainedX,
      y: constrainedY,
      width: draggedItem.item.width || 100,
      height: draggedItem.item.height || 100,
      zIndex: placedItems.length + 1,
      house: selectedHouse,
    };
    
    setPlacedItems([...placedItems, newPlacedItem]);
    setIsDragging(false);
    setDraggedItem(null);
    
    toast.success(`Added ${draggedItem.item.name} to your dorm!`);
  };
  
  // Allow dropping
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  // Item dragging ended without a drop
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };
  
  // Remove an item from the room
  const handleRemoveItem = (itemId: string) => {
    setPlacedItems(placedItems.filter(item => item.id !== itemId));
    toast.info("Item removed from your dorm");
  };
  
  // Move a placed item
  const handlePlacedItemDrag = (e: React.MouseEvent, placedItem: PlacedItem) => {
    e.preventDefault();
    if (!roomRef.current) return;
    
    const roomRect = roomRef.current.getBoundingClientRect();
    
    const moveItem = (moveEvent: MouseEvent) => {
      const x = moveEvent.clientX - roomRect.left - placedItem.width / 2;
      const y = moveEvent.clientY - roomRect.top - placedItem.height / 2;
      
      // Constrain to room boundaries
      const constrainedX = Math.max(0, Math.min(x, roomSize.width - placedItem.width));
      const constrainedY = Math.max(0, Math.min(y, roomSize.height - placedItem.height));
      
      setPlacedItems(items =>
        items.map(item =>
          item.id === placedItem.id
            ? { ...item, x: constrainedX, y: constrainedY, zIndex: Math.max(...items.map(i => i.zIndex)) + 1 }
            : item
        )
      );
    };
    
    const stopMoving = () => {
      document.removeEventListener("mousemove", moveItem);
      document.removeEventListener("mouseup", stopMoving);
    };
    
    document.addEventListener("mousemove", moveItem);
    document.addEventListener("mouseup", stopMoving);
  };
  
  // Find an item and section by its IDs
  const findItemAndSection = (itemId: string, sectionId: string) => {
    const section = dormSections.find(s => s.id === sectionId);
    if (!section) return null;
    
    const item = section.items.find(i => i.id === itemId);
    if (!item) return null;
    
    return { item, section };
  };
  
  // Reset the room
  const handleReset = () => {
    if (placedItems.length === 0) {
      toast.info("Your dorm is already empty!");
      return;
    }
    
    setPlacedItems([]);
    toast.success("Your dorm has been reset!");
  };
  
  // Save the current layout
  const handleSave = () => {
    // In a real app, this would save to a database
    toast.success("Your dorm layout has been saved!");
  };
  

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative z-10">
      {/* Left sidebar - Item selection */}
      <div className="lg:w-1/4 glass-card p-4 rounded-lg text-white">
        <h2 className="text-xl font-magical mb-4 text-stars">Furnish Your Dorm</h2>
        
        <div className="mb-6">
          <h3 className="mb-3 text-white font-semibold">Choose Your House</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleHouseChange("gryffindor")}
              className={`py-2 px-3 rounded-md text-white transition ${
                selectedHouse === "gryffindor"
                  ? "bg-gryffindor-primary"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Gryffindor
            </button>
            <button
              onClick={() => handleHouseChange("slytherin")}
              className={`py-2 px-3 rounded-md text-white transition ${
                selectedHouse === "slytherin"
                  ? "bg-slytherin-primary"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Slytherin
            </button>
            <button
              onClick={() => handleHouseChange("ravenclaw")}
              className={`py-2 px-3 rounded-md text-white transition ${
                selectedHouse === "ravenclaw"
                  ? "bg-ravenclaw-primary"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Ravenclaw
            </button>
            <button
              onClick={() => handleHouseChange("hufflepuff")}
              className={`py-2 px-3 rounded-md text-white transition ${
                selectedHouse === "hufflepuff"
                  ? "bg-hufflepuff-primary"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Hufflepuff
            </button>
          </div>
        </div>
        
        <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
          {dormSections.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="font-semibold mb-2 text-white">{section.name}</h3>
              <p className="text-sm mb-3 text-white/70">{section.description}</p>
              
              <div className="grid grid-cols-2 gap-2">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item, section)}
                    onDragEnd={handleDragEnd}
                    className="bg-white/10 rounded-lg p-3 cursor-move hover:bg-white/20 transition flex flex-col items-center"
                  >
                    <div className={`p-2 mb-2 rounded-full ${
                      item.category === "magical" ? "bg-stars/20" : "bg-white/5"
                    }`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-white">{item.name}</span>
                    <span className="text-xs mt-1 text-white/70">
                      {item.houseStyles[selectedHouse]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main room area */}
      <div className="lg:w-3/4 flex flex-col">
        <div 
          ref={roomRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`relative rounded-lg night-sky p-4 h-[600px] overflow-hidden border-2 ${
            isDragging ? "border-white/30" : "border-white/10"
          } transition-all duration-200`}
        >
          {/* House-themed room background */}
          <div className={`absolute inset-0 opacity-20 ${
            selectedHouse === "gryffindor" ? "bg-gryffindor-primary" : 
            selectedHouse === "slytherin" ? "bg-slytherin-primary" : 
            selectedHouse === "ravenclaw" ? "bg-ravenclaw-primary" : 
            "bg-hufflepuff-primary"
          }`}></div>
          
          {/* Placed items */}
          {placedItems.map((placedItem) => {
            const foundItem = findItemAndSection(placedItem.itemId, placedItem.sectionId);
            if (!foundItem) return null;
            
            const { item, section } = foundItem;
            
            return (
              <div
                key={placedItem.id}
                onMouseDown={(e) => handlePlacedItemDrag(e, placedItem)}
                style={{
                  position: "absolute",
                  left: `${placedItem.x}px`,
                  top: `${placedItem.y}px`,
                  width: `${placedItem.width}px`,
                  height: `${placedItem.height}px`,
                  zIndex: placedItem.zIndex,
                }}
                className={`flex flex-col items-center justify-center cursor-move ${
                  item.category === "magical" ? "magic-particles-container" : ""
                }`}
              >
                <div className={`p-2 rounded-md bg-white/5 backdrop-blur-sm ${
                  item.category === "magical" ? "animate-float" : ""
                }`}>
                  {item.icon}
                </div>
                <span className="text-xs text-white mt-1 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                  {item.name}
                </span>
                <button
                  onClick={() => handleRemoveItem(placedItem.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            );
          })}
          
          {/* Drop zone indicator when dragging */}
          {isDragging && (
            <div className="absolute inset-4 border-2 border-white/30 border-dashed rounded-lg pointer-events-none flex items-center justify-center">
              <span className="bg-black/50 text-white px-3 py-1 rounded backdrop-blur-sm text-sm">
                Drop to place item
              </span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-4 gap-4">
          <CustomButton onClick={handleReset} variant="outline" className="text-white border-white/20">
            Reset Room
          </CustomButton>
          <CustomButton onClick={handleSave} className="bg-stars hover:bg-stars/80 text-midnight">
            Save Design
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DormCustomizer;
