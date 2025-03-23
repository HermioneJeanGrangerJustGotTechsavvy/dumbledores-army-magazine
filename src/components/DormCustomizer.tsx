
import { useState, useRef, useEffect } from "react";
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
  imageUrl?: string; // For drag-drop items
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
        width: 60,
        height: 70,
      },
    ],
  },
];

const DormCustomizer = () => {
  const [selectedHouse, setSelectedHouse] = useState<House>("gryffindor");
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [complete, setComplete] = useState(false);
  
  // For drag-drop functionality
  const [dragMode, setDragMode] = useState(false);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [draggingItem, setDraggingItem] = useState<PlacedItem | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const roomCanvasRef = useRef<HTMLDivElement>(null);
  const [nextZIndex, setNextZIndex] = useState(1);

  // Handle house selection
  const handleHouseSelect = (house: House) => {
    setSelectedHouse(house);
  };

  // Handle item selection in the wizard flow
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

  // Helper to get item details by ID
  const getItemById = (sectionId: string, itemId: string): DormItem | undefined => {
    const section = dormSections.find(s => s.id === sectionId);
    return section?.items.find(item => item.id === itemId);
  };

  // Reset the entire design
  const resetDesign = () => {
    setSelectedItems({});
    setCurrentSection(0);
    setComplete(false);
    setPlacedItems([]);
    setDragMode(false);
  };

  // Get house color gradient
  const getHouseColor = (house: House) => {
    switch (house) {
      case "gryffindor": return "from-gryffindor-primary to-gryffindor-light";
      case "slytherin": return "from-slytherin-primary to-slytherin-light";
      case "ravenclaw": return "from-ravenclaw-primary to-ravenclaw-light";
      case "hufflepuff": return "from-hufflepuff-primary to-hufflepuff-light";
    }
  };

  // Start drag and drop mode
  const startDragMode = () => {
    if (!complete) {
      toast.error("Please complete your dormitory design first");
      return;
    }

    setDragMode(true);
    
    // Initialize placed items if not already done
    if (placedItems.length === 0) {
      const initialItems: PlacedItem[] = [];
      let zIndex = 1;
      
      Object.entries(selectedItems).forEach(([sectionId, itemId]) => {
        const item = getItemById(sectionId, itemId);
        if (item) {
          // Position items in grid-like pattern initially
          const newItem: PlacedItem = {
            id: `placed-${sectionId}-${Date.now()}`,
            itemId,
            sectionId,
            x: Math.random() * 300, // Random initial position
            y: Math.random() * 200,
            width: item.width || 100,
            height: item.height || 100,
            zIndex: zIndex++
          };
          initialItems.push(newItem);
        }
      });
      
      setPlacedItems(initialItems);
      setNextZIndex(zIndex);
    }
  };

  // Handle mouse down on a draggable item
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>, 
    item: PlacedItem
  ) => {
    if (!dragMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate offset from mouse to item top-left corner
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setDraggingItem({
      ...item,
      zIndex: nextZIndex
    });
    
    setNextZIndex(prev => prev + 1);
    
    // Add dragging class to element
    e.currentTarget.classList.add('dragging');
  };

  // Handle mouse move during drag
  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingItem || !roomCanvasRef.current) return;
    
    const canvasRect = roomCanvasRef.current.getBoundingClientRect();
    
    // Calculate new position relative to the canvas
    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;
    
    // Constrain to canvas boundaries
    newX = Math.max(0, Math.min(newX, canvasRect.width - draggingItem.width));
    newY = Math.max(0, Math.min(newY, canvasRect.height - draggingItem.height));
    
    // Update dragging item position
    setDraggingItem(prev => prev ? { ...prev, x: newX, y: newY } : null);
  };

  // Handle mouse up to drop the item
  const handleMouseUp = () => {
    if (!draggingItem) return;
    
    // Update placed items with the new position
    setPlacedItems(prev => {
      const existing = prev.find(item => item.id === draggingItem.id);
      
      if (existing) {
        return prev.map(item => 
          item.id === draggingItem.id ? draggingItem : item
        );
      } else {
        return [...prev, draggingItem];
      }
    });
    
    // Clear dragging state
    setDraggingItem(null);
    
    // Remove dragging class from all elements
    document.querySelectorAll('.dragging').forEach(el => {
      el.classList.remove('dragging');
    });
  };

  // Set up global mouse events for drag and drop
  useEffect(() => {
    if (dragMode) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragMode, draggingItem, dragOffset]);

  // Render the dormitory preview in selection mode
  const renderDormPreview = () => {
    const completedSections = Object.keys(selectedItems).length;
    const progressPercentage = Math.round((completedSections / dormSections.length) * 100);
    
    return (
      <div className="glass-card p-6 h-full">
        <h3 className="text-xl font-semibold mb-4">Your {selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1)} Dormitory</h3>
        
        {!complete && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Design Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
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
              <div key={sectionId} className="border-b border-white/10 pb-3 last:border-0">
                <h4 className="font-medium">{section.name}</h4>
                <p className="text-sm">{item.name} {item.houseStyles[selectedHouse]}</p>
              </div>
            );
          })}
        </div>
        
        {complete && (
          <div className="mt-6">
            <p className="text-sm mb-4">Your dormitory is complete! Now you can arrange your items.</p>
            <div className="flex gap-3">
              <CustomButton variant={selectedHouse} size="sm" onClick={startDragMode}>
                Arrange Items
              </CustomButton>
              <CustomButton variant="outline" size="sm" onClick={resetDesign}>
                Redesign
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the current section in the wizard
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
              className={`midnight-card p-4 hover:bg-midnight-light/20 transition-all cursor-pointer 
                ${selectedItems[section.id] === item.id 
                  ? `border-${selectedHouse}-primary bg-${selectedHouse}-primary/10` 
                  : 'border-white/10 hover:border-white/30'}`}
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

  // Render the drag and drop interface
  const renderDragDropInterface = () => {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Arrange Your Dormitory</h2>
          <p className="text-foreground/70 mb-4">
            Drag and position your items to create your perfect {selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1)} dormitory.
          </p>
          <CustomButton variant="outline" onClick={() => setDragMode(false)}>
            Return to Preview
          </CustomButton>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Room canvas for drag and drop */}
          <div 
            ref={roomCanvasRef}
            className="w-full lg:w-3/4 h-[600px] glass-card p-2 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23FFFFFF' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundColor: `rgba(${selectedHouse === 'gryffindor' ? '116, 0, 1' : selectedHouse === 'slytherin' ? '26, 71, 42' : selectedHouse === 'ravenclaw' ? '14, 26, 64' : '231, 185, 57'}, 0.1)`
            }}
          >
            {/* Render placed items */}
            {placedItems.map(item => {
              const dormItem = getItemById(item.sectionId, item.itemId);
              if (!dormItem) return null;
              
              const isBeingDragged = draggingItem && draggingItem.id === item.id;
              const itemPosition = isBeingDragged ? draggingItem : item;
              
              return (
                <div 
                  key={item.id}
                  className={`draggable absolute flex items-center justify-center 
                    ${isBeingDragged ? 'dragging shadow-lg' : ''}`}
                  style={{
                    left: `${itemPosition.x}px`,
                    top: `${itemPosition.y}px`,
                    width: `${itemPosition.width}px`,
                    height: `${itemPosition.height}px`,
                    zIndex: itemPosition.zIndex,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, item)}
                >
                  <div className={`w-full h-full rounded bg-${selectedHouse}-primary/20 border border-${selectedHouse}-primary/30 p-2 flex flex-col items-center justify-center`}>
                    <span className="text-xs font-medium">{dormItem.name}</span>
                    <div className="text-[10px] opacity-70 text-center mt-1">
                      {dormItem.houseStyles[selectedHouse].slice(0, 30)}{dormItem.houseStyles[selectedHouse].length > 30 ? '...' : ''}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Instructions overlay */}
            {placedItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 rounded-lg bg-black/30 backdrop-blur-sm">
                  <p className="mb-2">Drag and drop your selected dormitory items here</p>
                  <p className="text-sm opacity-70">Click the items on the right to start arranging</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Items palette */}
          <div className="w-full lg:w-1/4 glass-card p-4 space-y-4">
            <h3 className="font-medium text-lg mb-2">Your Items</h3>
            
            {Object.entries(selectedItems).map(([sectionId, itemId]) => {
              const section = dormSections.find(s => s.id === sectionId);
              const item = getItemById(sectionId, itemId);
              
              if (!section || !item) return null;
              
              return (
                <div 
                  key={`palette-${sectionId}`}
                  className={`p-3 rounded border border-${selectedHouse}-primary/30 bg-${selectedHouse}-primary/10 cursor-pointer hover:bg-${selectedHouse}-primary/20 transition-colors`}
                  onClick={() => {
                    // Create a new draggable item when clicked from palette
                    const newItem: PlacedItem = {
                      id: `placed-${sectionId}-${Date.now()}`,
                      itemId,
                      sectionId,
                      x: 50,
                      y: 50,
                      width: item.width || 100,
                      height: item.height || 100,
                      zIndex: nextZIndex
                    };
                    
                    setPlacedItems(prev => [...prev, newItem]);
                    setNextZIndex(prev => prev + 1);
                    
                    toast.success(`Added ${item.name}`);
                  }}
                >
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs opacity-70 mt-1">Click to add</p>
                </div>
              );
            })}
            
            <div className="pt-4 border-t border-white/10">
              <CustomButton 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setPlacedItems([]);
                  toast.info("Canvas cleared");
                }}
              >
                Clear Canvas
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main dormitory complete view
  if (complete && !dragMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Dormitory is Ready!</h2>
          <p className="text-foreground/70">
            You've successfully designed your perfect {selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1)} dormitory at Hogwarts.
          </p>
        </div>
        
        <div className="glass-card shadow-lg">
          <div className={`h-20 bg-gradient-to-r ${getHouseColor(selectedHouse)}`}></div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your Dormitory Features:</h3>
            
            <div className="space-y-6">
              {dormSections.map((section) => {
                const itemId = selectedItems[section.id];
                const item = section.items.find(i => i.id === itemId);
                
                if (!item) return null;
                
                return (
                  <div key={section.id} className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                    <h4 className="font-medium mb-2">{section.name}: {item.name}</h4>
                    <p>{item.description}</p>
                    <p className="mt-2 italic">{item.houseStyles[selectedHouse]}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-foreground/70 mb-4">
                Want to try something different? You can redesign or arrange your dormitory space.
              </p>
              <div className="flex justify-center gap-4">
                <CustomButton variant={selectedHouse} onClick={startDragMode}>
                  Arrange My Dormitory
                </CustomButton>
                <CustomButton variant="outline" onClick={resetDesign}>
                  Redesign
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Drag and drop mode
  if (dragMode) {
    return renderDragDropInterface();
  }

  // Initial setup wizard
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 glass-card p-6 shadow-lg">
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
                      : "bg-white/5 hover:bg-gryffindor-primary/20"
                  }`}
                >
                  Gryffindor
                </button>
                <button
                  onClick={() => handleHouseSelect("slytherin")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "slytherin" 
                      ? "bg-slytherin-primary text-white shadow-md" 
                      : "bg-white/5 hover:bg-slytherin-primary/20"
                  }`}
                >
                  Slytherin
                </button>
                <button
                  onClick={() => handleHouseSelect("ravenclaw")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "ravenclaw" 
                      ? "bg-ravenclaw-primary text-white shadow-md" 
                      : "bg-white/5 hover:bg-ravenclaw-primary/20"
                  }`}
                >
                  Ravenclaw
                </button>
                <button
                  onClick={() => handleHouseSelect("hufflepuff")}
                  className={`rounded-lg p-3 transition-all ${
                    selectedHouse === "hufflepuff" 
                      ? "bg-hufflepuff-primary text-black shadow-md" 
                      : "bg-white/5 hover:bg-hufflepuff-primary/20"
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
