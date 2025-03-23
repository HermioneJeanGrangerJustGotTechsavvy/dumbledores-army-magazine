
import { useState, useEffect } from "react";
import { Search, X, BookOpen } from "lucide-react";
import { toast } from "sonner";
import ClassCard from "@/components/ClassCard";

type Class = {
  id: string;
  title: string;
  description: string;
  professor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  house?: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  content: {
    introduction: string;
    lessons: {
      title: string;
      content: string;
      exercise?: string;
    }[];
    conclusion: string;
  };
};

const classes: Class[] = [
  {
    id: "magical-poetry",
    title: "Magical Poetry",
    description: "Learn to craft enchanting verses that capture the essence of magic.",
    professor: "Madam Versecraft",
    level: "Beginner",
    topics: ["Rhythm", "Metaphor", "Imagery", "Structure"],
    house: "ravenclaw",
    content: {
      introduction: "Welcome to Magical Poetry! In this class, you'll learn to weave words that capture the essence of magic and wonder. Poetry is a powerful form of expression that can transport readers to other worlds and evoke deep emotions.",
      lessons: [
        {
          title: "Finding Your Magical Voice",
          content: "Your poetic voice is unique to you. Begin by writing about what moves you in the magical world. Are you drawn to the majesty of dragons? The subtle power of potions? The bonds between wizards? Write from your authentic experience and perspective.",
          exercise: "Write a short 4-line poem about your favorite magical creature, focusing on one specific quality that fascinates you."
        },
        {
          title: "Crafting Magical Imagery",
          content: "Powerful poetry creates vivid images in the reader's mind. Use concrete, specific details rather than vague descriptions. Instead of 'the wand was magical,' try 'the willow wand trembled, its core of dragon heartstring pulsing with each incantation.'",
          exercise: "Describe a magical location using at least three sensory details (what you see, hear, smell, taste, or touch)."
        },
        {
          title: "The Rhythm of Spells",
          content: "Poetry has rhythm, much like spells do. Notice how incantations have a particular cadence and sound pattern. You can create rhythm through repetition, syllable counts, or stress patterns. Read your poems aloud to hear their natural rhythm.",
          exercise: "Write a short spell-poem with a distinct rhythm, perhaps by repeating certain sounds or maintaining a specific syllable count in each line."
        }
      ],
      conclusion: "Remember, magical poetry isn't about perfection—it's about capturing a moment, an emotion, or an idea through the lens of magic. Keep practicing, and over time, your poems will become more powerful, just like your spellcasting improves with practice. The magical world offers endless inspiration for your poetry."
    }
  },
  {
    id: "character-creation",
    title: "Character Creation",
    description: "Develop compelling magical personalities for your stories.",
    professor: "Professor Caractus",
    level: "Intermediate",
    topics: ["Backstory", "Motivation", "Development", "Dialogue"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Character Creation! Creating compelling magical characters is the foundation of any great wizarding tale. In this class, we'll explore how to breathe life into your characters, giving them depth, motivation, and authenticity.",
      lessons: [
        {
          title: "Beyond Wands and Houses",
          content: "A character is more than their magical abilities or Hogwarts house. Consider their fears, dreams, relationships, and flaws. What shaped them before they discovered magic? What continues to challenge them despite their magical abilities? The most memorable characters have both strengths and weaknesses.",
          exercise: "Create a character profile including: name, age, magical ability, greatest fear, deepest desire, and one secret they keep from others."
        },
        {
          title: "The Voice of Magic",
          content: "How your character speaks reveals much about their background, education, personality, and values. Do they use formal incantations or casual spell-slang? Are they patient in explaining magical concepts to others, or impatient with those who don't understand quickly? Their dialogue should be consistent with who they are.",
          exercise: "Write a short dialogue between your character and someone who has never experienced magic, revealing how your character views the magical world."
        },
        {
          title: "Growth Through Trials",
          content: "Characters become compelling when they face challenges and change as a result. Consider what magical trials your character might face—perhaps mastering a difficult spell, confronting a magical creature that embodies their fear, or making an ethical choice about using their powers. How do these experiences transform them?",
          exercise: "Outline a pivotal moment where your character faces a difficult magical challenge, and describe how they are different after facing it."
        }
      ],
      conclusion: "Developing magical characters is an ongoing process of discovery. Sometimes your characters will surprise you, making choices you didn't anticipate. Listen to them. The most authentic characters often feel like they've taken on a life of their own, guiding the writer rather than being controlled by them. Continue developing your characters, and they'll lead you to amazing magical stories."
    }
  },
  {
    id: "worldbuilding",
    title: "Magical Worldbuilding",
    description: "Create immersive magical settings with consistent rules and rich history.",
    professor: "Master Cosmografter",
    level: "Advanced",
    topics: ["Magic Systems", "History", "Society", "Geography"],
    house: "slytherin",
    content: {
      introduction: "Welcome to Magical Worldbuilding! Creating a coherent magical world is one of the most challenging and rewarding aspects of magical writing. In this advanced class, we'll explore how to construct worlds that feel authentic, consistent, and alive with possibility.",
      lessons: [
        {
          title: "The Rules of Magic",
          content: "Every magical world needs consistent rules. What can magic do and what can't it do? What are its costs and limitations? Is magic innate to certain people, learned through study, or accessible to anyone with the right tools? The most compelling magical worlds have systems with clear boundaries and consequences. Without limits, magic solves every problem, eliminating tension from your story.",
          exercise: "Design the fundamental rules for your magical system, including its source, limitations, and at least one unintended consequence of using it."
        },
        {
          title: "The Weight of Magical History",
          content: "Magical worlds don't exist in a vacuum—they have histories that influence the present. Consider how magic has shaped your world's development. Were there magical wars? Periods of magical renaissance or dark ages? How have attitudes toward magic changed over time? These historical elements create depth and provide context for current conflicts.",
          exercise: "Create a brief timeline of 3-5 major historical events involving magic that have shaped your world, and explain how they affect the current state of society."
        },
        {
          title: "Magic's Influence on Society",
          content: "Magic would fundamentally alter how communities function. Consider how magic affects economics (what has value when objects can be conjured?), class systems (is there a magical elite?), governance (how are magical crimes handled?), and everyday life. These details make your world feel lived-in rather than merely a backdrop for adventure.",
          exercise: "Choose one aspect of society (economics, transportation, education, etc.) and detail specifically how magic has altered it from what we know in our non-magical world."
        }
      ],
      conclusion: "Remember that worldbuilding serves your story, not the other way around. While it's tempting to create extensive details about every aspect of your magical world, focus your energy on the elements most relevant to your characters and plot. The best magical worlds reveal themselves gradually through the experiences of characters, rather than through exposition. Keep building, revising, and expanding your world as your story demands."
    }
  },
  {
    id: "heroic-journey",
    title: "The Hero's Magical Journey",
    description: "Explore the classic structure of magical coming-of-age tales.",
    professor: "Sir Quillcrest",
    level: "Intermediate",
    topics: ["Plot Structure", "Character Arc", "Symbolism", "Themes"],
    house: "gryffindor",
    content: {
      introduction: "Welcome to The Hero's Magical Journey! Many of the most beloved magical tales follow a similar pattern: a protagonist receives a call to adventure, faces trials, and returns transformed. In this class, we'll explore how to craft compelling magical journeys that resonate with readers.",
      lessons: [
        {
          title: "The Call to Magic",
          content: "Every magical journey begins with a call—the moment when ordinary life is disrupted by the extraordinary. This might be the discovery of magical abilities, an unexpected letter of admission to a magical school, or an encounter with a magical being. This call should both excite and frighten your protagonist, representing both opportunity and challenge.",
          exercise: "Write the scene where your protagonist first encounters magic in a way that changes their life's direction forever."
        },
        {
          title: "Magical Mentors and Adversaries",
          content: "On their journey, your hero will meet those who guide them and those who oppose them. Mentors provide wisdom, training, and sometimes magical objects, but should not solve problems for the hero. Adversaries challenge your hero, forcing them to grow. The most compelling adversaries often reflect some aspect of the hero's own fears or flaws.",
          exercise: "Create a mentor character and an adversary for your hero, explaining what each one wants and how they will influence your protagonist's development."
        },
        {
          title: "The Return With Magical Mastery",
          content: "By the journey's end, your hero has changed. They've gained not just magical skills but wisdom. Often, they return to where they began but see it differently. The external magic they've mastered should reflect an internal transformation—greater courage, wisdom, compassion, or self-acceptance.",
          exercise: "Outline your hero's state at the beginning and end of their journey, focusing not just on what magical abilities they've gained, but how they've changed as a person."
        }
      ],
      conclusion: "The hero's magical journey is a powerful template, but don't be afraid to subvert expectations or combine it with other structures. The most memorable stories honor the tradition while adding something fresh. As you craft your hero's journey, remember that the external magical adventure should mirror an internal journey of growth and transformation."
    }
  }
];

