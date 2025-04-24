
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
  const roomRef = useRef<HTMLDivElement>(null);

  const furnitureItems: DormItem[] = [
    { id: "desk1", name: "Study Desk", type: "furniture", imgSrc: "/lovable-uploads/0542b05a-2497-418f-ab87-a651349da71f.png", width: 80, height: 60, position: { x: 0, y: 0 } },
    { id: "bookshelf1", name: "Bookshelf", type: "furniture", imgSrc: "/lovable-uploads/38ad771d-bf9c-4a41-95e6-894e6b30ce22.png", width: 70, height: 120, position: { x: 0, y: 0 } },
    { id: "trunk1", name: "Magical Trunk", type: "furniture", imgSrc: "/lovable-uploads/805c7767-ed2e-48bb-83aa-326c1c7582e9.png", width: 80, height: 50, position: { x: 0, y: 0 } },
  ];

  const getHouseItems = (house: House): DormItem[] => {
    const getBedImage = (house: House) => {
      switch (house) {
        case "gryffindor":
          return "/lovable-uploads/e398318c-5ce7-46f1-afcc-c6481afce3c4.png"; // Gryffindor four-poster bed
        case "slytherin":
          return "/lovable-uploads/71d01db8-c62b-4b84-b8fa-0bba507a38b0.png"; // Slytherin four-poster bed
        case "ravenclaw":
          return "/lovable-uploads/3a45086e-7622-4bfe-b28a-61b74a3eb28c.png"; // Ravenclaw four-poster bed
        case "hufflepuff":
          return "/lovable-uploads/b7d4ffdb-4818-4fc2-94f7-33d7b4281941.png"; // Hufflepuff four-poster bed
        default:
          return "/lovable-uploads/e398318c-5ce7-46f1-afcc-c6481afce3c4.png";
      }
    };

    const baseItems = [
      { id: `bed-${house}`, name: `${house.charAt(0).toUpperCase() + house.slice(1)} Four-Poster Bed`, type: "houseItem" as const, house: house, imgSrc: getBedImage(house), width: 120, height: 80, position: { x: 0, y: 0 } },
    ];

    switch (house) {
      case "gryffindor":
        return [...baseItems,
          { id: "banner-g", name: "Gryffindor Banner", type: "houseItem", house: "gryffindor", imgSrc: "/lovable-uploads/a26c5f3d-35d8-4fff-94ca-ba64798b7c01.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-g", name: "Lion Plush", type: "houseItem", house: "gryffindor", imgSrc: "/lovable-uploads/a52090a6-1201-4e72-871e-cf97bc4a07b8.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      case "slytherin":
        return [...baseItems,
          { id: "banner-s", name: "Slytherin Banner", type: "houseItem", house: "slytherin", imgSrc: "/lovable-uploads/483b33f8-bc2c-4ff3-a578-260e7b8108ee.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-s", name: "Snake Plush", type: "houseItem", house: "slytherin", imgSrc: "/lovable-uploads/70e0311b-ae11-4625-a1bb-e15ecd4bf38e.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      case "ravenclaw":
        return [...baseItems,
          { id: "banner-r", name: "Ravenclaw Banner", type: "houseItem", house: "ravenclaw", imgSrc: "/lovable-uploads/f1a74d71-5b13-476f-8426-54d7ed56a948.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-r", name: "Eagle Plush", type: "houseItem", house: "ravenclaw", imgSrc: "/lovable-uploads/c28f05ce-cf6d-4762-baf5-26d6504ff8fc.png", width: 50, height: 60, position: { x: 0, y: 0 } },
        ];
      case "hufflepuff":
        return [...baseItems,
          { id: "banner-h", name: "Hufflepuff Banner", type: "houseItem", house: "hufflepuff", imgSrc: "/lovable-uploads/8a3f8074-a59f-4407-a2df-f4c8dcd91cc5.png", width: 90, height: 120, position: { x: 0, y: 0 } },
          { id: "plush-h", name: "Badger Plush", type: "houseItem", house: "hufflepuff", imgSrc: "/lovable-uploads/c28f05ce-cf6d-4762-baf5-26d6504ff8fc.png", width: 50, height: 60, position: { x: 0, y: 0 } },
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

  useEffect(() => {
    if (currentCategory === "houseItems" && !selectedHouse) {
      setCurrentCategory("furniture");
    }
  }, [currentCategory, selectedHouse]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
