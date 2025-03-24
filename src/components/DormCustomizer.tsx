import { useState, useRef, useEffect } from "react";
import { Table, Bed, BookOpen, Sofa, Shirt, PaintBucket, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { toast } from "sonner";

type DormItem = {
  id: string;
  name: string;
  type: "furniture" | "decor" | "houseItem";
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
  const [currentCategory, setCurrentCategory] = useState<"furniture" | "decor" | "houseItems">("furniture");
  const roomRef = useRef<HTMLDivElement>(null);

  // Base furniture items
  const furnitureItems: DormItem[] = [
    { id: "bed1", name: "Four-Poster Bed", type: "furniture", imgSrc: "/furniture/four-poster-bed.png", width: 120, height: 80, position: { x: 0, y: 0 } },
    { id: "desk1", name: "Study Desk", type: "furniture", imgSrc: "/furniture/desk.png", width: 80, height: 60, position: { x: 0, y: 0 } },
    { id: "bookshelf1", name: "Bookshelf", type: "furniture", imgSrc: "/furniture/bookshelf.png", width: 70, height: 120, position: { x: 0, y: 0 } },
    { id: "trunk1", name: "Magical Trunk", type: "furniture", imgSrc: "/furniture/trunk.png", width: 80, height: 50, position: { x: 0, y: 0 } },
    { id: "chair1", name: "Wooden Chair", type: "furniture", imgSrc: "/furniture/chair.png", width: 50, height: 50, position: { x: 0, y: 0 } },
  ];

  // Decor items
  const decorItems: DormItem[] = [
    { id: "rug1", name: "Magical Rug", type: "decor", imgSrc: "/decor/rug.png", width: 100, height: 60, position: { x: 0, y: 0 } },
    { id: "lamp1", name: "Enchanted Lamp", type: "decor", imgSrc: "/decor/lamp.png", width: 40, height: 80, position: { x: 0, y: 0 } },
    { id: "poster1", name: "Quidditch Poster", type: "decor", imgSrc: "/decor/poster.png", width: 60, height: 80, position: { x: 0, y: 0 } },
    { id: "plant1", name: "Magical Plant", type: "decor", imgSrc: "/decor/plant.png", width: 50, height: 70, position: { x: 0, y: 0 } },
    { id: "mirror1", name: "Talking Mirror", type: "decor", imgSrc: "/decor/mirror.png", width: 60, height: 90, position: { x: 0, y: 0 } },
  ];

  // House specific items
  const getHouseItems = (house: House): DormItem[] => {
    switch (house) {
      case "gryffindor":
        return [
          { id: "scarf-g", name: "Gryffindor Scarf", type: "houseItem", house: "gryffindor", imgSrc: "/house-items/gryffindor-scarf.png", width: 80, height: 30, position: { x: 0, y: 0 } },
          { id: "robe-g", name: "Gryffindor Robe", type: "houseItem", house: "gryffindor", imgSrc: "/house-items/gryffindor-robe.png", width: 70, height: 100, position: { x: 0, y: 0 } },
          { id: "banner-g", name: "Gryffindor Banner", type: "houseItem", house: "gryffindor", imgSrc: "/house-items/gryffindor-banner.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-g", name: "Lion Plush", type: "houseItem", house: "gryffindor", imgSrc: "/house-items/lion-plush.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      case "slytherin":
        return [
          { id: "scarf-s", name: "Slytherin Scarf", type: "houseItem", house: "slytherin", imgSrc: "/house-items/slytherin-scarf.png", width: 80, height: 30, position: { x: 0, y: 0 } },
          { id: "robe-s", name: "Slytherin Robe", type: "houseItem", house: "slytherin", imgSrc: "/house-items/slytherin-robe.png", width: 70, height: 100, position: { x: 0, y: 0 } },
          { id: "banner-s", name: "Slytherin Banner", type: "houseItem", house: "slytherin", imgSrc: "/house-items/slytherin-banner.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-s", name: "Snake Plush", type: "houseItem", house: "slytherin", imgSrc: "/house-items/snake-plush.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      case "ravenclaw":
        return [
          { id: "scarf-r", name: "Ravenclaw Scarf", type: "houseItem", house: "ravenclaw", imgSrc: "/house-items/ravenclaw-scarf.png", width: 80, height: 30, position: { x: 0, y: 0 } },
          { id: "robe-r", name: "Ravenclaw Robe", type: "houseItem", house: "ravenclaw", imgSrc: "/house-items/ravenclaw-robe.png", width: 70, height: 100, position: { x: 0, y: 0 } },
          { id: "banner-r", name: "Ravenclaw Banner", type: "houseItem", house: "ravenclaw", imgSrc: "/house-items/ravenclaw-banner.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-r", name: "Eagle Plush", type: "houseItem", house: "ravenclaw", imgSrc: "/house-items/eagle-plush.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      case "hufflepuff":
        return [
          { id: "scarf-h", name: "Hufflepuff Scarf", type: "houseItem", house: "hufflepuff", imgSrc: "/house-items/hufflepuff-scarf.png", width: 80, height: 30, position: { x: 0, y: 0 } },
          { id: "robe-h", name: "Hufflepuff Robe", type: "houseItem", house: "hufflepuff", imgSrc: "/house-items/hufflepuff-robe.png", width: 70, height: 100, position: { x: 0, y: 0 } },
          { id: "banner-h", name: "Hufflepuff Banner", type: "houseItem", house: "hufflepuff", imgSrc: "/house-items/hufflepuff-banner.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-h", name: "Badger Plush", type: "houseItem", house: "hufflepuff", imgSrc: "/house-items/badger-plush.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      default:
        return [];
    }
  };

  // Get current items based on category
  const getCurrentItems = () => {
    if (currentCategory === "furniture") return furnitureItems;
    if (currentCategory === "decor") return decorItems;
    if (currentCategory === "houseItems" && selectedHouse) return getHouseItems(selectedHouse);
    return [];
  };

  // Setup placeholder images for items until real images are loaded
  const handleItemImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
  };

  // Handle item drag start
  const handleDragStart = (item: DormItem) => {
    setDraggedItem({ ...item, id: `${item.id}-${Date.now()}` });
    setIsDragging(true);
  };

  // Handle room click for item placement
  const handleRoomClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !draggedItem || !roomRef.current) return;

    const roomRect = roomRef.current.getBoundingClientRect();
    const x = e.clientX - roomRect.left - (draggedItem.width / 2);
    const y = e.clientY - roomRect.top - (draggedItem.height / 2);

    // Boundary checking to keep items within the room
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

  // Handle removing an item
  const handleRemoveItem = (itemId: string) => {
    setPlacedItems(placedItems.filter(item => item.id !== itemId));
    toast.info("Item removed");
  };

  // Navigate categories
  const nextCategory = () => {
    if (currentCategory === "furniture") setCurrentCategory("decor");
    else if (currentCategory === "decor") setCurrentCategory("houseItems");
    else setCurrentCategory("furniture");
  };

  const prevCategory = () => {
    if (currentCategory === "furniture") setCurrentCategory("houseItems");
    else if (currentCategory === "decor") setCurrentCategory("furniture");
    else setCurrentCategory("decor");
  };

  // Background style based on selected house
  const getRoomStyle = () => {
    if (!selectedHouse) return "bg-hogwarts-stone-bg";

    switch (selectedHouse) {
      case "gryffindor":
        return "bg-hogwarts-stone-bg border-gryffindor-primary border-4";
      case "slytherin":
        return "bg-hogwarts-stone-bg border-slytherin-primary border-4";
      case "ravenclaw":
        return "bg-hogwarts-stone-bg border-ravenclaw-primary border-4";
      case "hufflepuff":
        return "bg-hogwarts-stone-bg border-hufflepuff-primary border-4";
      default:
        return "bg-hogwarts-stone-bg";
    }
  };

  // Effect to prevent category being houseItems when no house is selected
  useEffect(() => {
    if (currentCategory === "houseItems" && !selectedHouse) {
      setCurrentCategory("furniture");
    }
  }, [currentCategory, selectedHouse]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* House Selection */}
      <div className="glass-card p-6 col-span-3 lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-white">Choose Your House</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedHouse("gryffindor")}
            className={`p-4 rounded-lg transition-all ${
              selectedHouse === "gryffindor" 
                ? "bg-gryffindor-primary text-white scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Gryffindor</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-gryffindor-secondary mx-auto rounded-full"></div>
            <p className="text-sm">Courage & Bravery</p>
          </button>
          
          <button
            onClick={() => setSelectedHouse("slytherin")}
            className={`p-4 rounded-lg transition-all ${
              selectedHouse === "slytherin" 
                ? "bg-slytherin-primary text-white scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Slytherin</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-slytherin-secondary mx-auto rounded-full"></div>
            <p className="text-sm">Ambition & Cunning</p>
          </button>
          
          <button
            onClick={() => setSelectedHouse("ravenclaw")}
            className={`p-4 rounded-lg transition-all ${
              selectedHouse === "ravenclaw" 
                ? "bg-ravenclaw-primary text-white scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Ravenclaw</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-ravenclaw-secondary mx-auto rounded-full"></div>
            <p className="text-sm">Wisdom & Learning</p>
          </button>
          
          <button
            onClick={() => setSelectedHouse("hufflepuff")}
            className={`p-4 rounded-lg transition-all ${
              selectedHouse === "hufflepuff" 
                ? "bg-hufflepuff-primary text-black scale-105" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <h3 className="font-bold">Hufflepuff</h3>
            <div className="h-1 w-16 mt-1 mb-2 bg-hufflepuff-secondary mx-auto rounded-full"></div>
            <p className="text-sm">Loyalty & Patience</p>
          </button>
        </div>
      </div>
      
      {/* Room View */}
      <div className="glass-card p-6 col-span-3 lg:col-span-2 h-[500px] overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-white">Your Dormitory</h2>
        <div 
          ref={roomRef}
          className={`w-full h-[400px] relative ${getRoomStyle()} rounded-lg`}
          onClick={handleRoomClick}
        >
          {placedItems.map((item) => (
            <div
              key={item.id}
              className="absolute cursor-move transition-transform hover:scale-105"
              style={{
                left: `${item.position.x}px`,
                top: `${item.position.y}px`,
                width: `${item.width}px`,
                height: `${item.height}px`
              }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => handleRemoveItem(item.id)}
            >
              <img 
                src={item.imgSrc} 
                alt={item.name}
                className="w-full h-full object-contain"
                onError={handleItemImageError}
              />
              <div className="text-white text-xs mt-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm text-center">
                {item.name}
              </div>
            </div>
          ))}
          
          {/* Room design tips based on house */}
          {placedItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 p-4 rounded-lg backdrop-blur text-white text-center max-w-xs">
                {selectedHouse ? (
                  <p>Click on items from the selector below to place them in your {selectedHouse} dormitory. Double-click to remove items.</p>
                ) : (
                  <p>Choose your house first, then select and place furniture and decorations.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Item Selection */}
      <div className="glass-card p-6 col-span-3">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={prevCategory}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-white">
            {currentCategory === "furniture" && "Furniture"}
            {currentCategory === "decor" && "Decorations"}
            {currentCategory === "houseItems" && `${selectedHouse?.charAt(0).toUpperCase()}${selectedHouse?.slice(1)} Items`}
          </h2>
          
          <button 
            onClick={nextCategory}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {getCurrentItems().map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg transition-all ${
                isDragging && draggedItem?.id.startsWith(item.id) 
                  ? "opacity-50" 
                  : "hover:scale-105"
              } cursor-pointer bg-white/10 hover:bg-white/20 text-center`}
              onClick={() => handleDragStart(item)}
            >
              <div className="h-20 flex items-center justify-center mb-2">
                <img 
                  src={item.imgSrc}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                  onError={handleItemImageError}
                />
              </div>
              <p className="text-sm font-medium text-white">{item.name}</p>
            </div>
          ))}
          
          {currentCategory === "houseItems" && !selectedHouse && (
            <div className="col-span-full text-center p-6 bg-black/20 rounded-lg">
              <GraduationCap size={40} className="mx-auto mb-2 text-white/60" />
              <p className="text-white">Please select a house to see house-specific items</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-black/30 rounded-lg text-white text-sm">
          <p className="mb-2 font-bold">How to use:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Choose your Hogwarts house above</li>
            <li>Click on any item to select it</li>
            <li>Click in the room to place the selected item</li>
            <li>Double-click any placed item to remove it</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DormCustomizer;
