import { Helmet } from "react-helmet";
import { useState } from "react";
import { Brain, Users, BookOpen, Leaf, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPEW = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    { name: "MENTAL HEALTH", icon: Brain, key: "mental-health" },
    { name: "GENDER EQUALITY", icon: Users, key: "gender-equality" },
    { name: "EDUCATION", icon: BookOpen, key: "education" },
    { name: "CLIMATE ACTION", icon: Leaf, key: "climate-action" },
    { name: "BULLYING", icon: Shield, key: "bullying" },
  ];

  const handleTopicClick = (topicKey: string) => {
    if (topicKey === "mental-health") {
      setSelectedTopic("mental-health");
    } else {
      setSelectedTopic("coming-soon");
    }
  };
  return (
    <>
      <Helmet>
        <title>SPEW - Society for the Promotion of Everyone's Welfare | Dumbledore's Army</title>
        <meta name="description" content="Society for the Promotion of Everyone's Welfare - A community for the betterment of you. Founded by Jiya Doshi, addressing global issues to increase awareness and improve conditions." />
      </Helmet>
      
      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              SPEW
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-8 font-medium">
              Society for the Promotion of Everyone's Welfare
            </h2>
            <div className="prose prose-lg max-w-none text-white">
              <p className="text-lg leading-relaxed">
                A community for the betterment of you and the world around you. Founded by <strong>Jiya Doshi</strong>, this is a space that addresses global issues around us, aiming to increase awareness, educate, campaign and improve the current global conditions.
              </p>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-magical text-white mb-6 text-center">Choose a Topic</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {topics.map((topic) => {
                  const IconComponent = topic.icon;
                  return (
                    <Button
                      key={topic.key}
                      onClick={() => handleTopicClick(topic.key)}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300"
                    >
                      <IconComponent size={24} />
                      <span className="text-sm font-medium text-center">{topic.name}</span>
                    </Button>
                  );
                })}
              </div>
              
              {selectedTopic === "coming-soon" && (
                <div className="text-center p-8 bg-white/5 rounded-lg border border-white/20">
                  <h4 className="text-xl font-magical text-white mb-2">Coming Soon</h4>
                  <p className="text-white/80">This topic is currently being developed. Check back soon!</p>
                </div>
              )}
              
              {selectedTopic === "mental-health" && (
                <div className="text-left p-8 bg-white/5 rounded-lg border border-white/20 max-w-4xl mx-auto space-y-12">
                  <div>
                    <h4 className="text-2xl font-magical text-white mb-2 text-center">The Five-Minute Mental Reset: Small Moments, Big Impact</h4>
                    <p className="text-white/70 text-center mb-6 italic">-Thalia Clem</p>
                    
                    <div className="prose prose-lg max-w-none text-white space-y-4">
                      <p className="text-white/90 leading-relaxed">
                        In a world that constantly asks for more—more productivity, more energy, more availability. It's easy to forget that your mind needs space to breathe. You don't always need a week-long vacation or an expensive retreat to feel better. Sometimes, all it takes is five minutes.
                      </p>
                      
                      <h5 className="text-xl font-semibold text-white mt-6 mb-3">Why Five Minutes Works:</h5>
                      <p className="text-white/90 leading-relaxed">
                        Our nervous system responds quickly to small, intentional pauses. Even a few minutes of calm can lower heart rate, reduce stress hormones, and shift our focus. Think of it as a quick reboot for your brain.
                      </p>
                      
                      <h5 className="text-xl font-semibold text-white mt-6 mb-3">Five Ways to Reset in Five Minutes:</h5>
                      <ol className="list-decimal list-inside space-y-3 text-white/90">
                        <li><strong>Box Breathing</strong>— Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat.</li>
                        <li><strong>Nature Glance</strong>— Step outside, notice the colors, textures, and shapes around you.</li>
                        <li><strong>Brain Dump</strong>— Write down everything swirling in your head without editing. Clear mental clutter.</li>
                        <li><strong>Stretch Break</strong>— Release tension with neck rolls, shoulder shrugs, and deep side stretches.</li>
                        <li><strong>Mindful Sip</strong>— Make tea or coffee and focus entirely on the warmth, aroma, and taste.</li>
                      </ol>
                      
                      <h5 className="text-xl font-semibold text-white mt-6 mb-3">The Takeaway</h5>
                      <p className="text-white/90 leading-relaxed">
                        You don't have to wait for burnout to take a break. By weaving tiny resets into your day, you train your mind to recover quickly, making you more resilient in the long run.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-8">
                    <h4 className="text-2xl font-magical text-white mb-2 text-center">Narcissus</h4>
                    <p className="text-white/70 text-center mb-6 italic">By Jiya Doshi</p>
                    
                    <div className="prose prose-lg max-w-none text-white space-y-4">
                      <div className="text-white/90 leading-relaxed space-y-4 font-serif">
                        <p>I watch it with unblinking eyes, a daydreamer with too much muse,<br/>
                        So this is how she put it all to use,<br/>
                        I watch the pages float up in the breeze, the writing almost engraved,<br/>
                        And they all said I was Narcissus staring at it all day.</p>

                        <p>But I didn't stare at it, I stared at all that's changed,<br/>
                        I watch my reflection contort in ways I can't explain,<br/>
                        And I don't look in mirrors, I smash them under my fist,<br/>
                        Because the reflection isn't real if it doesn't boil down to this.</p>

                        <p>I watch a young girl lay on an arrow bed,<br/>
                        I watch her take risks, and take losing to her head,<br/>
                        And she obsesses over being perfect,<br/>
                        Saying that the 'someday' wasn't good enough for the present.</p>

                        <p>Because they all told her that someday her pain would ease,<br/>
                        But all it led to was more and more poetry,<br/>
                        It led to her flinching when someone said she was good enough,<br/>
                        Because she wanted to be more than just…</p>

                        <p>Pretending to love herself to hide her vulnerabilities,<br/>
                        She sat down writing for hours in that diary,<br/>
                        And they all called her 'Narcissus',<br/>
                        Because how can someone have so much to say about one day?</p>

                        <p>They made her believe that she was narcissistic as she was breaking down,<br/>
                        Like a sandcastle by the shore with no other option but to drown,<br/>
                        And as the water seeped in, she watched herself break apart,<br/>
                        But it wasn't the sea who swallowed her, it was her own heart.</p>

                        <p>And now I stare at 'Narcissus' like it's a different lifetime,<br/>
                        A boarded-up window not the fortress in which I now reside,<br/>
                        But what if Narcissus looked down and could see,<br/>
                        All that he could someday be?</p>

                        <p>What if Narcissus pretended to be the best?<br/>
                        What if he lied to his own self?<br/>
                        What if he daydreamed and saw a better man,<br/>
                        Who could be so much better than he ever can?</p>

                        <p>But no one will understand,<br/>
                        No one will realize that,<br/>
                        And now that there's so much more to it,<br/>
                        I don't mind being Narcissus.</p>
                      </div>
                      
                      <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/30">
                        <p className="text-white/80 italic text-sm leading-relaxed">
                          <strong>Note from Jiya:</strong> We have, over the years, demonized self-reflection, perfectionism and narcissism. But the act of turning inward is not vanity - it's survival, metamorphosis, and the very fuel of art. Self-obsession, when reframed, is really self-preservation in a world that refuses to validate vulnerability. And that's the aim of this poem - to help you embrace yourself the way you are.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SPEW;