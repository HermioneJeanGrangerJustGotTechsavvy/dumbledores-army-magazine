
import { createClient } from 'contentful';
import { BlogPost } from '@/pages/Writing';

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "Eye Contact",
    excerpt: "A poetic exploration of vulnerability, connection, and the emotions.",
    author: "Jiya Doshi",
    date: "April 19, 2025",
    image: "/lovable-uploads/b2b6834c-0a1c-423a-b168-d07ad12f22af.png",
    content: `Eye Contact Poem by Jiya Doshi

You watched my expressions smoothen out like a starched shirt,
Except my eyes were pictures of Dorian Gray in their sockets,
Like they were a roll of credits to all the people who had me hurt,
And all those who took out their handkerchiefs just to smugly return it in their pockets.

You watched the kaleidoscope in them shift every single day,
Like restless bokeh flares in a peripheral vision,
A vortex in the Bermuda triangle, sinking in meant drifting away,
Like a radio, the songs taking you on horseback, a déjà vu of emotions.

A see-through glass wall is still a wall,
You press your fingertips against it, see everything across,
You watch me in free fall like a rag doll,
Try to save me, but you crash, we both bear our own albatross.

Your fallen wings, my paper cranes, all sink into the thinning air of Plath's bell jar,
I count them silently, my eyes lowered till you raise them to yours,
You place your hands over the glass,
I place mine right across: you and I are the same after all.

"I've got Madame Bovary's incapability to distinguish between real and ideal,"
I say from across the wall in incoherent whispers, but you knew,
My house is made of Gilman's yellow wallpaper, ghosts from my past, my fate put to seal,
You say, "Let me help you."

You light up the corridors with dozens of lightbulbs, like you're some invisible man,
They splinter fragmented light into my world of darkness, a shooting star, lighting up my eyes,
Our secret garden, the place where my emotions ran,
The glass wall shatters as you and I become unseen, unjudged and unbound by time.

And maybe eyes are windows to the soul, but you made a brief eye contact feel like home,
And now every time I wear masks, heading out for the masquerade ball they call life,
I have a place to be me, a place to return to,
A place where the seas finally meet the skies, the place they call 'infinity'.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 2,
    title: "Wounds",
    excerpt: "A powerful reflection on emotional pain and difficult relationships.",
    author: "Durva Shah",
    date: "April 25, 2025",
    image: "/lovable-uploads/25a19832-fcfe-421e-9254-48a6398d5be4.png",
    content: `Wounds Poem by Durva Shah
  
  I decide to forget everything and forgive you,
  Yet you don't miss an opportunity for showing your colours true.
  
  I decide to put everything back and start anew,
  Yet you stab my back like the first few.
  
  I decide to move on and smile,
  Yet you never leave a chance to say words that stick for a while.
  
  I decide to accept and love,
  Yet your sentences hurt like knives killing my pearl dove.
  
  You always got something to say in the end,
  You leave scars that can never mend.
  
  You can never see me happy and content,
  You've always got to do things that leave a dent.
  
  Whatever you say, whatever you do, hurt and strike the heart,
  Leaving it in a million pieces apart.
  
  You say it was mindless talking and blame the drink,
  It was your actions that made me rethink.
  
  I wish I was dead,
  So you would be lying peacefully on your bed.
  
  I wish I didn't exist,
  My importance in your life is just a myth.
  
  Yet I can't hate nor dislike,
  It's the thrill of how you will behave that leaves me with spike.
  
  Wound, wounds, and wounds that will never heal,
  Whether I whimper or squeal.
  
  You tell me to forget the past, to forget your mistakes and live in the moment,
  But deep down all my sorrow is just pent.	
  
  You find all faults in me,
  For you there is nothing good in me to see.
  
  You tell me it's normal and everybody goes through it,
  But I bet nobody would sit through this shit.
  
  You tell it's somebody who's got to say,
  It's your harsh words that let me in the dark world stray.
  
  And if I tell you it hurts,
  You will just stop talking or another harsh word blurt.
  
  You tell me to keep it superficial,
  And I really wish it was possible.
  
  A world where everything would be mythical,
  And loving you would be whimsical.
  
  You never see my efforts or tries,
  You ignore the sound of cries.
  
  You say I am the one who needs help,
  But the finger is pointing at you… yelp!
  
  You are not a homemaker,
  But a destroyer.
  
  You drain all my confidence,
  Just to strengthen your defense.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 3,
    title: "Colorblind, Blood Red Heart",
    excerpt: "A poignant exploration of love, longing and emotional blindness.",
    author: "Alice Symphony",
    date: "May 1, 2025",
    image: "/lovable-uploads/b565d01a-779a-484b-b714-75db3938c2c3.png",
    content: `Colorblind, Blood Red Heart
By Alice Symphony

Days away I still feel you,
Touching me with your words,
Shaping me with your love.

Even in my own darkest,
Still room inside my heart,
That palace full of you.

Your pictures all on the walls,
All of the things you love,
Your voice bouncing around.

And the sweet things you've said,
Your feelings seeming strong,
That loving piece of you.

I'm addled by my own despondency,
I cannot see the rainbow you are,
Through my color blinded, blood red heart.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 4,
    title: "Rebirth",
    excerpt: "A raw journey of self-discovery, transformation and personal rebirth.",
    author: "Alice Symphony",
    date: "May 1, 2025",
    image: "/lovable-uploads/e16050e0-95ed-4f0c-b79b-8bba51356b35.png",
    content: `"Rebirth"
By Alice Symphony

I don't want to be like this,
I can't stand looking at myself,
I despise hearing that vile, damned name,
I'm disgusted at my unfitting clothes,
I want my hair curled and made to be pretty,
I want a new wardrobe, clothes I actually like,
I want a set of family that truly loves me,
I want, no I need to be able to express myself,
Oh, I loathe this existence, containment and conformation,
Oh, how I'm so ashamed of how I view myself in my own mind,
Oh, when I hear my "name" I feel so sick, twisted, and hideous,
Please may something be to let thyself be for I am so beaten and tortured,
Please take that awful pain out of my chest and let thyself live a proper life,
If not, let me die, let me perish, to wherever I may be and let me rest.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 5,
    title: "One Day",
    excerpt: "An aspiring poem about hope, self-acceptance, and the freedom to be oneself.",
    author: "Alice Symphony",
    date: "May 1, 2025",
    image: "/lovable-uploads/df7d9166-4e94-4925-ad65-e6a4e8cf4557.png",
    content: `"One Day"
By Alice Symphony

One day, I will look in the mirror and see myself 
Not the distorted, skewed reflection I'm used to 
Just me, as I am, as I was

One day, I will say my words I mean
Not the filtered ones to prevent conflict
The words that bounce in my head with nowhere to go

One day, I will have someone love the real me 
Not the facade I throw on for my friends and family
The real me that I hardly know myself

One day, I will grow wings.`,
    category: "The Tortured Poets Department"
  }
];

const client = createClient({
  space: 'YOUR_SPACE_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
});

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
    });
    console.log('Fetched posts:', response.items);
    if (!response.items || response.items.length === 0) {
      console.log('No posts found in Contentful, using sample posts');
      return samplePosts;
    }

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      author: item.fields.author,
      date: new Date(item.fields.date).toLocaleDateString(),
      image: item.fields.image?.fields?.file?.url || 'https://images.unsplash.com/photo-1456513080867-f24f120351fc',
      content: item.fields.content || 'Content not available',
      category: item.fields.category || '',
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    console.log('Using sample posts as fallback');
    return samplePosts;
  }
};
