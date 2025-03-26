
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
  // GRYFFINDOR CLASSES (5)
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
  },
  {
    id: "battle-scenes",
    title: "Writing Magical Battle Scenes",
    description: "Learn to craft epic confrontations between magical forces.",
    professor: "Professor Duelwright",
    level: "Advanced",
    topics: ["Action", "Pacing", "Choreography", "Stakes"],
    house: "gryffindor",
    content: {
      introduction: "Welcome to Writing Magical Battle Scenes! In this advanced class, we'll explore how to craft magical confrontations that are not merely spectacles of power, but meaningful moments that reveal character, advance plot, and raise the stakes of your story.",
      lessons: [
        {
          title: "Beyond Flashy Spells",
          content: "Magical battles are about more than impressive displays of power. The most compelling confrontations reveal character through the choices made under pressure. Does your protagonist rely on raw power or clever strategy? Do they fight to win at all costs or show mercy? These choices define your characters more powerfully than pages of description.",
          exercise: "Draft a short magical battle scene where your protagonist must choose between winning through a morally questionable spell or potentially losing while maintaining their principles."
        },
        {
          title: "Choreographing Magic",
          content: "Clear choreography helps readers follow the action. Consider the environment, the positions of combatants, and how magic affects both. Vary your sentence structures—use short, punchy sentences for immediate actions and longer sentences for developing tensions or shifts in momentum. Create a rhythm that matches the pace of the battle.",
          exercise: "Rewrite a battle scene, incorporating environmental elements that at least two combatants use to their advantage."
        },
        {
          title: "Raising the Stakes",
          content: "Great battle scenes have escalating stakes beyond the immediate physical danger. What happens if your protagonist loses? What will they sacrifice by winning? The external battle should mirror an internal conflict, forcing characters to confront their deepest fears, prejudices, or unresolved issues.",
          exercise: "Outline a magical battle where the protagonist must sacrifice something personally valuable in order to achieve victory."
        }
      ],
      conclusion: "The best magical battle scenes are never just about who wins—they're transformative moments where characters are pushed to their limits, revelations occur, and the story irrevocably changes. As you craft your battles, remember that the emotional and thematic impact will linger with readers far longer than the most spectacular magical effects."
    }
  },
  {
    id: "courage-narrative",
    title: "Courage in Magical Narratives",
    description: "Explore how bravery shapes memorable magical characters and stories.",
    professor: "Dame Lionheart",
    level: "Beginner",
    topics: ["Character Development", "Themes", "Moral Choices", "Growth"],
    house: "gryffindor",
    content: {
      introduction: "Welcome to Courage in Magical Narratives! Courage isn't just charging into danger—it's a complex virtue that takes many forms in magical storytelling. In this class, we'll explore how different types of courage can drive your story and develop your characters in meaningful ways.",
      lessons: [
        {
          title: "Beyond Battlefield Bravery",
          content: "Courage takes many forms—physical bravery is just one. Moral courage (standing up for what's right despite consequences), intellectual courage (pursuing truth even when uncomfortable), social courage (defending others at personal cost), and emotional courage (facing inner demons) are all powerful forms of bravery to explore in your magical characters.",
          exercise: "Create a character profile focusing on what type of courage comes naturally to them and what type they struggle with most."
        },
        {
          title: "The Courage to be Imperfect",
          content: "Some of the most compelling magical characters show courage not through flawless heroism, but through persistence despite failure, fear, and doubt. Allowing your characters to fail, retreat, or even break down before finding their courage creates a more authentic and relatable heroism than unfailing bravery.",
          exercise: "Write a scene where your protagonist fails at something important, experiences fear or shame, and then finds the courage to try again in a different way."
        },
        {
          title: "Courage as Transformation",
          content: "Courage often serves as a catalyst for character transformation. When characters act courageously, they discover truths about themselves, develop new abilities, or break free from limiting beliefs. These moments of courage should change both the character and how others perceive them.",
          exercise: "Outline a pivotal moment where an act of courage fundamentally changes how your character views themselves or how others view them."
        }
      ],
      conclusion: "The most inspiring magical stories don't suggest that heroes are without fear—they show how characters find the strength to act despite their fears. As you craft your own magical narratives, remember that courage is most compelling when it costs something, when it's a choice rather than a superpower, and when it reflects the unique strengths and vulnerabilities of your individual characters."
    }
  },
  {
    id: "adventure-story",
    title: "Crafting Magical Adventures",
    description: "Design compelling quests and journeys in magical settings.",
    professor: "Master Pathfinder",
    level: "Intermediate",
    topics: ["World Building", "Plot Structure", "Tension", "Resolution"],
    house: "gryffindor",
    content: {
      introduction: "Welcome to Crafting Magical Adventures! Adventure lies at the heart of many magical narratives—whether it's a quest for a powerful artifact, a journey through dangerous terrains, or a mission to save someone in peril. In this class, we'll explore how to design compelling adventures that keep readers eagerly turning pages.",
      lessons: [
        {
          title: "The Call to Adventure",
          content: "Every great magical adventure starts with a disruption to the ordinary world. This call to adventure should be specific and urgent, with clear stakes if the protagonist refuses. Consider unusual ways to present the call—perhaps through a magical message, a prophetic dream, or an unexpected visitor whose very presence changes everything.",
          exercise: "Write three different versions of a call to adventure for your protagonist, ranging from subtle to dramatic, and consider how each would shape the story differently."
        },
        {
          title: "Escalating Challenges",
          content: "The best magical adventures feature a progression of challenges that test different aspects of your characters. Early challenges might be more physical or straightforward, while later ones should test morality, loyalties, or deeply held beliefs. Each challenge should be more difficult than the last, forcing characters to grow and adapt.",
          exercise: "Design a sequence of three escalating challenges for your magical adventure, explaining how each one tests something different about your characters."
        },
        {
          title: "The Return and Transformation",
          content: "After the adventure, characters return changed—with new knowledge, abilities, relationships, or perspectives. This transformation should feel earned through the trials they've endured. Consider how both the individual characters and their relationships have evolved, and how their understanding of magic itself might have deepened.",
          exercise: "Outline the key differences in your protagonist before and after their magical adventure, focusing on internal changes rather than just new abilities or rewards."
        }
      ],
      conclusion: "The most memorable magical adventures are more than a series of exciting incidents—they're transformative journeys that challenge characters to their core and return them changed. As you craft your adventures, remember that every physical journey should mirror an internal one, with the external challenges reflecting the protagonist's fears, flaws, or unresolved issues."
    }
  },
  {
    id: "moral-dilemmas",
    title: "Moral Dilemmas in Magic",
    description: "Explore ethical complexity in stories of magical power.",
    professor: "Philosopher Bravenote",
    level: "Advanced",
    topics: ["Ethics", "Character Development", "Plot Twists", "Themes"],
    house: "gryffindor",
    content: {
      introduction: "Welcome to Moral Dilemmas in Magic! When characters have extraordinary abilities, the ethical questions become equally extraordinary. In this advanced class, we'll explore how moral complexity can deepen your magical narratives and create more compelling characters.",
      lessons: [
        {
          title: "Power and Responsibility",
          content: "Magical abilities create unique ethical responsibilities. Consider questions like: Is it ethical to read minds even to help others? Should dangerous knowledge be restricted? Is using magic to influence others ever justified? These questions become powerful engines for plot and character development when there are no easy answers.",
          exercise: "Create a scenario where your protagonist's magical ability creates an ethical dilemma with no clear 'right' answer, and explore at least two possible choices with different consequences."
        },
        {
          title: "The Price of Magic",
          content: "Meaningful magic should come with costs or limits. These can be physical (exhaustion, pain), psychological (temptation, addiction), ethical (compromising values), or social (isolation, fear from others). When characters must pay a price for magic, their choices about when and how to use it become more significant.",
          exercise: "Design a powerful magical ability with a meaningful cost, and write a scene where a character must decide whether the benefit of using the ability outweighs its price."
        },
        {
          title: "Magical Means and Ends",
          content: "Does the end justify the magical means? This classic ethical question takes on new dimensions when those means involve extraordinary powers. Consider scenarios where characters must decide between expedient magical solutions with problematic implications or harder paths that maintain their integrity.",
          exercise: "Outline a situation where your protagonist could easily solve a problem with magic, but doing so would violate an important principle. Explore their decision-making process."
        }
      ],
      conclusion: "The most thought-provoking magical narratives don't provide simple answers to complex ethical questions—they explore the tensions and tradeoffs inherent in having power. As you integrate moral dilemmas into your stories, remember that characters reveal themselves most clearly through difficult choices, and that ethical complexity encourages readers to engage more deeply with your magical world."
    }
  },
  
  // SLYTHERIN CLASSES (5)
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
    id: "power-dynamics",
    title: "Power Dynamics in Magical Societies",
    description: "Analyze and craft complex social structures in magical worlds.",
    professor: "Lady Serpentina",
    level: "Advanced",
    topics: ["Politics", "Class Structures", "Authority", "Revolution"],
    house: "slytherin",
    content: {
      introduction: "Welcome to Power Dynamics in Magical Societies! In this advanced class, we'll explore how magical abilities inevitably shape social hierarchies, political systems, and power structures. Understanding these dynamics will help you create more nuanced, believable magical worlds with rich potential for conflict and character development.",
      lessons: [
        {
          title: "The Magical Elite",
          content: "In worlds where magical ability exists, how is magical talent distributed? Is it hereditary, random, or tied to other factors? These questions fundamentally shape society. Consider how those with rare or powerful magical abilities might leverage their talents for social, economic, or political advantage, and how non-magical or differently-magical populations might respond.",
          exercise: "Design a magical society with a clear power structure based on magical ability, and identify at least three sources of tension or inequity within this system."
        },
        {
          title: "Magical Law and Governance",
          content: "When individuals can wield extraordinary powers, how does society maintain order? Consider what magical crimes might exist, how they're detected and prosecuted, and who enforces magical law. These systems often reveal the core values and fears of a magical society—what they protect and what they punish tells readers what matters most.",
          exercise: "Create three magical laws for your society, explaining what they prohibit, the penalties for breaking them, and what these laws reveal about what the society values or fears."
        },
        {
          title: "Rebellion and Revolution",
          content: "Every system of power creates resistance. In magical societies, revolutions might come from those without magic fighting for equality, factions with different magical traditions competing for influence, or reformers challenging corrupt magical institutions. These struggles create dynamic settings for characters to navigate complex loyalties and make difficult moral choices.",
          exercise: "Outline a magical resistance movement, identifying what they oppose, what changes they seek, their methods of resistance, and how the establishment responds to their activities."
        }
      ],
      conclusion: "The most compelling magical worlds aren't static—they're dynamic systems where power is constantly negotiated, challenged, and transformed. As you develop your magical societies, remember that power structures shape individual characters through the opportunities they're given, the constraints they face, and the choices they make about whether to uphold the existing order or work to change it."
    }
  },
  {
    id: "magical-ambition",
    title: "Ambition in Magical Narratives",
    description: "Explore how ambition drives characters in magical stories.",
    professor: "Master Goalseeker",
    level: "Intermediate",
    topics: ["Motivation", "Character Development", "Conflict", "Consequences"],
    house: "slytherin",
    content: {
      introduction: "Welcome to Ambition in Magical Narratives! Ambition—the desire to achieve something significant—is one of the most powerful driving forces in magical storytelling. In this class, we'll explore how ambition shapes characters, generates conflict, and creates compelling narrative arcs in magical worlds.",
      lessons: [
        {
          title: "The Many Faces of Ambition",
          content: "Ambition isn't inherently virtuous or villainous—it's a neutral force that takes shape from a character's goals and methods. A character might be ambitious to protect others, discover knowledge, attain power, create beauty, or prove themselves. The nature of their ambition reveals their values, while their methods of pursuit reveal their character.",
          exercise: "Create a character profile centered on their primary ambition, explaining what they seek, why they want it, what they're willing to do to achieve it, and what lines they won't cross."
        },
        {
          title: "The Cost of Greatness",
          content: "Meaningful ambition requires sacrifice. What must your character give up in pursuit of their goals? Time, relationships, moral principles, or pieces of themselves? The most compelling ambitious characters face moments where they must decide if their goal is worth its price, revealing what they truly value most.",
          exercise: "Write a scene where your ambitious character must choose between advancement toward their goal and something else they value highly."
        },
        {
          title: "Transformation Through Striving",
          content: "The pursuit of ambitious goals transforms characters—sometimes in ways they never anticipated. Consider how the journey itself changes your character's understanding of what they're seeking, why they want it, or whether it will truly satisfy them. The most interesting ambitious characters often find that achieving their initial goal isn't the end of their story, but a turning point.",
          exercise: "Outline how your character's ambition evolves through their journey, including a moment when they question, redefine, or transcend their original goal."
        }
      ],
      conclusion: "Ambition creates characters who actively shape their stories rather than merely responding to events. As you develop ambitious characters, remember that their desires should be specific enough to drive concrete actions, significant enough to justify sacrifices, and complex enough to evolve through the course of the narrative. Whether ultimately tragic or triumphant, characters defined by ambition leave an indelible mark on your magical world."
    }
  },
  {
    id: "cunning-strategy",
    title: "Cunning and Strategy in Magic",
    description: "Craft clever plots, twists, and resourceful magical characters.",
    professor: "Dr. Wittinger",
    level: "Intermediate",
    topics: ["Plot Twists", "Foreshadowing", "Intelligence", "Planning"],
    house: "slytherin",
    content: {
      introduction: "Welcome to Cunning and Strategy in Magic! The most memorable magical narratives often feature not just powerful magic, but clever applications of magic. In this class, we'll explore how to create cunning characters, strategic plots, and satisfying twists that showcase intelligence as much as magical ability.",
      lessons: [
        {
          title: "Beyond Brute Force Magic",
          content: "Raw magical power is far less interesting than clever applications of limited magic. Consider how characters might use simple spells in innovative ways, combine magical tools for unexpected effects, or find the precise weakness in seemingly impenetrable magical defenses. These moments of clever problem-solving are often more satisfying than displays of overwhelming power.",
          exercise: "Create a scenario where your character must overcome a powerful magical obstacle using limited magical abilities in a creative way."
        },
        {
          title: "Planning the Perfect Plot Twist",
          content: "Effective plot twists feel both surprising and inevitable—they upend reader expectations while making perfect sense in retrospect. This requires careful foreshadowing that can be reinterpreted after the reveal. Plant clues that seem to support the obvious interpretation while subtly suggesting an alternative that only becomes clear later.",
          exercise: "Design a magical plot twist, identifying at least three clues you would plant earlier in the story—some obvious and some subtle."
        },
        {
          title: "Strategic Character Conflicts",
          content: "When cunning characters clash, the result isn't just a battle of magical power but a battle of wits. Create scenarios where characters must anticipate their opponents' actions, set traps, create contingency plans, or manipulate situations to their advantage. These strategic conflicts reveal character through the choices they make when direct approaches won't work.",
          exercise: "Write a short scene where two magically talented characters engage in a conflict of wits rather than direct magical confrontation."
        }
      ],
      conclusion: "Intelligence and cunning add depth to magical narratives by emphasizing that how magic is used matters as much as how much power a character possesses. As you craft your magical stories, remember that readers take particular delight in clever solutions, carefully constructed reveals, and strategic applications of magic that showcase the mind behind the wand."
    }
  },
  {
    id: "anti-hero",
    title: "Crafting Magical Anti-Heroes",
    description: "Develop complex characters who blur the line between hero and villain.",
    professor: "Professor Graymoral",
    level: "Advanced",
    topics: ["Morality", "Character Development", "Redemption", "Motivation"],
    house: "slytherin",
    content: {
      introduction: "Welcome to Crafting Magical Anti-Heroes! The most fascinating characters often exist in moral gray areas—using questionable methods for noble ends, pursuing selfish goals that inadvertently benefit others, or walking a fine line between redemption and damnation. In this class, we'll explore how to create complex magical anti-heroes that challenge readers' expectations and moral certainties.",
      lessons: [
        {
          title: "Sympathetic Flaws",
          content: "Anti-heroes need flaws significant enough to make them morally ambiguous, but with understandable origins that create sympathy. Perhaps their ruthlessness stems from past betrayal, their manipulation skills developed as childhood survival tactics, or their moral compromises began with good intentions. These explanations don't excuse their actions but make them comprehensible.",
          exercise: "Develop a significant moral flaw for your anti-hero and create a backstory that explains (without justifying) how they developed this trait."
        },
        {
          title: "Redeeming Qualities",
          content: "To remain compelling rather than simply villainous, anti-heroes need genuine virtues alongside their flaws. Perhaps they're unfailingly loyal to the few they care about, have a personal code they never break, or show unexpected compassion in specific situations. These qualities create tension between the reader's disapproval of some actions and appreciation of others.",
          exercise: "Identify two or three redeeming qualities for your anti-hero and design a scene that highlights one of these virtues in action."
        },
        {
          title: "Moral Growth and Setbacks",
          content: "Anti-heroes have complex moral trajectories, rarely moving in a straight line toward redemption or corruption. They make progress and then backslide, learn lessons but struggle to apply them consistently, and face temptations to return to old patterns even as they strive to change. This uneven path creates compelling internal conflict and unpredictable story developments.",
          exercise: "Outline a moral challenge for your anti-hero where they must choose between personal gain and ethical growth, exploring their internal struggle with this decision."
        }
      ],
      conclusion: "The most memorable magical anti-heroes leave readers morally conflicted—understanding their flaws, appreciating their strengths, and uncertain whether to condemn or champion them. As you develop these complex characters, remember that they should make readers think rather than simply feel, questioning their own moral certainties and considering the gray areas that exist between strictly defined notions of heroism and villainy."
    }
  },
  
  // RAVENCLAW CLASSES (5)
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
    id: "magical-theory",
    title: "Magical Theory and Philosophy",
    description: "Explore the deeper questions and philosophical implications of magic.",
    professor: "Professor Ponderous",
    level: "Advanced",
    topics: ["Metaphysics", "Ethics", "Epistemology", "Magical Ontology"],
    house: "ravenclaw",
    content: {
      introduction: "Welcome to Magical Theory and Philosophy! Beyond spells and potions lies a rich field of inquiry about the nature of magic itself. In this advanced class, we'll explore the philosophical questions magic raises about reality, knowledge, ethics, and existence, deepening the intellectual foundations of your magical writing.",
      lessons: [
        {
          title: "The Metaphysics of Magic",
          content: "What is the fundamental nature of magic? Is it an energy, a force, a language, or something else entirely? How does it relate to the physical laws of the universe—does it break them, transcend them, or reveal deeper patterns beneath them? These questions shape how magic functions and feels in your world.",
          exercise: "Develop a metaphysical theory of magic for your world, explaining its fundamental nature and relationship to physical reality. Then, write a short dialogue between two magical theorists with competing views."
        },
        {
          title: "Magical Epistemology",
          content: "How is magical knowledge acquired, verified, and transmitted? Consider different approaches—empirical experimentation, theoretical derivation, intuitive insight, or traditional lore. What counts as evidence in magical research? Who gets to determine what magical knowledge is valid or invalid? These questions shape how magical learning works in your world.",
          exercise: "Design two contrasting magical educational traditions with different epistemological approaches, explaining how they teach magic and what kinds of knowledge each values or discounts."
        },
        {
          title: "The Consciousness Question",
          content: "Does magic require consciousness, or can it exist independently? Can non-conscious entities or objects possess magical properties? What about artificial intelligence or constructs—could they perform magic? And what does magic tell us about the nature of consciousness itself? These questions probe the boundaries between magic, mind, and matter.",
          exercise: "Write a short essay or dialogue exploring whether a magically created being with apparent self-awareness should be considered truly conscious, and what rights or status such a being should have."
        }
      ],
      conclusion: "Philosophical inquiry into magic doesn't just add intellectual depth to your writing—it generates rich possibilities for plot conflicts, character development, and worldbuilding. As you explore these questions, remember that you don't need definitive answers; the tensions between different philosophical approaches to magic can create compelling dynamics in your magical world."
    }
  },
  {
    id: "magical-research",
    title: "Research Methods for Magical Writers",
    description: "Learn how to effectively research historical and cultural elements for magical writing.",
    professor: "Dr. Scrollfinder",
    level: "Intermediate",
    topics: ["Historical Research", "Cultural Accuracy", "Primary Sources", "Integration"],
    house: "ravenclaw",
    content: {
      introduction: "Welcome to Research Methods for Magical Writers! Even when creating fantastical worlds, solid research creates authenticity and depth. In this class, we'll explore how to research historical periods, cultural practices, and mythological systems to enrich your magical writing without being bound by them.",
      lessons: [
        {
          title: "Beyond Wikipedia",
          content: "While general reference sources provide starting points, deeper research requires varied sources. Academic books and journals offer expert knowledge. Primary sources (letters, diaries, artifacts) provide direct connections to historical periods. Interviews with cultural practitioners offer living perspectives. Digital archives and museum collections make these resources more accessible than ever.",
          exercise: "Choose an element for your magical story (a historical period, cultural tradition, or mythological system) and identify five specific research sources beyond general references that you could consult."
        },
        {
          title: "Respectful Cultural Borrowing",
          content: "When drawing inspiration from real cultural traditions—especially those outside your own experience—approach with respect and awareness. Avoid reducing living traditions to exotic backdrop or magical props. Research the context and significance of elements you borrow, consider consulting members of that culture, and be prepared to adapt your approach based on what you learn.",
          exercise: "Select a cultural magical element that interests you, research its actual significance in its original context, and write a paragraph explaining how you might respectfully incorporate it or an inspired version into your work."
        },
        {
          title: "Transforming Research into Magic",
          content: "Research should inform your magic, not constrain it. Once you understand historical or cultural elements, consider how to transform them through speculation, combination, or extrapolation. What if this historical practice had magical effects? What if this mythological being existed in your world? How might this cultural approach to magic evolve in different circumstances?",
          exercise: "Take a well-researched historical practice or belief and develop two different ways it could be transformed into a magical element in your story—one staying close to history and one taking creative liberties."
        }
      ],
      conclusion: "Thorough research doesn't diminish creativity—it fuels it by providing rich material to transform. As you research for your magical writing, remember that your goal isn't perfect historical or cultural accuracy, but rather to create a world that feels authentic and resonant because it's built on real human experiences, beliefs, and practices that you understand and respect."
    }
  },
  {
    id: "magical-logic",
    title: "The Logic of Magic Systems",
    description: "Design consistent, coherent magical frameworks for your stories.",
    professor: "Archmagus Rulesweaver",
    level: "Intermediate",
    topics: ["Consistency", "Limitations", "Consequences", "Integration"],
    house: "ravenclaw",
    content: {
      introduction: "Welcome to The Logic of Magic Systems! Even the most fantastical magic needs internal consistency to be satisfying. In this class, we'll explore how to create magical systems with coherent rules, meaningful limitations, and logical consequences that enhance rather than undermine your storytelling.",
      lessons: [
        {
          title: "The Laws of Magic",
          content: "Every magical system needs governing principles—not necessarily scientific laws, but consistent patterns that readers can understand. Consider fundamental questions: What can magic affect and what can't it touch? Is magic tied to elements, emotions, words, symbols, or something else? Does it require tools, training, or innate talent? These principles become the foundation for all magical occurrences in your world.",
          exercise: "Create three to five fundamental laws or principles that govern how magic works in your world, ensuring they work together as a coherent system."
        },
        {
          title: "Meaningful Limitations",
          content: "Magic without limits eliminates narrative tension—why worry about any problem when magic can solve everything? Effective magical systems have built-in constraints: perhaps magic drains life force, requires rare components, takes significant time to master, or has unpredictable side effects when overused. These limitations create story possibilities rather than restricting them.",
          exercise: "Design three different types of limitations for your magic system, explaining how each would create interesting challenges for characters and generate plot possibilities."
        },
        {
          title: "Unintended Consequences",
          content: "Well-designed magic ripples through your world in logical but sometimes unexpected ways. How would magical healing affect population growth and resource needs? How would magical communication change politics and warfare? How would magical education create new social hierarchies? Thinking through these consequences creates a more believable world and generates rich narrative possibilities.",
          exercise: "Choose one magical ability in your world and trace at least three unintended societal consequences it might have, explaining how people would adapt to or address these effects."
        }
      ],
      conclusion: "The most satisfying magical systems aren't just about spectacle—they're coherent frameworks that feel real because they have consistent rules, meaningful costs, and far-reaching implications. As you develop your own magic systems, remember that limitations often create more interesting stories than unlimited powers, and that exploring the logical consequences of magic can reveal entire dimensions of your world you hadn't previously considered."
    }
  },
  {
    id: "linguistics-magic",
    title: "The Linguistics of Magic",
    description: "Explore how language shapes and defines magical practice and theory.",
    professor: "Professor Lexicontus",
    level: "Advanced",
    topics: ["Magical Languages", "Incantations", "Etymology", "Naming"],
    house: "ravenclaw",
    content: {
      introduction: "Welcome to The Linguistics of Magic! Words have always been central to magical practice—from ancient incantations to modern spell nomenclature. In this advanced class, we'll explore how language shapes magical systems, how magical languages function, and how precision in magical terminology affects both worldbuilding and storytelling.",
      lessons: [
        {
          title: "The Power of Names",
          content: "Throughout magical traditions, names hold special power—knowing something's true name might grant control over it, while hiding one's name provides protection. Consider how naming functions in your magical world: Are there common names and true names? Do certain beings possess unpronounceable names? Is there power in deliberately misnaming something?",
          exercise: "Create a naming convention for one category of magical beings or objects in your world, explaining the linguistic patterns and their significance."
        },
        {
          title: "Constructing Magical Languages",
          content: "Magical languages might be ancient tongues, hidden languages, or speech forms that alter reality when spoken. When developing a magical language, consider its sound patterns, grammatical structure, and how it relates to the magic it produces. Even a few consistent words or phrases can suggest an entire language without requiring you to construct one from scratch.",
          exercise: "Develop five spells or incantations in a magical language of your creation, providing their translations and explaining the patterns or logic behind their construction."
        },
        {
          title: "The Evolution of Magical Terminology",
          content: "Magical vocabulary evolves like any other language—terms become outdated, new words emerge for new discoveries, and different traditions develop specialized jargon. This evolution reflects changing magical practices and cultural attitudes toward magic. Just as modern medicine no longer speaks of 'humors' and 'bile,' magical terminology shifts with understanding.",
          exercise: "Choose a magical concept and create terms for it from three different eras or magical traditions, explaining how the terminology reflects the understanding and attitudes of each context."
        }
      ],
      conclusion: "Language shapes thought, and nowhere is this more evident than in magical systems. The words used to describe magic reflect and influence how practitioners conceptualize and interact with magical forces. As you develop the linguistic aspects of your magical world, remember that language is never static—it evolves, varies between communities, and carries the weight of history and culture in every term and phrase."
    }
  },
  
  // HUFFLEPUFF CLASSES (5)
  {
    id: "natural-magic",
    title: "Natural Magic",
    description: "Explore magic derived from plants, animals, and natural elements.",
    professor: "Professor Rootbranch",
    level: "Beginner",
    topics: ["Herbology", "Animal Magic", "Elements", "Seasons"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Natural Magic! The natural world is brimming with magical potential—from plants with extraordinary properties to weather patterns that respond to magical influence. In this class, we'll explore how to integrate natural elements into your magical writing, creating magic systems that feel organically connected to the environment.",
      lessons: [
        {
          title: "The Magic in Plants",
          content: "Plants have been central to magical traditions across cultures—herbs for healing, trees as sources of wisdom, flowers with emotional influences. Consider how plants in your world might store magical energy, demonstrate magical properties, or serve as conduits for magical working. How might a plant's growing conditions affect its magical qualities?",
          exercise: "Create three magical plants for your world, describing their appearance, properties, growing conditions, and magical uses."
        },
        {
          title: "Creature Magic",
          content: "Animals in magical worlds often possess innate magical abilities, magical body parts used in potions, or special connections to magical forces. Consider which animals in your world have magical qualities and why. Are certain creature types inherently magical, or do individual animals develop magical traits through experience or environment?",
          exercise: "Design a magical creature, explaining its abilities, habitat, relationship with humans, and any special materials it might provide for magical crafting."
        },
        {
          title: "Elemental Connections",
          content: "The classical elements—earth, air, fire, water, and sometimes wood, metal, or spirit—provide a framework for many magical systems. Consider how elemental affinities might manifest in your world. Are some people naturally attuned to certain elements? Do elemental forces have intelligences or personalities? How do the elements interact with each other?",
          exercise: "Outline an elemental magic system, describing the properties and associations of each element and how practitioners might harness their powers."
        }
      ],
      conclusion: "Natural magic grounds fantastical elements in the observable world, creating magic that feels intuitive and connected to cycles and patterns readers recognize. As you incorporate natural magic into your writing, let the rich complexity of nature inspire equally complex magical systems with their own balance, seasons, and interdependencies."
    }
  },
  {
    id: "magical-healing",
    title: "Magical Healing Arts",
    description: "Learn about curative magic and its applications in magical writing.",
    professor: "Healer Menderroot",
    level: "Intermediate",
    topics: ["Restorative Magic", "Magical Ailments", "Mind Healing", "Ethics"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Magical Healing Arts! Healing magic addresses one of humanity's most fundamental needs—restoration from injury and illness. In this class, we'll explore how magical healing might work, what limitations it might have, and how it shapes societies where it exists. We'll also consider the ethical dimensions of magical healing and how it might be integrated into compelling narratives.",
      lessons: [
        {
          title: "Beyond Instant Cures",
          content: "While instant magical healing makes for convenient storytelling, more limited healing magic often creates richer narrative possibilities. Consider different approaches: perhaps healing magic accelerates natural processes but requires time; maybe it transfers injuries rather than eliminating them; or perhaps different types of wounds respond to different treatments. These limitations create space for healing journeys in your stories.",
          exercise: "Design a magical healing system with specific capabilities and limitations, explaining what can and cannot be healed, what the healing process requires, and what side effects might occur."
        },
        {
          title: "Magical Ailments",
          content: "In a world with healing magic, magical maladies provide compelling challenges. These might include curses that resist healing, magical parasites, spiritual afflictions, or conditions caused by magical exposure. Magical ailments often require specific cures tied to their cause or nature, creating quest elements in your stories as characters search for rare ingredients or specialized knowledge.",
          exercise: "Create a magical ailment, describing its symptoms, cause, progression, and the specific magical treatment required to cure it."
        },
        {
          title: "Healing the Mind",
          content: "Magical healing might extend beyond the physical to address psychological and emotional wounds. Consider how such magic might work—perhaps revealing suppressed memories, soothing emotional pain, or rebuilding damaged confidence. Mind healing raises complex ethical questions about consent, identity, and whether removing painful experiences might also remove important growth.",
          exercise: "Describe a form of magical mind healing, explaining its process, benefits, risks, and ethical boundaries practiced by responsible healers."
        }
      ],
      conclusion: "Healing magic touches on our deepest hopes and fears—the desire for restoration, the fear of loss, and questions about what makes us whole. As you incorporate healing magic into your stories, consider both its wondrous possibilities and the ways its limitations and complications can drive your narrative forward and reveal character."
    }
  },
  {
    id: "magical-community",
    title: "Building Magical Communities",
    description: "Craft believable magical societies and cultures.",
    professor: "Elder Harmonius",
    level: "Intermediate",
    topics: ["Social Structures", "Traditions", "Values", "Daily Life"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Building Magical Communities! Behind memorable magical narratives lie communities that feel alive—whether a hidden village of magical practitioners, a school of mystical arts, or an entire magical nation. In this class, we'll explore how to create magical societies with distinctive values, traditions, and social structures that enrich your storytelling.",
      lessons: [
        {
          title: "Values and Virtues",
          content: "Communities are defined by what they collectively value. Some magical societies might prize knowledge above all, while others emphasize harmony with nature, ancestral traditions, or individual magical achievement. These core values shape everything from education systems to justice practices to daily rituals. Consider what virtues are celebrated and what behaviors are discouraged in your magical communities.",
          exercise: "Define the three most important values in a magical community of your creation, and explain how these values manifest in their customs, celebrations, and conflicts."
        },
        {
          title: "Magical Traditions",
          content: "Traditions connect magical communities to their past and perpetuate their values. Consider what rites of passage mark important life transitions in your magical society. How is magical knowledge passed down? What holidays or festivals mark the calendar? What rituals are performed in response to births, deaths, marriages, or coming-of-age? These traditions create depth and continuity.",
          exercise: "Design a significant traditional ceremony or festival for your magical community, explaining its purpose, typical activities, and how it has evolved over time."
        },
        {
          title: "The Mundane in the Magical",
          content: "Even in magical worlds, many aspects of daily life continue—people prepare food, raise children, create art, and engage in commerce. Consider how magic might transform these ordinary activities while leaving their essential nature intact. How does a magical household differ from a non-magical one? How do magical artisans incorporate magic into their crafts? These details make your world feel lived-in.",
          exercise: "Choose one aspect of daily life (food, clothing, transportation, etc.) and describe how it functions in your magical community, focusing on both practical and cultural dimensions."
        }
      ],
      conclusion: "The most compelling magical worlds aren't just collections of cool magical concepts—they're communities of people with shared histories, values, and ways of life. As you develop your magical societies, remember that the interplay between tradition and change, unity and conflict, creates the rich social texture that makes fictional worlds feel real and worth exploring."
    }
  },
  {
    id: "magical-nurturing",
    title: "Nurturing Young Magic Users",
    description: "Explore how magical education and mentorship shape magical development.",
    professor: "Guardian Kindleheart",
    level: "Beginner",
    topics: ["Magic Education", "Mentorship", "Development", "Safety"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Nurturing Young Magic Users! How young magical practitioners are taught and guided shapes not only their abilities but the future of magical society itself. In this class, we'll explore approaches to magical education, the special challenges of teaching potentially dangerous skills, and the profound impact of mentorship on magical development.",
      lessons: [
        {
          title: "Approaches to Magical Education",
          content: "Different magical communities adopt varied educational philosophies. Some emphasize rigid structure and theoretical foundations before practical application, while others favor apprenticeship or experiential learning. Some might segregate different types of magic into specialized schools, while others teach holistically. These different approaches reflect cultural values and affect what kinds of magic practitioners emerge.",
          exercise: "Design a magical educational system for your world, outlining its structure, teaching methods, curriculum, and underlying educational philosophy."
        },
        {
          title: "The Mentor-Student Bond",
          content: "Beyond formal education, magical mentorship creates powerful dynamics in magical narratives. Mentors provide not just knowledge but guidance, protection, and sometimes flawed wisdom that students must move beyond. Consider what makes compelling magical mentors—their strengths, blindspots, teaching styles, and the ways they challenge their students to grow.",
          exercise: "Create a pair of magical mentor and student characters, describing their personalities, relationship dynamic, what each can learn from the other, and a conflict that tests their bond."
        },
        {
          title: "Managing Magical Mishaps",
          content: "Young or untrained magic users often cause accidental magic through strong emotions or lack of control. How these mishaps are handled—with punishment, compassion, or practical guidance—shapes both characters and magical societies. Consider what safety measures exist in your world to prevent or manage dangerous magical accidents, especially among young practitioners.",
          exercise: "Describe a significant magical accident caused by a young or untrained magic user, and outline how different authority figures or communities might respond to this incident."
        }
      ],
      conclusion: "How a magical society raises its next generation reveals its deepest values, fears, and hopes. As you develop the educational and mentorship aspects of your magical world, remember that these elements provide rich opportunities for character development, intergenerational conflict and cooperation, and exploration of how traditions either perpetuate or evolve through teaching."
    }
  },
  {
    id: "magical-crafting",
    title: "The Art of Magical Crafting",
    description: "Learn to create enchanted objects, potions, and magical artifacts.",
    professor: "Master Artifex",
    level: "Advanced",
    topics: ["Enchantment", "Magical Materials", "Artifact Design", "Magical Tools"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Art of Magical Crafting! Enchanted objects—from wands and amulets to flying carpets and sentient mirrors—populate magical worlds and provide tangible connections to magical forces. In this advanced class, we'll explore how to create compelling magical items, the processes that might create them, and their roles in magical narratives.",
      lessons: [
        {
          title: "Magical Materials",
          content: "Before enchantment begins, the materials themselves often carry magical properties. Consider what substances in your world have innate magical qualities—perhaps wood from trees struck by lightning, metals mined from meteorites, or fibers spun by magical creatures. How these materials are harvested, processed, and combined creates the foundation for magical crafting.",
          exercise: "Create three magical materials for your world, describing their properties, sources, preparation methods, and common uses in magical crafting."
        },
        {
          title: "The Process of Enchantment",
          content: "How are ordinary objects transformed into magical ones? Consider different approaches to enchantment—perhaps lengthy rituals, specific environmental conditions, infusion of magical essences, or encoding of instructions through magical languages. The difficulty, duration, and components of enchantment affect how common magical items are in your world.",
          exercise: "Outline an enchantment process for creating a magical object, detailing the steps involved, materials required, time needed, and potential complications or dangers."
        },
        {
          title: "Artifact Personality",
          content: "The most memorable magical objects often possess distinctive personalities or quirks—perhaps they're temperamental, communicate with users, develop attachments, or behave unpredictably under certain conditions. Consider how magical items in your world might develop characteristics beyond their intended functions, becoming almost characters in their own right.",
          exercise: "Design a magical artifact with a distinctive personality or behavior pattern, explaining its origins, abilities, quirks, and how it interacts with its user(s)."
        }
      ],
      conclusion: "Magical objects bridge the abstract concept of magic and the tangible world of things, making magic something characters can hold, wear, use, and sometimes struggle with. As you develop the crafted elements of your magical world, remember that the most compelling magical items aren't just tools but expressions of their creators' intentions, personalities, and magical understanding—carrying stories within their very creation."
    }
  }
];

