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
  category: "furniture" | "decoration" | "magical";
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
];

const DormCustomizer = () => {
  // ... rest of the code remains unchanged
};
