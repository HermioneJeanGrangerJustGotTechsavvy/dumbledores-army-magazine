import { useState, useEffect } from "react";
import { Search, X, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ClassCard from "@/components/ClassCard";

export type Class = {
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

export const classes: Class[] = [
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
  
  // HUFFLEPUFF CLASSES (5)
  {
    id: "magic-of-the-forest",
    title: "The Magic of the Forest",
    description: "Explore the magical creatures and magic of the forest.",
    professor: "Professor Greenleaf",
    level: "Beginner",
    topics: ["Nature", "Creatures", "Magic"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Magic of the Forest! In this class, we'll explore the magical creatures and magic of the forest, from the ancient to the mythical.",
      lessons: [
        {
          title: "Forest Creatures",
          content: "The forest is home to a wide variety of magical creatures. From the gentle pixies to the fierce centaurs, each has its own unique abilities and magic.",
          exercise: "Write a short story about a magical creature from the forest."
        },
        {
          title: "Forest Magic",
          content: "The forest is a rich source of magical energy. Consider how you might use this energy to create spells or potions.",
          exercise: "Create a spell or potion that uses the magic of the forest."
        },
        {
          title: "Forest Lore",
          content: "The forest is full of stories and legends. Consider how you might incorporate these into your magical stories.",
          exercise: "Write a short story about a magical legend from the forest."
        }
      ],
      conclusion: "The magic of the forest is a powerful tool for creating magical stories. As you explore this magical world, remember to draw inspiration from the creatures and magic of the forest."
    }
  },
  {
    id: "magic-of-the-sea",
    title: "The Magic of the Sea",
    description: "Explore the magical creatures and magic of the sea.",
    professor: "Professor Bluebeard",
    level: "Intermediate",
    topics: ["Nature", "Creatures", "Magic"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Magic of the Sea! In this class, we'll explore the magical creatures and magic of the sea, from the ancient to the mythical.",
      lessons: [
        {
          title: "Sea Creatures",
          content: "The sea is home to a wide variety of magical creatures. From the gentle mermaids to the fierce krakens, each has its own unique abilities and magic.",
          exercise: "Write a short story about a magical creature from the sea."
        },
        {
          title: "Sea Magic",
          content: "The sea is a rich source of magical energy. Consider how you might use this energy to create spells or potions.",
          exercise: "Create a spell or potion that uses the magic of the sea."
        },
        {
          title: "Sea Lore",
          content: "The sea is full of stories and legends. Consider how you might incorporate these into your magical stories.",
          exercise: "Write a short story about a magical legend from the sea."
        }
      ],
      conclusion: "The magic of the sea is a powerful tool for creating magical stories. As you explore this magical world, remember to draw inspiration from the creatures and magic of the sea."
    }
  },
  {
    id: "magic-of-the-air",
    title: "The Magic of the Air",
    description: "Explore the magical creatures and magic of the air.",
    professor: "Professor Windweaver",
    level: "Advanced",
    topics: ["Nature", "Creatures", "Magic"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Magic of the Air! In this class, we'll explore the magical creatures and magic of the air, from the ancient to the mythical.",
      lessons: [
        {
          title: "Air Creatures",
          content: "The air is home to a wide variety of magical creatures. From the gentle fairies to the fierce dragons, each has its own unique abilities and magic.",
          exercise: "Write a short story about a magical creature from the air."
        },
        {
          title: "Air Magic",
          content: "The air is a rich source of magical energy. Consider how you might use this energy to create spells or potions.",
          exercise: "Create a spell or potion that uses the magic of the air."
        },
        {
          title: "Air Lore",
          content: "The air is full of stories and legends. Consider how you might incorporate these into your magical stories.",
          exercise: "Write a short story about a magical legend from the air."
        }
      ],
      conclusion: "The magic of the air is a powerful tool for creating magical stories. As you explore this magical world, remember to draw inspiration from the creatures and magic of the air."
    }
  },
  {
    id: "magic-of-the-earth",
    title: "The Magic of the Earth",
    description: "Explore the magical creatures and magic of the earth.",
    professor: "Professor Earthweaver",
    level: "Beginner",
    topics: ["Nature", "Creatures", "Magic"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Magic of the Earth! In this class, we'll explore the magical creatures and magic of the earth, from the ancient to the mythical.",
      lessons: [
        {
          title: "Earth Creatures",
          content: "The earth is home to a wide variety of magical creatures. From the gentle earth spirits to the fierce dragons, each has its own unique abilities and magic.",
          exercise: "Write a short story about a magical creature from the earth."
        },
        {
          title: "Earth Magic",
          content: "The earth is a rich source of magical energy. Consider how you might use this energy to create spells or potions.",
          exercise: "Create a spell or potion that uses the magic of the earth."
        },
        {
          title: "Earth Lore",
          content: "The earth is full of stories and legends. Consider how you might incorporate these into your magical stories.",
          exercise: "Write a short story about a magical legend from the earth."
        }
      ],
      conclusion: "The magic of the earth is a powerful tool for creating magical stories. As you explore this magical world, remember to draw inspiration from the creatures and magic of the earth."
    }
  },
  {
    id: "magic-of-the-stars",
    title: "The Magic of the Stars",
    description: "Explore the magical creatures and magic of the stars.",
    professor: "Professor Starweaver",
    level: "Advanced",
    topics: ["Nature", "Creatures", "Magic"],
    house: "hufflepuff",
    content: {
      introduction: "Welcome to The Magic of the Stars! In this class, we'll explore the magical creatures and magic of the stars, from the ancient to the mythical.",
      lessons: [
        {
          title: "Star Creatures",
          content: "The stars are home to a wide variety of magical creatures. From the gentle stars to the fierce dragons, each has its own unique abilities and magic.",
          exercise: "Write a short story about a magical creature from the stars."
        },
        {
          title: "Star Magic",
          content: "The stars are a rich source of magical energy. Consider how you might use this energy to create spells or potions.",
          exercise: "Create a spell or potion that uses the magic of the stars."
        },
        {
          title: "Star Lore",
          content: "The stars are full of stories and legends. Consider how you might incorporate these into your magical stories.",
          exercise: "Write a short story about a magical legend from the stars."
        }
      ],
      conclusion: "The magic of the stars is a powerful tool for creating magical stories. As you explore this magical world, remember to draw inspiration from the creatures and magic of the stars."
    }
  }
];

const Classes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredClasses = classes.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesHouse = selectedHouse ? c.house === selectedHouse : true;
    const matchesLevel = selectedLevel ? c.level === selectedLevel : true;
    
    return matchesSearch && matchesHouse && matchesLevel;
  });

  const clearFilters = () => {
    setSelectedHouse(null);
    setSelectedLevel(null);
    setSearchTerm("");
  };

  const handleClassClick = (classId: string) => {
    navigate(`/classes/${classId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Magical Writing Classes</h1>
        <p className="text-xl text-white/80 mt-2">
          Explore our curriculum and master the art of magical storytelling
        </p>
      </div>

      {/* Search and filters */}
      <div className="bg-midnight-medium/60 rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search classes, topics, professors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-midnight-light/60 text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedHouse || ""}
              onChange={(e) => setSelectedHouse(e.target.value || null)}
              className="bg-midnight-light/60 text-white rounded-md border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Houses</option>
              <option value="gryffindor">Gryffindor</option>
              <option value="slytherin">Slytherin</option>
              <option value="ravenclaw">Ravenclaw</option>
              <option value="hufflepuff">Hufflepuff</option>
            </select>

            <select
              value={selectedLevel || ""}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="bg-midnight-light/60 text-white rounded-md border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {(selectedHouse || selectedLevel || searchTerm) && (
              <button
                onClick={clearFilters}
                className="flex items-center bg-midnight-light/60 text-white rounded-md border border-white/10 px-3 py-2 hover:bg-midnight-light/80"
              >
                <X size={16} className="mr-1" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="text-white/80 text-sm">
          {filteredClasses.length === 0 ? (
            <p>No classes found. Try adjusting your filters.</p>
          ) : (
            <p>Showing {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'}</p>
          )}
        </div>
      </div>

      {/* Classes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <ClassCard 
            key={classItem.id}
            classData={classItem}
            onClick={() => handleClassClick(classItem.id)}
          />
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <BookOpen className="text-white/40 mb-4" size={48} />
          <h3 className="text-xl font-medium text-white mb-2">No Classes Found</h3>
          <p className="text-white/60 text-center max-w-md mb-4">
            We couldn't find any classes matching your current filters. Try adjusting your search or clearing the filters.
          </p>
          <button
            onClick={clearFilters}
            className="flex items-center bg-primary/80 hover:bg-primary text-white rounded-md px-4 py-2"
          >
            <X size={16} className="mr-2" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Classes;
