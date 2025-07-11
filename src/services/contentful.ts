import { createClient } from 'contentful';
import { BlogPost } from '@/pages/Writing';

const samplePosts: BlogPost[] = [
  {
    id: "37",
    title: "Blood and Sky",
    author: "Shreyashi Manna", 
    date: "July 8, 2025",
    image: "/lovable-uploads/6b408993-dbb2-4030-93b0-ec87a2e6a8a3.png",
    content: `Blood and Sky
By Shreyashi Manna

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "36",
    title: "Fearless",
    author: "Anjani Shastri",
    date: "July 8, 2025",
    image: "/lovable-uploads/d40a4ec5-53d4-40ce-b716-cad5cab74d05.png",
    content: `Fearless
By Anjani Shastri

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "35",
    title: "The Chemistry of Feeling",
    author: "Thalia Clem",
    date: "July 8, 2025",
    image: "/lovable-uploads/f108793b-fd64-460f-bc09-c552bdc37b27.png",
    content: `The Chemistry of Feeling
By Thalia Clem

Scientifically speaking,
emotions are electrochemical signals—
tiny storms of charge and current
coursing through the body,
governing breath, impulse,
heartbeat, and decision.
They say we are rational creatures,
but we are wired with wildfire.

Robert Plutchik charted
the vast terrain of our inner world:
34,000 distinct emotions,
branching from five primal roots—
Fear.
Anger.
Sadness.
Disgust.
Joy.

From these,
love rewires the body, then shorts the system,
regret loops like static,
hope flickers like light refracted
through a prism of pain.
We are vessels of voltage,
haunted by memory,
ignited by touch.

And yet—
somehow,
amid the circuits and surges,
we still call it soul.`,
    category: "The Tortured Poets Department"
  },
  {
    id: "34",
    title: "Owe",
    author: "Durva Shah",
    date: "July 7, 2025",
    image: "/lovable-uploads/09164648-d39f-4751-b199-db0e265176ab.png",
    content: `Owe
By Durva Shah

Reminisce about you till my last breath,
Till the storms wage and the rage sets

Your eyes burn with fire,
But your heart is engraved with the words liar.

Yearn for your glance every single day,
Hoping you would finally say,
But all you do is betray,
Once filled with colours is now grey,
Wishing you would change but it is all a dismay.

Yet i pray god to see you again,
Because for me you stand out amongst all men.

Your thoughts drain me out,
Cover my sunshine with dark clouds.

What-if's flood my brain,
Make it difficult to remain sane.

Dream about you when every love song plays,
Anticipating this wouldn't break and you would stay.

Contemplating things would brew,
Did I tire you?

Something changed or did u give up on me,
From this infamy I can't be set free.

Or were your intentions never true,
But I was too blind to see the real you?

-Durva Shah`,
    category: "The Tortured Poets Department"
  },
  {
    id: "33",
    title: "Sink the ship",
    author: "Zaibaa Rawat",
    date: "July 5, 2025",
    image: "/lovable-uploads/f4ae3ca2-a8c5-49ca-a474-dac215c244c7.png",
    content: `Sink the ship
By Zaibaa Rawat

Every time I see you, feelings resurface.
A flutter in my stomach. A tightening in my chest. Unconscious smiles.

How is it possible?
I hardly ever see you — but when I do, you bring everything back.

It's like drowning.
You're the wave, the pull, the anchor, the storm.
I only think about you lately.

I get jealous at the thought of you with someone else.
Why is that? That's not like me.

I am quiet and calm, they always say it
but you make me want to laugh too loud,
talk for hours,
listen to every word you say like it might be the last.

What is this feeling?
How do I make it stop?
How do I switch it off?

Sink the ship —
because I hardly believe it would ever sail anyway.
-Zaibaa Rawat`,
    category: "The Tortured Poets Department"
  },
  {
    id: "32",
    title: "Celestial grace",
    author: "Sanika Demicha",
    date: "June 20, 2025",
    image: "/lovable-uploads/06ca70cd-5d9c-4084-b597-57da5997402d.png",
    content: `Celestial grace
By Sanika Demicha

Your luminance was uncanny at first sight,
For it had led me to the shadows, where secrets reside,
My hand in yours as I held death's hand in mine,
The stars above began to smile watching 2 souls intertwine,
Your clever wit and ethereal pulchritude were a siren call,
Entangled in my own words, destined to fall,
A bitter -sweet symphony that cried out my name,
Completely oblivious you set my heart aflame,
My secret desire, a whispered plea,
That one day you will belong to me.
-Sanika Demicha`,
    category: "The Tortured Poets Department"
  },
  {
    id: "31",
    title: "Words Left Unspoken",
    author: "Maya Patel",
    date: "June 10, 2025",
    image: "/lovable-uploads/c982c810-b80e-4a19-963f-3970c46e79c2.png",
    content: `Words Left Unspoken
By Maya Patel

There are words I carry in my chest like stones,
Heavy with the weight of things unsaid.
They sit there, patient, waiting for their moment—
But the moment never comes.

How do you tell someone they saved your life
Without telling them how close you came to ending it?
How do you explain that their casual kindness
Was the thread that kept you tethered?

I practice these conversations in my head,
Polish them until they shine,
But when I open my mouth,
Only small talk spills out.

Maybe some words are meant to stay buried,
Maybe some truths are too heavy for air,
Maybe the weight in my chest
Is love with nowhere to go.`,
    category: "Typewriter's Creed"
  },
  {
    id: "30",
    title: "Pulse of Compassion",
    author: "Pahal Shah",
    date: "June 1, 2025", 
    image: "/lovable-uploads/c982c810-b80e-4a19-963f-3970c46e79c2.png",
    content: `Pulse of Compassion
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "29",
    title: "Botanical Heartbeat",
    author: "Pahal Shah",
    date: "June 1, 2025", 
    image: "/lovable-uploads/6fe82fc8-7518-4e4c-8015-ba61c3961c36.png",
    content: `Botanical Heartbeat
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "28",
    title: "Inner Spell",
    author: "Pahal Shah",
    date: "June 1, 2025", 
    image: "/lovable-uploads/ad3655a4-9ffc-4cd8-afe3-218df565fd95.png",
    content: `Inner Spell
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "27",
    title: "Tears Like Pearls",
    author: "Pahal Shah",
    date: "June 1, 2025", 
    image: "/lovable-uploads/a6ca11e8-ba39-47b2-80a5-59b96723d721.png",
    content: `Tears Like Pearls
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "26",
    title: "Florals & Frames",
    author: "Pahal Shah",
    date: "June 1, 2025", 
    image: "/lovable-uploads/7b4ee294-fd25-4ef9-b806-40f46735b1a5.png",
    content: `Florals & Frames
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "25",
    title: "Pastel Scream",
    author: "Pahal Shah",
    date: "June 1, 2025", 
    image: "/lovable-uploads/22a4a7a5-fed4-4be4-8e56-6222bcfdaf1b.png",
    content: `Pastel Scream
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "24",
    title: "Stargazer's Solitude",
    author: "Pahal Shah",
    date: "June 1, 2025",
    image: "/lovable-uploads/da2b77d6-1d83-4e0f-9f66-9598bc935872.png",
    content: `Stargazer's Solitude
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "23",
    title: "Café Daydream",
    author: "Pahal Shah",
    date: "June 1, 2025",
    image: "/lovable-uploads/4c6901cc-15da-46af-8b5b-48bb5d964465.png",
    content: `Café Daydream
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "22",
    title: "In Hues of Thought",
    author: "Pahal Shah",
    date: "June 1, 2025",
    image: "/lovable-uploads/3d7b9e37-d799-45fc-b2e1-69570f77bcc1.png",
    content: `In Hues of Thought
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "21",
    title: "Echoes of Stillness",
    author: "Pahal Shah",
    date: "June 1, 2025",
    image: "/lovable-uploads/ed1dfc0e-df3c-44ca-ad72-716cc891e7f6.png",
    content: `Echoes of Stillness
By Pahal Shah

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "20",
    title: "Coffee",
    author: "Jiya Doshi",
    date: "June 5, 2025",
    image: "/lovable-uploads/88e6790d-953b-472c-bbb1-589f89a23344.png",
    content: `Coffee
By Jiya Doshi

I still remember the first time I'd tasted coffee. I was probably twelve. I took one sip and swore never to have it again. 14 years old and cappuccino changed my life. My perspective shifted. What feels bitter isn't really bitter until you've known true bitterness. I went from the girl who ran away from coffee to the girl waiting for it every single day.

And that's the case with this calamitous bridge spanning across us – it's got holes and cracks and stepping on it would mean direct death and yet I try to do so. I fall down into the river, get swept in the currents, climb the mountain, reach the bridge and do it all over again. It's not because I'm addicted. I'm not Prometheus. I don't heal in a day. Scars on me last forever.

And maybe that bridge is a scar, because every time I lift my head to cross it, every time I watch you on the opposite side, every time I step, I hope I don't fall. I hope I don't fall even as my foot goes crashing through the wood. I hope I don't fall even when I'm inches from the surface of the water. I hope I don't fall even when I'm drowning and clinging to the rocks for dear life.

Because every time I look across, I don't see the crumbling bridge, I see you. I see the risks I don't want you to take. I see the smile fading. I see the eyes on the bridge. I see you take a little step closer to the bridge. I see you.

I see the first time I'd almost reached you, the time our fingers brushed, the time I was nearly on the other side and yet I fell. The bridge had gotten worse over the years. The scars worsened. The risk intensified.

Because every time I fall, I'm twelve and I refuse to go through it all again. But I still do.

Every time I look across, I'm fourteen, hoping to finally cross the bridge, hoping to finally reach you.

And I know someday I'll do it. Even if the bridge collapses. Even if the water swallows me. Even if I'm bruised.

Someday, I'll be more mature, more determined, more fearless. Someday I'll cross over, even if I need to grow wings on the way down. I'll learn to do it every day. I'll teach myself.

I promise.

Someday, the distant girl whose voice can barely reach you, whose eyes are too far-off to read, but whose heart synchronizes with yours will find you and never lose you again.

Because what feels bitter isn't really bitter until you've known true bitterness

The wounds aren't bitter. My inability to get over them is.

The fall isn't bitter. My inability to overcome it is.

The pain isn't bitter. My inability to heal is.

The bridge isn't bitter. My inability to cross it is.

The risk isn't bitter. My inability to reach you is.`,
    category: "Amortentia"
  },
  {
    id: "19",
    title: "Elegy of the Shoreline",
    author: "Jiya Parkash",
    date: "June 3, 2025",
    image: "/lovable-uploads/108c257a-32a8-48d6-bc89-fa3ea57606dd.png",
    content: `Elegy of the Shoreline
By Jiya Parkash

The grief that is embedded into my veins floods in and fills the vessel with despair and pain, and yet I choose to hold this same agitating pain very dear to me as it's all that is left of yours.

A current is very identical to grief. No one knows when it might strike.

It may hit the shore on a sunny day or an awful day.

It may be destructive. It may be beautiful.

Who knew that the same water that is vital to human life can destroy the fragility of a human being?`,
    category: "Amortentia"
  },
  {
    id: "18",
    title: "Look of Love",
    author: "Anjani Shastri",
    date: "June 3, 2025",
    image: "/lovable-uploads/c414d34e-ac42-4c94-81ac-f4f7bfab4932.png",
    content: `Look of Love
By Anjani Shastri

[This is a visual artwork piece - please view the full image to experience the complete artistic expression]`,
    category: "Brushes and Broomsticks"
  },
  {
    id: "17",
    title: "The Moment We Touched Souls",
    author: "Sweety Doshi",
    date: "June 1, 2025",
    image: "/lovable-uploads/b263283a-36da-4110-b551-fa116d379e8a.png",
    content: `The Moment We Touched Souls
By Sweety Doshi

In a moment it's so sweet and pure,
I held my child in my arms, my heart's allure.
Her tiny form, a sight so dear,
In my arms, dispelling every fear.

As she opened her eyes so bright and clear
Gazing at me with pure delight,
Her cry ceased with a peaceful hush,
In that moment, our souls did touch.

A bond forged in love's embrace,
In that sacred, tender space.
My happiest moment, forever cherished,
As her presence in my arms flourished`,
    category: "The Tortured Poets Department"
  },
  {
    id: "16",
    title: "Unspoken blades",
    author: "Sweety Doshi",
    date: "June 1, 2025",
    image: "/lovable-uploads/43fd4c77-d18b-4d86-9a77-6c45863ea0e1.png",
    content: `Unspoken blades
By Sweety Doshi

One cuts the skin, the other cuts the soul.
But only one can piece things together, or gently pull them apart. 
Still, I choose it every time.

The writer in me stays awake all night, because that's when my emotions arise,
In the quietest of waves and the softest of echoes,
In such a stillness, words can't always hold.

I try to catch them on paper, but they slip through my ink,
Too heavy to write, too tender to shape:
Even the gentlest line feels sharp at times.

It's strange how easily I write for the world,
And yet when I write for what truly matters, it is the silence that grows deeper.

Some letters stay unsent, some verses stay unread.
Not because they're unfinished, but because they speak too much of what remains unspoken.`,
    category: "The Tortured Poets Department"
  },
  {
    id: "15",
    title: "Beyond The Storm",
    author: "Aiyana Deshpande",
    date: "June 3, 2025",
    image: "/lovable-uploads/c634ae3f-369c-476d-9892-72339963f5b2.png",
    content: `Beyond The Storm
By Aiyana Deshpande

"Grandma, was it easy for you? Your journey?"
"Eventful, jovial, dismal, but far from easy."
"Your honesty deceits me. For in a few days, I am to
blossom into a woman."
"Why do my words betray you so, child?"
"I gripped tightly onto the notion that once I attained 
my adolescence, I would be brave, such as a
lionhearted soldier, ready to lay my life down for my
country."
"I believed everything would be easy, grandma. I
believed once I grew old enough, everything would
fall into place."
"That is where you are wrong, child. Age does not
dictate courage.
Pray tell me, however, why do you require it?"
"Because, grandma, my surroundings turn more
unbridled as the old moon sets and a new sun rises."
"I am forced to embark upon journeys to which I
see no end, to pass through tunnels where the light
of day is far away, too far for my eyes to wonder at
and hope."
"I am in dire need of hope, grandma, hope and
tenacity."
"Hope is in everyone, child. It is locked in a little
corner in your heart and is unleashed like a rabid
dog when the time comes."
"When is this sacrosanct 'time', grandma?"
"It is when everything around you is melancholy,
when all the world is telling you to go one way, to
feel a certain way and to do certain things, this
spark of hope will light a fire in your belly and
make you defy the odds."
"It will make you turn the other way."
"The way the aura shines. The way where
darkness is climaxed, and a new beacon of desire
is resurrected."
"That is hope."
"Do you feel hope, child?"
"Not now, no."
"Then take comfort in the simple idea that this is
not the end. You may feel as if your whole world is
crashing in on you, but the fact that you do not feel
an ounce of hope, means that it is not ready to
come out."
"Life is merely a game, my dear."
"A game many compete in, but one that few
master."
"A game hardly any play with all the devotion,
optimism, and sincerity they can muster."
"But a game that, when played correctly, will make
you appreciate every living second and unravel a
part of yourself you never knew existed."

…`,
    category: "Tales of Beedle the Bard"
  },
  {
    id: "14",
    title: "Shadows of Doubt",
    author: "Kavya Mehta",
    date: "May 18, 2025",
    image: "/lovable-uploads/d8f1461a-2cd0-41cd-a005-66fe3a07e63e.png",
    content: `Shadows of Doubt
By Kavya Mehta

Shadows creep where truth once stood
A labyrinth of lies where fact is concealed
My words feel hollow
The net's just like a cotton-filled pillow
I just don't know what's right, what's wrong
Will this trap continue lifelong?

I feel so helpless
So uninformed or rather I'd say misinformed
As if I'm being stormed
Have I been told lies all along?

My worry deepens day by day
Slowly but surely, they're taking away our say
For the evil and political intents
Of the media presidents
Who unfurl a curtain on the turn of events
To merely disorient and create dents
In the society resulting in immense torments

Be it the media traditional or social
Biases are on the way
Ranging from political to algorithmic
In the relentless war of profits rhythmic

If we're misinformed
How can we understand the world around us?
This is not fair
But if we can't change the world
Let's start the change within
Let's learn how to prevent these traps
For instance: prevent clickbaits and verify before we share
And beware of the red herring malware
It's time that we now care
Before the fog spreads its flair

An infinite quest, a shadowed screen
The search continues, an endless, endless pursuit
We must clear the shadows of doubt ourselves, the shadows of doubt ourselves !`,
    category: "The Tortured Poets Department"
  },
  {
    id: "13",
    title: "Entity",
    author: "Kavya Mehta",
    date: "May 18, 2025",
    image: "/lovable-uploads/05216fa1-582d-43bd-89d9-c51a93fe9d23.png",
    content: `Entity
By Kavya Mehta

I sit near the wide window,
Staring into the soulless sky,
Sinking into my thoughts,
I just ask why, why and why.

Stuck in a dilemma,
Just one thing comes to my mind,
Life is a different story for you and me
Distinct problems for mankind,
I console myself by remembering this key.

No one knows what goes on in my head,
No one knows the problems I face,
But in my heart I know that
Life is just another game.

It is filled of ups and downs,
A Ladder to climb and to come down,
An Infusion of Forlornness and Elation,
That's all what makes it LIFE – the unique creation.`,
    category: "The Tortured Poets Department"
  },
  {
    id: "12",
    title: "Whirlwind of Whispers",
    author: "Kavya Mehta",
    date: "May 18, 2025",
    image: "/lovable-uploads/0cfbcfe2-5e12-42b4-b6c0-93e1bda82f3b.png",
    content: `Whirlwind of Whispers
By Kavya Mehta

Volatile and capricious
Sometimes extremely vicious
Words aren't enough to describe them
Because they are unusual gems
As silent as whispers

At times, my heart skips a beat every second
At times, it's unable to reckon
At times, they cross over the line,
Overpower me so much
That I feel I've broken my spine.
As it does its work as softly as whispers

I feel trapped in a cage
Confined in a wrapper of rage
Which steals my ability to gauge

It is immortal

Enlivening and uniting the mortal
Imagine the one in me squealing
Yes, the unusual gem is my feeling
Just like blisters and twisters
It is truly a whirlwind of whispers`,
    category: "The Tortured Poets Department"
  },
  {
    id: "11",
    title: "Behind the severity of Severus Snape",
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
    id: "10",
    title: "Debriefing",
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
    id: "1",
    title: "Eye Contact",
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
    id: "2",
    title: "Wounds",
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
    id: "3",
    title: "Colorblind, Blood Red Heart",
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
    id: "4",
    title: "Rebirth",
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
    id: "5",
    title: "One Day",
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
    id: "6",
    title: "Narcissism",
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
    id: "7",
    title: "If Not For You",
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
    id: "8",
    title: "What I Said",
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
    id: "9",
    title: "Velcro",
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
