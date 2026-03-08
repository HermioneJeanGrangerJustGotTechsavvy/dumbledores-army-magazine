
import { useState, useEffect } from "react";
import { getBlogPosts } from "@/services/contentful";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen } from "lucide-react";
import WritingModal from "@/components/WritingModal";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  month?: string;
  year?: string;
}

// Local poems for Tortured Poets Department
const localPoems: BlogPost[] = [
  {
    id: "poem-misunderstood",
    title: "Misunderstood",
    content: `I'm tired....
Of being misunderstood 
Of being taken for granted 
Of being disrespected by words and actions 
I'm tired of being tired`,
    date: "August 11, 2025",
    author: "Jenny Mylva",
    image: "/lovable-uploads/fd0daf6a-30eb-4f15-bc6c-852241b4c25c.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-loving",
    title: "Loving",
    content: `what is more harmful 
than loving too loud 
is being incapable of loving at all
being quiet about love 
will only make your heart bleed`,
    date: "August 11, 2025",
    author: "Jenny Mylva", 
    image: "/lovable-uploads/325ab61d-f443-4e8f-8676-669f340f421c.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-heartache",
    title: "Heartache",
    content: `what aches the heart
grows the heart`,
    date: "August 11, 2025",
    author: "Jenny Mylva",
    image: "/lovable-uploads/1cbfcb6b-4691-4c64-9616-bbfdb6f20caa.png", 
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-attachment",
    title: "Attachment", 
    content: `if it hurts the heart 
more than it pleasures 
it is not love,
it is attachment`,
    date: "August 11, 2025",
    author: "Jenny Mylva",
    image: "/lovable-uploads/171f6b96-14ea-4ef8-a246-f1de273a1c5a.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "poem-beating",
    title: "Beating",
    content: `Her heart continues to beat
even after taking a brutal beating`,
    date: "August 11, 2025", 
    author: "Jenny Mylva",
    image: "/lovable-uploads/c898d2bc-deeb-4992-8bc9-b27e679fa48e.png",
    category: "The Tortured Poets Department",
    month: "August",
    year: "2025"
  },
  {
    id: "lyra-story",
    title: "Lyra",
    content: `"Tell me, Prince of Thrace, why you would walk through hell willingly."

The Lord of the Dead's voice echoes through the obsidian chamber. You kneel before Hades and Persephone, trembling, your breath catching in your throat. A thousand answers swarm your mind. But in the end, it's simple.

You are scarcely a prince. Certainly not a hero. Not really a poet.

You are Orpheus.

And you say the only truth that matters:

"Eurydice."

The name leaves your lips like a prayer. A mercy. A release.

"My lord," you say quietly, "this is not hell to the land of the living—and if it is, I will bear it. For it is where I have been since she died."

Persephone, the Goddess of Spring, turns to her husband. Her face is soft, her eyes wet. Hades meets her gaze. Then he looks back at you.

"Well then," he says. "I shall see your perception of heaven."

His hand rises. A finger touches your temple.

Memory washes over you like a wave.

It had been a restless night. One of those evenings when the stars felt too far and the palace walls too tight. So you slipped away, your lyre slung across your back, and let your feet carry you toward the woods. You followed a deer trail that wound like music through the trees.

The deeper you went, the clearer the air became. The moonlight filtered through the leaves in silver ribbons, and the world hushed itself to listen.

You are Orpheus, and you play as you walk.

The notes slip from your fingers like birds released to flight. Your voice joins them, soft and unburdened, lifting into the dark. You do not sing of heroism or legacy. You sing of longing. Of nights too quiet and hearts too full. Of the aching, fragile hope that beauty might be enough.

The clearing finds you. A perfect circle framed in wildflowers, the grass soft, the night blooming around you.

You sit, and truly let the lyre speak.

The forest holds its breath.

A fawn steps from the underbrush, ears twitching. A wolf slinks from shadow and lies down in stillness. Even the stars seem to draw near, watching.

They would say later—even the rocks wept.

Then, from the trees, a voice.

"You play very well."

You are Orpheus, and you turned back.

She stood just within the ferns, half in shadow. Barefoot, brown-skinned, her hair curled and tangled with leaves, eyes green like deep summer. She wore a linen shift and a circlet of dried thyme and laurel. A nymph, perhaps. A daughter of the wild.

She stepped into the moonlight, and your breath caught.

"Thank you—"

"Eurydice," she said, her voice warm with quiet humor. Her smile was small, but certain.

"Eurydice," you repeated, tasting it. Eu-ry-di-ce. It was a song all its own.

She approached without fear, and sat beside you as if she'd always known you. She patted the space beside her. You sat, careful, reverent, half-afraid the moment would vanish.

"And you?" she asked.

"Orpheus."

"Prince of Thrace?"

"In name only," you said, with a crooked smile. "I have no sword. No title that means anything. Just this." You lifted your lyre.

She tilted her head. Considered you.

"Then don't be a hero. Be Orpheus. 'Best of bards and best of poets' is more than enough."

You blinked. No one had said it like that before—without expectation, without weight. Just… truth.

She lay back in the grass, folding her arms beneath her head. You lay beside her.

The stars overhead glittered, and you whispered, half-hopeful:

"Do you know their names?"

She raised a hand and pointed.

"That one is Hercules. Once Heracles. The hero who killed his wife and children in a madness Hera sent, and spent the rest of his life repenting."

You turned to look at her, startled.

"You know, the only reason the Gods write heroes' tales in the sky is because they are moved by grief and despair. For what God has truly experienced it, their lives eternal and ensured? Pain is a novelty to them, and they love nothing more than novelties. That is why they make tragic beauties and beautiful tragedies of heroes."

She pointed out each constellation in the sky, and you asked.

She spoke of Hercules, the constellation based on the famed Heracles, a hero who had killed his family in a fit of madness brought by Zeus' wife, Hera, and you asked.

She spoke of swift and strong Achilles going mad following the death of his lover, Patroclus, and witty Odysseus who had left a trail of red on every island to get back to his wife Penelope, and you asked.

You asked and she answered, never condescending. Her voice held the calm certainty of rivers. You forgot time. You forgot yourself.

When you stood at last to go, she called out.

You are Orpheus, and you turned back.

"One last thing," she said. "You may be 'Orpheus, best of bards and best of poets'—but simply 'Orpheus,' to me, is enough."

She smiled. It was not the first time someone had looked at you.

But it was the first time you were seen.

The forest became your temple.

Day after day, you returned. She would be waiting, or arrive soon after. You brought fruit; she brought flowers. You played songs. She named stars.

She taught you the names of herbs, how to spot animal tracks, how to listen for rain in the silence. You told her stories your mother, the Muse, had whispered to you at birth. She listened without needing you to perform. She simply listened.

The seasons turned.

Your wedding was in spring. A full moon crowned the sky. The glade shimmered with torchlight, and the trees seemed to bend closer in blessing.

Nymphs sang and poured wine. Fauns danced and tripped over each other. Someone strung laurel between trees. Someone else spread wild roses and lavender over the ground.

You waited beneath an olive tree, your lyre pressed to your chest.

When she appeared, you forgot how to breathe.

She wore white linen, stitched with gold thread. Her feet were bare, adorned with thin strands of ivy. Her hair was crowned in violets and rosemary. The moonlight loved her.

She stood before you and whispered:

"Will you sing for me?"

You nodded, throat tight, and lifted your lyre.

You sang not as Orpheus, best of poets—but as Orpheus, the man who loved Eurydice. You sang of morning dew and stolen kisses, of hands touching in the dark, of the trembling, holy ache of finding someone who knows you.

When the last note fell, you took her hands.

"I only ask," you said, gazing into her eyes, "that you do not go where I cannot follow. I would leave my home, my palace, my legacy. I would leave everything I know and everyone I ever met. I would do all of this, as long as you are with me. So travel wherever you'd like, and I will not stop you. So look back, and see me following you, just a few steps behind. I would follow you beyond till death do us part. And if you stumble, my hands will always be at the ready to catch you. So will you take them for your husband?"

Tears brimmed in emerald eyes. "I do."

She kissed you. And for one moment, everything was perfect.

Then—

A scream.

A snake hidden in the flowers.

Fangs sinking into her heel.

You held her as she fell.

She had vowed not to go where you could not follow.

Hades is silent.

The Lord of the Dead, the King of Shadows, watches you with eyes as dark as Lethe's depths. Time means nothing to him—he who has seen all things die, and most things twice. Yet here you are, and somehow, you've surprised him.

You kneel, the echoes of your lyre still whispering through the halls of the Underworld.

Then, with a motion like a breath, he summons them.

Clotho. Lachesis. Atropos.

The Fates appear from the dark. You know their names without needing to be told. Clotho spins, Lachesis measures, Atropos waits—thread in one hand, shears in the other. And in that thread, glowing faint and red, is her soul.

You came for this. You crossed Lethe. You made the dead weep. You made even Cerberus sleep.

Hades speaks at last.

"You may bring her back."

Your breath catches.

"But go now. She will follow. Do not speak. Do not look back. Not until both your feet have left this place."

His voice lowers.

"If you do, she is lost. And the Fates will not mend her thread again."

The thread trembles in Atropos' hand.

You are Orpheus. You have sung to the dead. You have made gods listen. But now, more than any song, more than any plea, this one thing is asked of you:

Do not look back.

Her hand is in yours.

It is where it is meant to be, both shaped perfectly to complete the other. Her warmth is reassurance, a sliver of light in the dark and dreary Underworld. Your limbs ache, but what eats at you is not the soreness of your feet but the seed of worry that grows steadily for your wife. However, you don't dare to halt; to slow your footsteps on the rough ground of the mountain that holds the entrance to the land of the living at its top. As Charon had ferried you and Eurydice across the River Lethe for a second time, you tried to see a reflection of your beloved in the murky water, but as if it could sense his desire, it rippled and lapped, leaving your efforts in vain. The fear for her brings needles to your feet with each step, piercing and throbbing.

The light peaked over the mountain's craggy crown, hope flaring in your broken but beating heart. You could feel each fragment slowly stitch itself together, with the future with her in mind—

A stumble.

Hands at the ready to catch her.

You are Orpheus, and you turn back.

It was second nature. And if you had not turned back, you would not be Orpheus. Because you would follow her in your dreams, in life, in death. Because there is no world where Orpheus would not catch Eurydice if she fell.

You meet her eyes, eyes of the trees and leaves and grass above. The eyes of the woman you fell for first. The eyes that are your first and forever.

"Eurydice—"

"You're early." she smiles.

You are scarcely a prince, and certainly not a poet. Except in emerald eyes. You are Orpheus, and you can only simply say the truth.

"I missed you."

She laughs, the sound the most lovely melody you've ever heard, and it is gone with her in the wind.

Is it nighttime where you are? If it is, and you spy the stars twinkling in the inky black expanse of the night above, stop for a moment to raise your head.

You may spot a constellation in the sky. It is called Lyra, for the lyre.

As you know, Gods love novelty. Thus they make tragic beauties and beautiful tragedies of tales of heroes, painting them in Nyx's domain. This constellation, Lyra, was painted in the night sky for a boy who loved a girl so much he was willing to reverse the natural order for her. It told the tale of a boy who loved a girl so much his love for her would make a hero out of him, a bard with no weapon but his lyre and voice, yet even death made an exception for him.

How, you ask, is this not just a tale of love? Well, then I shall tell you. Of a boy named Orpheus, and a nymph called Eurydice, who now walk hand in hand.

Sometimes he walks ahead,
and turns back to look at her whenever he likes.

Winner of Pensieve Prose Competition.`,
    date: "August 31, 2025",
    author: "Alexandra Renggli",
    image: "/lovable-uploads/825a8aa9-40fa-4d6e-a7f9-7832b2ae0570.png",
    category: "Tales of Beedle the Bard",
    month: "August",
    year: "2025"
  }
];

