
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
          exercise: "Choose a common magical ability and analyze three unintended consequences it might have on society, technology, or the environment if it were widely available."
        }
      ],
      conclusion: "The most compelling magical systems feel like discovering something that already exists rather than inventing something new. As you develop your system's logic, remember that the goal isn't scientific rigor but narrative satisfaction—rules that create interesting problems and solutions for your characters while feeling consistent within the world you've created."
    }
  },
  {
    id: "history-of-spells",
    title: "Studying Ancient Spellcraft",
    description: "Trace the evolution of magical practices through history.",
    professor: "Professor Antiquis",
    level: "Advanced",
    topics: ["History", "Etymology", "Comparative Magic", "Artifacts"],
    house: "ravenclaw",
    content: {
      introduction: "Welcome to Studying Ancient Spellcraft! The magic we practice today has deep historical roots. In this advanced class, we'll examine how magical techniques and theories have evolved across different cultures and time periods, revealing the rich tapestry of tradition that informs contemporary magical practice.",
      lessons: [
        {
          title: "The Etymology of Incantations",
          content: "Spell language reveals historical layers of magical development. Many incantations contain fragments of ancient languages, reflecting the cultures that developed them. The pronunciation, rhythm, and even directionality of magical words often preserve elements of their original magical contexts, even when practitioners no longer understand their linguistic origins.",
          exercise: "Research the possible etymological origins of a famous fictional spell, or create a new spell with deliberately layered linguistic elements from at least two different historical or cultural sources."
        },
        {
          title: "Lost Magical Traditions",
          content: "Throughout history, entire systems of magic have risen, flourished, and disappeared. Some were suppressed by conquering cultures or religious changes, others lost when their practitioners failed to train a new generation, and still others deliberately hidden from those deemed unworthy. These lost traditions often survive in fragments that can be rediscovered and incorporated into new magical practices.",
          exercise: "Design a magical tradition that has been lost to history, explaining its core principles, distinctive techniques, and the historical circumstances of its disappearance. Then suggest what traces of it might still exist in the present."
        },
        {
          title: "Magical Archaeology",
          content: "Physical artifacts provide our most direct connection to historical magic. Wands, amulets, inscribed tablets, illustrated grimoires, and enchanted objects reveal what past practitioners valued and how they channeled magical forces. Studying these artifacts requires interdisciplinary skills—understanding both the physical techniques of their creation and the magical principles they embody.",
          exercise: "Describe a significant magical artifact discovered by archaeologists, including its physical characteristics, original purpose, the cultural context of its creation, and what it reveals about historical magical practices."
        }
      ],
      conclusion: "The study of historical magic isn't merely academic—it's a rich source of inspiration and practical knowledge for contemporary practitioners. As you incorporate historical elements into your own magical writing, remember that the most compelling fictional magic often has roots in real human traditions, beliefs, and practices spanning centuries of our shared past."
    }
  },
  
  // HUFFLEPUFF CLASSES (5)
  {
    id: "magical-creatures",
    title: "Magical Creature Care",
    description: "Learn how to thoughtfully incorporate fantastic beasts into your magical writing.",
    professor: "Magizoologist Beastfriend",
    level: "Beginner",
    topics: ["Animal Behavior", "Ecology", "Relationships", "Worldbuilding"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Magical Creature Care! Fantastic beasts have always captured our imagination, from ancient mythological beings to modern magical inventions. In this class, we'll explore how to create and write about magical creatures in ways that feel authentic, ecologically sound, and narratively compelling.",
      lessons: [
        {
          title: "Creature Biology and Behavior",
          content: "The most memorable magical creatures feel like real animals, not just plot devices. Consider their evolutionary history, physical adaptations, social structures, and behaviors. What do they eat? How do they reproduce? What are their natural habitats? Do they migrate or hibernate? These biological details make your creatures feel alive and integrated into your world.",
          exercise: "Design a magical creature, focusing on its biology and behavior. Include at least three adaptations that help it survive in its environment, and explain how its magical abilities would have evolved."
        },
        {
          title: "Human-Creature Relationships",
          content: "How humans and magical creatures interact reveals much about both species and your world's values. Are creatures respected as intelligent beings with rights, exploited as resources, feared as dangers, or some complex combination? Consider varied relationships—wild creatures, domesticated animals, working partners, familiar bonds, and sentient beings with their own societies.",
          exercise: "Choose a magical creature and describe three different cultural attitudes toward it in your world, explaining how these attitudes affect how different human communities interact with the creature."
        },
        {
          title: "Creatures in Your Magical Ecosystem",
          content: "No creature exists in isolation. Consider how your magical beings fit into broader ecosystems. What do they eat and what eats them? How do their magical abilities affect plants, other animals, and environmental conditions? These connections create a web of relationships that can generate rich story possibilities beyond simple encounters.",
          exercise: "Map the ecological relationships of one magical creature, identifying at least three other species (magical or mundane) that it interacts with, and how its magical abilities influence these relationships."
        }
      ],
      conclusion: "The most compelling magical creatures transcend being mere monsters to defeat or tools to use—they become living beings that enrich your magical world. As you create and write about fantastic beasts, remember that the most memorable creatures feel simultaneously magical and natural, with both otherworldly qualities and recognizable animal authenticity."
    }
  },
  {
    id: "magical-healing",
    title: "The Art of Magical Healing",
    description: "Explore themes of restoration, recovery, and renewal in magical narratives.",
    professor: "Healer Mendwell",
    level: "Intermediate",
    topics: ["Recovery Arcs", "Balance", "Physical/Emotional Healing", "Limitations"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Art of Magical Healing! Healing magic offers rich narrative possibilities beyond simply 'fixing' injuries. In this class, we'll explore how healing—both physical and emotional—can drive character development, create ethical dilemmas, and add depth to your magical worldbuilding.",
      lessons: [
        {
          title: "The Limits of Magical Medicine",
          content: "Compelling healing magic needs boundaries. Consider: What conditions can magic heal easily, which require extensive treatment, and which resist magical healing entirely? Is healing instantaneous or a process? Does it require special knowledge, ingredients, or innate talents? These limitations create narrative tension and prevent healing from becoming a plot-destroying convenience.",
          exercise: "Design a magical healing system with clear capabilities and limitations, explaining the principles behind what can and cannot be magically healed in your world."
        },
        {
          title: "Healing Body and Spirit",
          content: "The most interesting magical healing often addresses both physical and emotional wounds. Consider how healing magic might interact with grief, trauma, addiction, or other psychological challenges. Does emotional healing require different techniques than physical healing? Can magic heal the mind without the patient's participation or willingness to change?",
          exercise: "Create a character dealing with both physical and emotional wounds, and outline a magical healing journey that addresses both aspects of their recovery."
        },
        {
          title: "The Healer's Journey",
          content: "Characters with healing abilities face unique challenges and ethical dilemmas. The power to ease suffering brings great responsibility, potential for burnout, difficult triage decisions, and questions about consent and natural processes. Healers must often navigate being needed by everyone while maintaining their own well-being.",
          exercise: "Develop a healer character facing an ethical dilemma related to their magical abilities—perhaps a situation where healing one person might harm another, or where their powers could be used in ways that contradict their values."
        }
      ],
      conclusion: "Healing narratives offer powerful arcs of transformation, hope, and renewal. As you incorporate magical healing into your stories, remember that the most satisfying healing isn't about erasing wounds completely, but about the growth that comes through recovery and the meaning we find in both our scars and our capacity to help others heal."
    }
  },
  {
    id: "magical-botany",
    title: "Magical Botany",
    description: "Cultivate knowledge of magical plants and their narrative applications.",
    professor: "Master Greenthumb",
    level: "Beginner",
    topics: ["Plant Magic", "Potions", "Settings", "Symbolism"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Magical Botany! The plant world offers endless magical possibilities beyond simple potion ingredients. In this class, we'll explore how magical flora can enhance your worldbuilding, drive plots, reveal character, and create atmospheric settings rich with symbolic meaning.",
      lessons: [
        {
          title: "Designing Magical Plants",
          content: "Creating believable magical plants requires balancing the familiar and the fantastic. Start with recognizable botanical elements—root systems, growth patterns, reproduction methods—then add magical properties that feel like natural extensions of the plant's nature. A defensive plant might develop magical thorns, while a plant that attracts pollinators might emit enchanting fragrances.",
          exercise: "Design a magical plant with both mundane and magical properties, explaining its life cycle, habitat requirements, and the magical effects it produces."
        },
        {
          title: "Gardens, Forests, and Green Spaces",
          content: "Plant-dominated settings create distinctive magical atmospheres. Consider how magical plants would shape environments—perhaps a forest where the trees communicate, a garden where emotions affect growth patterns, or a greenhouse containing dangerous but valuable specimens. These settings can become characters in themselves, with their own moods and influences.",
          exercise: "Describe a magical green space where plants play a central role, focusing on sensory details and how the magical flora creates a unique atmosphere or affects visitors."
        },
        {
          title: "The Language of Magical Plants",
          content: "Throughout literary and cultural history, plants have carried symbolic meanings. Roses represent love, willows melancholy, oaks strength. Magical plants can draw on these traditions while establishing new symbolic associations specific to your world. These botanical symbols can communicate themes subtly through setting and character interactions.",
          exercise: "Choose three plants with traditional symbolic meanings and reimagine them as magical species that amplify or transform these symbolic associations in interesting ways."
        }
      ],
      conclusion: "Magical plants offer a wonderful balance of practicality and wonder, simultaneously rooted in the earth and reaching toward the magical unknown. As you incorporate botanical magic into your writing, remember that the plant world's cycles of growth, dormancy, and renewal provide powerful metaphors for character journeys and narrative arcs."
    }
  },
  {
    id: "magical-communities",
    title: "Creating Magical Communities",
    description: "Design authentic, supportive networks in magical worlds.",
    professor: "Elder Fellowheart",
    level: "Intermediate",
    topics: ["Social Structures", "Traditions", "Belonging", "Conflict Resolution"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Creating Magical Communities! Behind many great magical narratives lie rich, believable communities that provide belonging, tradition, conflict, and growth opportunities. In this class, we'll explore how to craft magical communities that feel like places readers would want to visit—or even live in themselves.",
      lessons: [
        {
          title: "Foundations of Magical Society",
          content: "Strong communities are built on shared elements: values (what matters most), practices (daily and ceremonial activities), histories (triumphs and challenges), and spaces (physical locations where community happens). These foundations give members identity and purpose, while creating natural opportunities for both solidarity and tension in your narratives.",
          exercise: "Design a magical community by identifying its core values, three important practices or traditions, a significant historical event that shaped it, and its primary gathering place."
        },
        {
          title: "Belonging and Exclusion",
          content: "Communities define themselves partly by who belongs and who doesn't. Consider how people join your magical community—by birth, invitation, proving themselves, or personal choice? What initiations or rites of passage mark full membership? These boundaries create compelling narrative situations as characters seek acceptance, challenge exclusions, or move between different communities.",
          exercise: "Create a rite of passage for your magical community that reveals its values and tests qualities it considers important, then write about how different character types might experience this ritual."
        },
        {
          title: "Community Challenges and Conflict Resolution",
          content: "Even the most harmonious communities face challenges: resource limitations, external threats, internal disagreements, or generational change. How communities address these challenges reveals their true character. Does your magical society prioritize consensus, defer to authority, encourage debate, or have magical methods of conflict resolution?",
          exercise: "Present your magical community with a significant challenge (internal or external), and outline how its members would work together—or against each other—to address this situation."
        }
      ],
      conclusion: "The most memorable magical communities balance idealism with realism—they offer genuine belonging and support while acknowledging the complexities of human relationships. As you develop communities for your magical worlds, remember that readers are drawn to places that feel both aspirational and authentic, where they can imagine both the comfort of belonging and the rich dramatic possibilities of community life."
    }
  },
  {
    id: "magical-food",
    title: "Culinary Magic",
    description: "Explore the rich narrative potential of magical food and feasting.",
    professor: "Chef Spellstirrer",
    level: "Beginner",
    topics: ["Food Magic", "Celebrations", "Worldbuilding", "Sensory Writing"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to Culinary Magic! Food is far more than mere sustenance—it's culture, memory, connection, and identity. In this class, we'll explore how magical food and drink can enhance your worldbuilding, develop character relationships, and create sensory-rich scenes that readers can almost taste.",
      lessons: [
        {
          title: "Magical Ingredients and Preparations",
          content: "Magical cuisine begins with special ingredients and preparation methods. Consider foods with inherent magical properties, ingredients that must be harvested under specific conditions, or cooking techniques that activate magical potential. These culinary elements can connect to your broader magic system while offering specific sensory experiences and effects.",
          exercise: "Create three magical ingredients available in your world, describing their appearance, taste, magical properties, and any special requirements for their cultivation, harvesting, or preparation."
        },
        {
          title: "The Social Magic of Feasting",
          content: "Shared meals build community and reveal character. Magical feasts can strengthen bonds, mark important transitions, heal rifts, or serve as settings for crucial conversations. Consider your world's food traditions—who prepares food, how it's served, what rituals surround eating, and how magical elements enhance these communal experiences.",
          exercise: "Design a magical feast for an important occasion in your world, describing the setting, participants, special dishes served, and how magical elements enhance the social significance of the gathering."
        },
        {
          title: "Writing Food Magic",
          content: "Food scenes engage all five senses, creating immersive reading experiences. Focus on specific sensory details—the vibrant colors of magical fruits, the aromatic steam from a potion-infused stew, the surprising texture of enchanted bread, the bell-like sound of magical wine being poured, or the lingering effects of a spell-enhanced flavor.",
          exercise: "Write a paragraph describing a character experiencing a magical food or drink, focusing on sensory details and the emotional or magical effects of the consumption."
        }
      ],
      conclusion: "Food and drink scenes offer moments of warmth, pleasure, and connection amid magical adventures. As you incorporate culinary magic into your writing, remember that food carries deep emotional associations for readers, making it a powerful tool for creating memorable characters, settings, and moments that readers can practically taste."
    }
  }
];

