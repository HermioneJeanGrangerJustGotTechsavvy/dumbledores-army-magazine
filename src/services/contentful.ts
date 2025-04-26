
import { createClient } from 'contentful';
import { BlogPost } from '@/pages/Writing';

// Sample blog posts data that will be used as fallback
const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "April Poetry",
    excerpt: "A poetic exploration of vulnerability, connection, and the emotions.",
    author: "Jiya Doshi, Durva Shah",
    date: "April 19-30, 2025",
    image: "/lovable-uploads/b2b6834c-0a1c-423a-b168-d07ad12f22af.png",
    content: `Eye Contact
Poem By Jiya Doshi
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
A place where the seas finally meet the skies, the place they call 'infinity'.

Wounds 
By Durva Shah
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
  You’ve always got to do things that leave a dent.
  
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
  Just to strengthen your defense.`
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
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    console.log('Using sample posts as fallback');
    return samplePosts;
  }
};
