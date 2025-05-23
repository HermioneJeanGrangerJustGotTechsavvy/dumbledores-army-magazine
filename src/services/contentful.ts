
import { createClient } from 'contentful';
import { BlogPost } from '@/pages/Writing';

const samplePosts: BlogPost[] = [
  {
    id: 11,
    title: "Behind the severity of Severus Snape",
    excerpt: "A poetic exploration of the complex emotions behind Snape's bitter exterior.",
    author: "Aairah Khan",
    date: "May 18, 2025",
    image: "/lovable-uploads/341ead79-4163-48c5-802a-e22be0c7114c.png",
    content: `Behind the severity of Severus Snape
By Aairah Khan

In Severus Snape, a cauldron brews,
Where ancient slights and losses fuse.
Not just a sneer, a cutting tone,
But bitterness etched deep in bone.

His anger coils, a venomous snake,
For Lily's love he could not take.
A constant sting, a festering sore,
The life and joy he knew before.

Each cruel remark, a poisoned dart,
A shield he holds against the heart
That aches with grief, a love denied,
A festering wound he cannot hide.

It flares in class, a sudden storm,
Against the careless, safe, and warm.
A twisted justice he demands,
With trembling, unforgiving hands.

And in the silence, late at night,
A hollow echo of lost light.
The wreckage of a life undone,
Beneath a cold and lonely sun.

So see in Snape, this shadowed soul,
Where anger takes its heavy toll.
A symptom of a love profound,
By cruelest fate, forever bound

To memories that twist and tear,
A burden far too hard to bear.
His fury masks a deeper pain,
A love he can't reclaim again.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 10,
    title: "Debriefing",
    excerpt: "A poignant reflection on failure, risks, and seeking validation.",
    author: "Jiya Doshi",
    date: "May 16, 2025",
    image: "/lovable-uploads/2dc32744-82b2-4016-88c4-3b6c07974c2f.png",
    content: `Debriefing
By Jiya Doshi

In this debriefing,
I dissect the jigsaw pieces,
I didn't lose, I found another way of failing – 
And falling, unintended puns and situational irony. 

I won't dive into details,
The contradictions, the strategizing,
The wind, the masts, the broken sails,
Don't judge a girl for trying.

I take the worst risks for the best of people,
And the best bets for the worst,
Till I go round and round in a spiral,
Of what I did first.

I placed my suitcase on the floor and took out all the evidence,
Memories like heat shocks rippling with electricity,
You looked at me blank-faced, asking for translation, 
So, I asked you to watch me –

Watch me fill those dead words with CPR,
Paint this town red, you knew immediately what I meant,
I'll make this world the canvas to my art,
But I just need you to see sense.

Because in this debriefing,
I need you to tell me,
That I didn't lose, I found another way of failing – 
And falling, make me see it, make me believe.`,
    category: "The Tortured Poets Department"
  },
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
  },
  {
    id: 6,
    title: "Narcissism",
    excerpt: "A bold and unapologetic exploration of self-worth and toxic relationships.",
    author: "Deetyaa Tantia",
    date: "May 4, 2025",
    image: "/lovable-uploads/7ce9f164-465e-4934-a7b6-1f6061df7e58.png",
    content: `Narcissism
By Deetyaa Tantia

I doomscroll through her highlights like she's an expertly made trap.
I look at her smiling face, wish that those cheekbones would snap.
She's so pretty, she looks exactly like those girls you pursue.
The ones you know can't resist you.
Because you're like a brightly lit cigarette to them, you're heroin they're addicted to,
You're older than them, you're powerful.
So they can excuse your ordinary looks and that lopsided smile.
Because when power knocks at your door, you don't deny.
But I'm not like them honey, I see more to you than a pretty coat.
I see your fears, your pretences, you're barely afloat.
Tell me, does she comfort you after you fail your cricket finals?
You think you can come back to me, but honey I'm not for trial.
See, babe, you'll never catch me begging for your love,
Because you know you're just average, that's why you're going after her.
She could honestly do better, she looks like a pretty catch.
I don't chase, love, but I do snatch.
I guess you'll wonder, if I don't care about you, why go through the effort to write this ballad down?
It's to remind you, sweetheart, that once something is lost, it can't be found.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 7,
    title: "If Not For You",
    excerpt: "A short but powerful acknowledgment of love's transformative influence.",
    author: "The Anonymous Girl",
    date: "May 4, 2025",
    image: "/lovable-uploads/2ec52cdf-5c1e-4b0e-be40-bf078478d881.png",
    content: `If Not For You
By The Anonymous Girl

I'm not a writer,
I'm not a poet,
I'm nothing,
If not for you.`,
    category: "The Tortured Poets Department"
  },
  {
    id: 8,
    title: "What I Said",
    excerpt: "A heartfelt poem about the gap between what we feel and what we say.",
    author: "The Anonymous Girl",
    date: "May 4, 2025",
    image: "/lovable-uploads/3c636c24-64fd-4a70-bfc0-c4d9aa73db3a.png",
    content: `What I Said
By The Anonymous Girl

There were so many things I wanted to say
Like: 'I love you'
'I miss you'
'Stay'
But all that came out was;
'Please don't leave me again.'`,
    category: "The Tortured Poets Department"
  },
  {
    id: 9,
    title: "Velcro",
    excerpt: "A profound meditation on the nature of joy and its unexpected persistence.",
    author: "Anjani Shastri",
    date: "May 4, 2025",
    image: "/lovable-uploads/51d1661b-b97a-45eb-bcff-7caa8f477902.png",
    content: `Velcro
By Anjani Shastri

Joy is not the polished porcelain thing they promised,
it is not crystalline, not poised.
It arrives like Velcro: abrupt, snagging,
latching onto the loose threads of your day
with the graceless fidelity of something that refuses to let go.

It finds you in subways and empty stairwells,
in lamplight on cracked pavement,
in the silence after an almost-cry.
You think: this can't be joy, it's too heavy.
But it stays.
Pressed into you like a palmprint in wet cement.
You try to peel it away and it fights,
because real joy is adhesive,
not ornamental.

It carries the textures of touch and loss,
of coffee spilled on old poems,
of holding hands just once but remembering forever.
It is the aftermath of wonder,
the sticky truth that something mattered.
Velcro doesn't ask to be loved.
It simply fastens and waits.

You learn to stop pulling.
You let it hold.
You let joy be stubborn, clingy, alive.
You stop searching for silk.
You reach for the real.
For Velcro joy,
unpretty, unwavering,
and yours.`,
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