const Writing = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [writingPosts, setWritingPosts] = useState<BlogPost[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const loadWritingPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        const allowedCategories = ["The Tortured Poets Department", "Amortentia", "Tales of Beedle the Bard"];
        const writingOnly = data.filter(post => allowedCategories.includes(post.category));
        const writingWithDetails = writingOnly.map(post => {
          const postDate = new Date(post.date);
          return {
            ...post,
            id: String(post.id),
            category: post.category,
            month: postDate.toLocaleString('default', { month: 'long' }),
            year: postDate.getFullYear().toString()
          };
        });
        // Combine Contentful posts with local poems
        const allPosts = [...writingWithDetails, ...localPoems];
        setWritingPosts(allPosts);
      } catch (error) {
        console.error("Failed to load writing posts:", error);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    
    loadWritingPosts();
  }, []);

  const filteredPosts = writingPosts.filter(post => {
    if (selectedMonth !== "all" && post.month !== selectedMonth) return false;
    if (selectedAuthor !== "all" && post.author !== selectedAuthor) return false;
    if (selectedYear !== "all" && post.year !== selectedYear) return false;
    if (selectedCategory !== "all" && post.category !== selectedCategory) return false;
    return true;
  });

  useEffect(() => {
    if (loaded) {
      console.log("Filtered Writing Posts for display:", filteredPosts);
    }
  }, [filteredPosts, loaded]);

  const months = Array.from(new Set(writingPosts.map(post => post.month).filter(Boolean)));
  const authors = Array.from(new Set(writingPosts.map(post => post.author)));
  const years = Array.from(new Set(writingPosts.map(post => post.year).filter(Boolean))).sort((a, b) => parseInt(b!) - parseInt(a!));

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-8 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Writing Gallery</h1>
        <p className="text-white max-w-3xl mx-auto mb-8">
          Typewriter's Creed - A collection of powerful writings from talented authors in our community.
        </p>
      </div>

      <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {months.map(month => (
              <SelectItem key={month} value={month!}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors.map(author => (
              <SelectItem key={author} value={author}>{author}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <SelectValue placeholder="All Years" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year!}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[250px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-midnight-dark border-white/20">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="The Tortured Poets Department">The Tortured Poets Department</SelectItem>
            <SelectItem value="Amortentia">Amortentia</SelectItem>
            <SelectItem value="Tales of Beedle the Bard">Tales of Beedle the Bard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gray-800 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105 hover:shadow-xl`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onLoad={() => console.log(`Image loaded successfully: ${post.image}`)}
                  onError={(e) => {
                    console.error(`Failed to load image: ${post.image}`, e);
                    console.log('Image element:', e.currentTarget);
                    // Try fallback
                    e.currentTarget.src = 'https://via.placeholder.com/400x300/1f2937/ffffff?text=Image+Not+Found';
                  }}
                />
              </div>
              
               <div className="p-4">
                 <h3 className="text-lg font-bold mb-2 text-white">{post.title}</h3>
                 <p className="text-white/70 text-sm mb-2">{post.date} • by {post.author}</p>
                 <p className="text-white/80 text-sm line-clamp-3 mb-3">{post.content}</p>
                 <Button 
                   onClick={() => handleReadMore(post)}
                   variant="outline"
                   size="sm"
                   className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                 >
                   <BookOpen className="h-4 w-4 mr-2" />
                   Read More
                 </Button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-4">No writing matches your filters</h3>
          <p className="text-white/80">Try adjusting your filter selection to see more content!</p>
        </div>
      )}
      
      <WritingModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Writing;