// Define the Classes component
const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>(classes);

  // Apply filters whenever search term, house, or level changes
  useEffect(() => {
    let filtered = classes;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          c.professor.toLowerCase().includes(term) ||
          c.topics.some((topic) => topic.toLowerCase().includes(term))
      );
    }
    
    // Filter by house
    if (selectedHouse) {
      filtered = filtered.filter((c) => c.house === selectedHouse);
    }
    
    // Filter by level
    if (selectedLevel) {
      filtered = filtered.filter((c) => c.level === selectedLevel);
    }
    
    setFilteredClasses(filtered);
  }, [searchTerm, selectedHouse, selectedLevel]);

  // Handle clicking a class card
  const handleClassClick = (classData: Class) => {
    // For now, just show a toast. In the future, this could navigate to a class detail page.
    toast(`You selected the class: ${classData.title}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedHouse(null);
    setSelectedLevel(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Magical Writing Classes</h1>
      
      {/* Filters section */}
      <div className="bg-midnight-medium/60 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-midnight-dark text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-white" />
              </button>
            )}
          </div>
          
          {/* House filter */}
          <div className="flex-shrink-0">
            <select
              value={selectedHouse || ""}
              onChange={(e) => setSelectedHouse(e.target.value || null)}
              className="w-full md:w-40 px-4 py-2 bg-midnight-dark text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Houses</option>
              <option value="gryffindor">Gryffindor</option>
              <option value="slytherin">Slytherin</option>
              <option value="ravenclaw">Ravenclaw</option>
              <option value="hufflepuff">Hufflepuff</option>
            </select>
          </div>
          
          {/* Level filter */}
          <div className="flex-shrink-0">
            <select
              value={selectedLevel || ""}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="w-full md:w-40 px-4 py-2 bg-midnight-dark text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          {/* Clear filters button */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-midnight-dark text-white rounded-md border border-white/10 hover:bg-midnight-light"
          >
            Clear Filters
          </button>
        </div>
        
        {/* Results count */}
        <div className="text-sm text-white">
          <span className="font-medium">{filteredClasses.length}</span> 
          {filteredClasses.length === 1 ? " class" : " classes"} found
          {(searchTerm || selectedHouse || selectedLevel) && " matching your filters"}
        </div>
      </div>
      
      {/* Classes grid */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classData) => (
            <ClassCard
              key={classData.id}
              title={classData.title}
              description={classData.description}
              professor={classData.professor}
              level={classData.level}
              topics={classData.topics}
              house={classData.house}
              onClick={() => handleClassClick(classData)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-midnight-medium/60 p-8 rounded-lg text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-white mb-2">No Classes Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters to find what you're looking for.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Classes;
