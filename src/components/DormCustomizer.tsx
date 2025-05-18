
import { useState, useRef, useEffect } from "react";
import { Table, Bed, BookOpen, House, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { toast } from "sonner";

type DormItem = {
  id: string;
  name: string;
  type: "furniture" | "houseItem";
  imgSrc: string;
  house?: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  width: number;
  height: number;
  position: { x: number; y: number };
};

type House = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

const DormCustomizer = () => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [placedItems, setPlacedItems] = useState<DormItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<DormItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<"furniture" | "houseItems">("furniture");
  const [activeMovingItem, setActiveMovingItem] = useState<string | null>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const furnitureItems: DormItem[] = [
    { id: "desk1", name: "Study Desk", type: "furniture", imgSrc: "/lovable-uploads/0542b05a-2497-418f-ab87-a651349da71f.png", width: 180, height: 280, position: { x: 0, y: 0 } },
    { id: "bookshelf1", name: "Bookshelf", type: "furniture", imgSrc: "/lovable-uploads/38ad771d-bf9c-4a41-95e6-894e6b30ce22.png", width: 240, height: 400, position: { x: 0, y: 0 } },
    { id: "trunk1", name: "Magical Trunk", type: "furniture", imgSrc: "/lovable-uploads/805c7767-ed2e-48bb-83aa-326c1c7582e9.png", width: 120, height: 100, position: { x: 0, y: 0 } },
  ];

  const getHouseItems = (house: House): DormItem[] => {
    const getBedImage = (house: House) => {
      switch (house) {
        case "gryffindor":
          return "/lovable-uploads/2fff22dd-941e-427f-9963-7bb5ab63b912.png";
        case "slytherin":
          return "/lovable-uploads/90317002-e297-49dc-bd6f-12277c3d651a.png";
        case "ravenclaw":
          return "/lovable-uploads/e13071b7-edff-4294-9103-ecb40f45d756.png";
        case "hufflepuff":
          return "/lovable-uploads/fb226dd6-1c2a-4b45-a9ac-482b180b2332.png";
        default:
          return "/lovable-uploads/e398318c-5ce7-46f1-afcc-c6481afce3c4.png";
      }
    };

    const baseItems = [
      { id: `bed-${house}`, name: `${house.charAt(0).toUpperCase() + house.slice(1)} Four-Poster Bed`, type: "houseItem" as const, house: house, imgSrc: getBedImage(house), width: 240, height: 350, position: { x: 0, y: 0 } },
    ];

    switch (house) {
      case "gryffindor":
        return [...baseItems,
          { id: "banner-g", name: "Gryffindor Banner", type: "houseItem", house: "gryffindor", imgSrc: "/lovable-uploads/e482be19-3189-4de0-857a-d3458c30aa6f.png", width: 100, height: 160, position: { x: 0, y: 0 } },
          { id: "plush-g", name: "Lion Plush", type: "houseItem", house: "gryffindor", imgSrc: "/lovable-uploads/f59b5804-c407-4afc-acf0-0887e6f59b13.png", width: 60, height: 60, position: { x: 0, y: 0 } },
        ];
      case "slytherin":
        return [...baseItems,
          { id: "banner-s", name: "Slytherin Banner", type: "houseItem", house: "slytherin", imgSrc: "/lovable-uploads/fd169dba-1710-47e9-9f6f-50ca8b1d6c23.png", width: 100, height: 160, position: { x: 0, y: 0 } },
          { id: "plush-s", name: "Snake Plush", type: "houseItem", house: "slytherin", imgSrc: "/lovable-uploads/ba85638e-dc44-4d4f-81a4-a08b406fd768.png", width: 60, height: 60, position: { x: 0, y: 0 } },
        ];
      case "ravenclaw":
        return [...baseItems,
          { id: "banner-r", name: "Ravenclaw Banner", type: "houseItem", house: "ravenclaw", imgSrc: "/lovable-uploads/b2a867f4-5a59-4c97-ac5e-ac0ac9adc4a0.png", width: 100, height: 160, position: { x: 0, y: 0 } },
          { id: "plush-r", name: "Eagle Plush", type: "houseItem", house: "ravenclaw", imgSrc: "/lovable-uploads/6816283e-2209-478f-bf7c-9bc5a32b9353.png", width: 60, height: 60, position: { x: 0, y: 0 } },
        ];
      case "hufflepuff":
        return [...baseItems,
          { id: "banner-h", name: "Hufflepuff Banner", type: "houseItem", house: "hufflepuff", imgSrc: "/lovable-uploads/65e32555-3e16-4455-b798-abd1581de64a.png", width: 100, height: 160, position: { x: 0, y: 0 } },
          { id: "plush-h", name: "Badger Plush", type: "houseItem", house: "hufflepuff", imgSrc: "/lovable-uploads/51448e59-c4df-4de9-a961-5318b72da490.png", width: 60, height: 60, position: { x: 0, y: 0 } },
        ];
      default:
        return baseItems;
    }
  };

  const getCurrentItems = () => {
    if (currentCategory === "furniture") return furnitureItems;
    if (currentCategory === "houseItems" && selectedHouse) return getHouseItems(selectedHouse);
    return [];
  };

  const handleItemImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
  };

  const handleDragStart = (item: DormItem) => {
    setDraggedItem({ ...item, id: `${item.id}-${Date.now()}` });
    setIsDragging(true);
  };

  const handleRoomClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !draggedItem || !roomRef.current) return;

    const roomRect = roomRef.current.getBoundingClientRect();
    const x = e.clientX - roomRect.left - (draggedItem.width / 2);
    const y = e.clientY - roomRect.top - (draggedItem.height / 2);

    const boundedX = Math.max(0, Math.min(x, roomRect.width - draggedItem.width));
    const boundedY = Math.max(0, Math.min(y, roomRect.height - draggedItem.height));

    const newItem = {
      ...draggedItem,
      position: { x: boundedX, y: boundedY }
    };

    setPlacedItems([...placedItems, newItem]);
    setIsDragging(false);
    setDraggedItem(null);

    toast.success(`Added ${newItem.name} to your dormitory!`);
  };

  const handleRemoveItem = (itemId: string) => {
    setPlacedItems(placedItems.filter(item => item.id !== itemId));
    toast.info("Item removed");
  };

  const nextCategory = () => {
    if (currentCategory === "furniture") setCurrentCategory("houseItems");
    else setCurrentCategory("furniture");
  };

  const prevCategory = () => {
    if (currentCategory === "furniture") setCurrentCategory("houseItems");
    else setCurrentCategory("furniture");
  };

  const getRoomStyle = () => {
    if (!selectedHouse) return "bg-white";

    switch (selectedHouse) {
      case "gryffindor":
        return "bg-white border-gryffindor-primary border-4";
      case "slytherin":
        return "bg-white border-slytherin-primary border-4";
      case "ravenclaw":
        return "bg-white border-ravenclaw-primary border-4";
      case "hufflepuff":
        return "bg-white border-hufflepuff-primary border-4";
      default:
        return "bg-white";
    }
  };

  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    if (!roomRef.current) return;
    e.stopPropagation();
    
    const itemElement = e.currentTarget;
    const rect = itemElement.getBoundingClientRect();
    const roomRect = roomRef.current.getBoundingClientRect();
    
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setActiveMovingItem(itemId);
    activeItemRef.current = { id: itemId, offsetX, offsetY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeMovingItem || !activeItemRef.current || !roomRef.current) return;
    
    const roomRect = roomRef.current.getBoundingClientRect();
    
    const itemIndex = placedItems.findIndex(item => item.id === activeMovingItem);
    if (itemIndex === -1) return;
    
    const movingItem = placedItems[itemIndex];
    
    const newX = e.clientX - roomRect.left - activeItemRef.current.offsetX;
    const newY = e.clientY - roomRect.top - activeItemRef.current.offsetY;
    
    const boundedX = Math.max(0, Math.min(newX, roomRect.width - movingItem.width));
    const boundedY = Math.max(0, Math.min(newY, roomRect.height - movingItem.height));
    
    const updatedItems = [...placedItems];
    updatedItems[itemIndex] = {
      ...movingItem,
      position: { x: boundedX, y: boundedY }
    };
    
    setPlacedItems(updatedItems);
  };

  const handleMouseUp = () => {
    if (activeMovingItem) {
      setActiveMovingItem(null);
      activeItemRef.current = null;
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };
    
    if (activeMovingItem) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [activeMovingItem]);

  useEffect(() => {
    if (currentCategory === "houseItems" && !selectedHouse) {
      setCurrentCategory("furniture");
    }
  }, [currentCategory, selectedHouse]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="glass-card p-4 md:p-6 col-span-3 lg:col-span-1">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Choose Your House</h2>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <button
            onClick={() => setSelectedHouse("gryffindor")}
            className={`p-3 md:p-4 rounded-lg transition-all ${
              selectedHouse === "gryffindor" 
                ? "bg-gryffindor-primary text-white scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Gryffindor</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-gryffindor-secondary mx-auto rounded-full"></div>
            <p className="text-xs md:text-sm">Courage & Bravery</p>
          </button>
          
          <button
            onClick={() => setSelectedHouse("slytherin")}
            className={`p-3 md:p-4 rounded-lg transition-all ${
              selectedHouse === "slytherin" 
                ? "bg-slytherin-primary text-white scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Slytherin</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-slytherin-secondary mx-auto rounded-full"></div>
            <p className="text-xs md:text-sm">Ambition & Cunning</p>
          </button>
          
          <button
            onClick={() => setSelectedHouse("ravenclaw")}
            className={`p-3 md:p-4 rounded-lg transition-all ${
              selectedHouse === "ravenclaw" 
                ? "bg-ravenclaw-primary text-white scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Ravenclaw</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-ravenclaw-secondary mx-auto rounded-full"></div>
            <p className="text-xs md:text-sm">Wisdom & Learning</p>
          </button>
          
          <button
            onClick={() => setSelectedHouse("hufflepuff")}
            className={`p-3 md:p-4 rounded-lg transition-all ${
              selectedHouse === "hufflepuff" 
                ? "bg-hufflepuff-primary text-black scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Hufflepuff</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-hufflepuff-secondary mx-auto rounded-full"></div>
            <p className="text-xs md:text-sm">Loyalty & Patience</p>
          </button>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 col-span-3 lg:col-span-2">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">Your Dormitory</h2>
        <div 
          ref={roomRef}
          className={`w-full aspect-[16/9] relative ${getRoomStyle()} rounded-lg`}
          onClick={handleRoomClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {placedItems.map((item) => (
            <div
              key={item.id}
              className={`absolute ${activeMovingItem === item.id ? 'cursor-grabbing z-10 shadow-xl' : 'cursor-grab hover:z-10'} 
                transition-shadow hover:shadow-lg`}
              style={{
                left: `${item.position.x}px`,
                top: `${item.position.y}px`,
                width: `${item.width}px`,
                height: `${item.height}px`
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              onDoubleClick={() => handleRemoveItem(item.id)}
            >
              <img 
                src={item.imgSrc} 
                alt={item.name}
                className="w-full h-full object-contain mix-blend-multiply"
                onError={handleItemImageError}
                draggable="false"
              />
              <div className="text-white text-xs mt-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm text-center">
                {item.name}
              </div>
            </div>
          ))}
          
          {placedItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 p-4 rounded-lg backdrop-blur text-white text-center max-w-xs">
                {selectedHouse ? (
                  <p className="text-sm md:text-base">Click on items from the selector below to place them in your {selectedHouse} dormitory. Double-click to remove items.</p>
                ) : (
                  <p className="text-sm md:text-base">Choose your house first, then select and place furniture and decorations.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 col-span-3">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={prevCategory}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {currentCategory === "furniture" && "Furniture"}
            {currentCategory === "houseItems" && `${selectedHouse?.charAt(0).toUpperCase()}${selectedHouse?.slice(1)} Items`}
          </h2>
          
          <button 
            onClick={nextCategory}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
          {getCurrentItems().map((item) => (
            <div
              key={item.id}
              className={`p-2 md:p-3 rounded-lg transition-all ${
                isDragging && draggedItem?.id.startsWith(item.id) 
                  ? "opacity-50" 
                  : "hover:scale-105"
              } cursor-pointer bg-white/10 hover:bg-white/20 text-center`}
              onClick={() => handleDragStart(item)}
            >
              <div className="h-16 md:h-20 flex items-center justify-center mb-1 md:mb-2">
                <img 
                  src={item.imgSrc}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                  onError={handleItemImageError}
                  draggable="false"
                />
              </div>
              <p className="text-xs md:text-sm font-medium text-white truncate">{item.name}</p>
            </div>
          ))}
          
          {currentCategory === "houseItems" && !selectedHouse && (
            <div className="col-span-full text-center p-4 md:p-6 bg-black/20 rounded-lg">
              <GraduationCap size={32} className="mx-auto mb-2 text-white/60" />
              <p className="text-white text-sm md:text-base">Please select a house to see house-specific items</p>
            </div>
          )}
        </div>
        
        <div className="mt-3 md:mt-4 p-3 bg-black/30 rounded-lg text-white text-xs md:text-sm">
          <p className="mb-1 font-bold">How to use:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Choose your Hogwarts house above</li>
            <li>Click on any item to select it</li>
            <li>Click in the room to place the selected item</li>
            <li>Drag placed items to rearrange them</li>
            <li>Double-click any placed item to remove it</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DormCustomizer;