const Classes = () => {
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [filters, setFilters] = useState({
    level: [] as string[],
    house: [] as string[],
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
    setActiveLesson(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast(`Welcome to ${classItem.title}!`, {
      description: `Professor ${classItem.professor} is ready to begin the lesson.`,
    });
  };

  const handleBack = () => {
    setSelectedClass(null);
  };

  const toggleFilter = (category: "level" | "house", value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index > -1) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [category]: currentFilters
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      level: [],
      house: []
    });
    setSearchQuery("");
  };

  const hasActiveFilters = searchQuery !== "" || filters.level.length > 0 || filters.house.length > 0;

  const filteredClasses = classes.filter(classItem => {
    // Search query filter
    if (searchQuery && !classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !classItem.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !classItem.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Level filter
    if (filters.level.length > 0 && !filters.level.includes(classItem.level)) {
      return false;
    }
    
    // House filter
    if (filters.house.length > 0 && classItem.house && !filters.house.includes(classItem.house)) {
      return false;
    }
    
    return true;
  });

  if (selectedClass) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Classes
        </button>
        
        <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
          <div className={`h-3 ${selectedClass.house ? `bg-${selectedClass.house}-primary` : "bg-primary"}`}></div>
          
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedClass.title}</h1>
                <p className="text-foreground/70">{selectedClass.description}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm">
                  <span className="font-medium">Professor:</span> {selectedClass.professor}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Level:</span> {selectedClass.level}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Lesson navigation sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Lesson Plan</h3>
                  
                  <div className="space-y-2">
                    <button
                      className={`w-full text-left p-2 rounded-md text-sm transition-colors ${activeLesson === 0 ? "bg-background border-l-2 border-primary pl-3" : "hover:bg-background/50"}`}
                      onClick={() => setActiveLesson(0)}
                    >
                      Introduction
                    </button>
                    
                    {selectedClass.content.lessons.map((lesson, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${activeLesson === index + 1 ? "bg-background border-l-2 border-primary pl-3" : "hover:bg-background/50"}`}
                        onClick={() => setActiveLesson(index + 1)}
                      >
                        {lesson.title}
                      </button>
                    ))}
                    
                    <button
                      className={`w-full text-left p-2 rounded-md text-sm transition-colors ${activeLesson === selectedClass.content.lessons.length + 1 ? "bg-background border-l-2 border-primary pl-3" : "hover:bg-background/50"}`}
                      onClick={() => setActiveLesson(selectedClass.content.lessons.length + 1)}
                    >
                      Conclusion
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Lesson content */}
              <div className="flex-grow">
                {activeLesson === 0 ? (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p className="whitespace-pre-line">{selectedClass.content.introduction}</p>
                  </div>
                ) : activeLesson === selectedClass.content.lessons.length + 1 ? (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                    <p className="whitespace-pre-line">{selectedClass.content.conclusion}</p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">
                      {selectedClass.content.lessons[activeLesson - 1].title}
                    </h2>
                    <p className="whitespace-pre-line mb-6">
                      {selectedClass.content.lessons[activeLesson - 1].content}
                    </p>
                    
                    {selectedClass.content.lessons[activeLesson - 1].exercise && (
                      <div className="bg-muted p-4 rounded-lg border-l-4 border-secondary">
                        <h3 className="font-semibold mb-2">Writing Exercise</h3>
                        <p>{selectedClass.content.lessons[activeLesson - 1].exercise}</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <button
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setActiveLesson(prev => Math.max(0, prev - 1))}
                    disabled={activeLesson === 0}
                  >
                    ← Previous
                  </button>
                  
                  <button
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setActiveLesson(prev => Math.min(selectedClass.content.lessons.length + 1, prev + 1))}
                    disabled={activeLesson === selectedClass.content.lessons.length + 1}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Magical Writing Classes</h1>
        <p className="text-foreground/70 max-w-3xl mx-auto">
          Improve your creative writing skills with our specialized magical classes. 
          Learn from expert professors and develop your unique magical voice.
        </p>
      </div>
      
      <div className={`max-w-5xl mx-auto transition-all duration-700 delay-150 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Search and filters */}
        <div className="mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground/50" />
            </div>
            <input
              type="text"
              placeholder="Search for classes, topics, or skills..."
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Filter by:</span>
            
            <div className="flex flex-wrap gap-2">
              {/* Level filters */}
              <button
                onClick={() => toggleFilter("level", "Beginner")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.level.includes("Beginner") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => toggleFilter("level", "Intermediate")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.level.includes("Intermediate") 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => toggleFilter("level", "Advanced")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.level.includes("Advanced") 
                    ? "bg-purple-100 text-purple-700" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Advanced
              </button>
              
              {/* House filters */}
              <button
                onClick={() => toggleFilter("house", "gryffindor")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.house.includes("gryffindor") 
                    ? "bg-gryffindor-primary text-white" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Gryffindor
              </button>
              <button
                onClick={() => toggleFilter("house", "slytherin")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.house.includes("slytherin") 
                    ? "bg-slytherin-primary text-white" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Slytherin
              </button>
              <button
                onClick={() => toggleFilter("house", "ravenclaw")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.house.includes("ravenclaw") 
                    ? "bg-ravenclaw-primary text-white" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Ravenclaw
              </button>
              <button
                onClick={() => toggleFilter("house", "hufflepuff")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.house.includes("hufflepuff") 
                    ? "bg-hufflepuff-primary text-black" 
                    : "bg-muted hover:bg-muted-foreground/10"
                }`}
              >
                Hufflepuff
              </button>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-xs text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" /> Clear filters
              </button>
            )}
          </div>
        </div>
        
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredClasses.map(classItem => (
              <ClassCard
                key={classItem.id}
                title={classItem.title}
                description={classItem.description}
                professor={classItem.professor}
                level={classItem.level}
                topics={classItem.topics}
                house={classItem.house}
                onClick={() => handleClassSelect(classItem)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No classes found</h3>
            <p className="text-foreground/70 mb-6">
              We couldn't find any classes matching your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;