// Classes Page Component: display the list of classes and handle selection
const Classes = () => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayContent, setDisplayContent] = useState(false);
  
  // Function to filter classes by house and search query
  const filteredClasses = classes.filter(c => {
    const matchesHouse = selectedHouse ? c.house === selectedHouse : true;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesHouse && matchesSearch;
  });
  
  // Function to handle class selection and display content
  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
    setDisplayContent(true);
    // Scroll to top when selecting a class
    window.scrollTo(0, 0);
    toast.success(`Now viewing: ${classItem.title}`);
  };
  
  // Function to return to class list
  const handleBackToClasses = () => {
    setDisplayContent(false);
    setSelectedClass(null);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {!displayContent ? (
        // Class selection view
        <>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Magical Writing Classes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of classes to enhance your magical writing skills. 
              Filter by house or search for specific topics.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* House filter buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-full ${selectedHouse === null ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setSelectedHouse(null)}
              >
                All Houses
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${selectedHouse === 'gryffindor' ? 'bg-gryffindor-primary text-white' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setSelectedHouse('gryffindor')}
              >
                Gryffindor
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${selectedHouse === 'slytherin' ? 'bg-slytherin-primary text-white' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setSelectedHouse('slytherin')}
              >
                Slytherin
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${selectedHouse === 'ravenclaw' ? 'bg-ravenclaw-primary text-white' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setSelectedHouse('ravenclaw')}
              >
                Ravenclaw
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${selectedHouse === 'hufflepuff' ? 'bg-hufflepuff-primary text-white' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setSelectedHouse('hufflepuff')}
              >
                Hufflepuff
              </button>
            </div>
            
            {/* Search input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search classes, topics, or professors..."
                className="pl-10 pr-10 py-2 w-full border rounded-md bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>
          
          {/* Display number of classes found */}
          <p className="mb-4 text-muted-foreground">
            Found {filteredClasses.length} class{filteredClasses.length !== 1 ? 'es' : ''}
          </p>
          
          {/* Class cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem) => (
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
          
          {/* No results message */}
          {filteredClasses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">No classes match your search criteria.</p>
              <button 
                className="mt-4 text-primary hover:underline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedHouse(null);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      ) : (
        // Class content view
        selectedClass && (
          <div className="max-w-4xl mx-auto">
            <button 
              className="flex items-center text-primary hover:underline mb-6"
              onClick={handleBackToClasses}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Classes
            </button>
            
            {/* Class header */}
            <div className={`mb-8 p-6 rounded-lg ${
              selectedClass.house 
                ? `bg-${selectedClass.house}-primary/10 border border-${selectedClass.house}-primary/20` 
                : 'bg-muted'
            }`}>
              <h1 className={`text-3xl font-bold mb-3 ${
                selectedClass.house 
                  ? `text-${selectedClass.house}-primary` 
                  : 'text-foreground'
              }`}>
                {selectedClass.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Professor:</span>
                  <span className="text-foreground">{selectedClass.professor}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium mr-2">Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedClass.level === "Beginner" ? "bg-green-100 text-green-700" :
                    selectedClass.level === "Intermediate" ? "bg-blue-100 text-blue-700" :
                    "bg-purple-100 text-purple-700"
                  }`}>
                    {selectedClass.level}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="font-medium block mb-2">Topics covered:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.topics.map((topic, index) => (
                    <span 
                      key={index} 
                      className={`px-2.5 py-1 rounded-full text-xs ${
                        selectedClass.house 
                          ? `bg-${selectedClass.house}-primary/20 text-${selectedClass.house}-primary` 
                          : 'bg-muted text-foreground'
                      }`}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-foreground">{selectedClass.description}</p>
            </div>
            
            {/* Class content */}
            <div className="prose prose-lg max-w-none text-black">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>{selectedClass.content.introduction}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
                
                {selectedClass.content.lessons.map((lesson, index) => (
                  <div key={index} className="mb-8 border-l-4 pl-6 border-muted-foreground/30">
                    <h3 className="text-xl font-semibold mb-3">{lesson.title}</h3>
                    <p className="mb-4">{lesson.content}</p>
                    
                    {lesson.exercise && (
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-semibold mb-2">Exercise</h4>
                        <p>{lesson.exercise}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                <p>{selectedClass.content.conclusion}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Classes;
