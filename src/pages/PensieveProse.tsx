import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PensieveProse = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Pensieve Prose Competition | Dumbledore's Army</title>
        <meta name="description" content="Pensieve Prose - A writing competition celebrating the art of storytelling in the magical world. Featuring winning stories and competition details." />
      </Helmet>
      
      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Pensieve Prose
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-8 font-medium">
              A Writing Competition Celebrating Magical Storytelling
            </h2>
            <div className="prose prose-lg max-w-none text-white">
              <p className="text-lg leading-relaxed">
                Welcome to <strong>The Angelica Marie</strong> - our premier writing competition where talented authors craft stories that transport us to magical realms and explore the depths of human emotion through the lens of fantasy and wonder.
              </p>
            </div>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-magical text-white mb-6 text-center">Featured Winners</h3>
            <div className="grid grid-cols-1 gap-6">
              <Button
                onClick={() => setSelectedStory(selectedStory === "lyra" ? null : "lyra")}
                variant="outline"
                className="h-auto p-6 flex flex-col items-start gap-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <div className="flex items-center gap-4 w-full">
                  <img 
                    src="/lovable-uploads/825a8aa9-40fa-4d6e-a7f9-7832b2ae0570.png" 
                    alt="Lyra by Alexandra Renggli" 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="text-left">
                    <h4 className="text-xl font-semibold">"Lyra"</h4>
                    <p className="text-white/70">By Alexandra Renggli</p>
                    <p className="text-primary font-medium">Winner of Pensieve Prose Competition</p>
                  </div>
                </div>
              </Button>
              
              {selectedStory === "lyra" && (
                <div className="bg-white/5 rounded-lg border border-white/20 p-8 space-y-6">
                  <div className="text-center mb-8">
                    <img 
                      src="/lovable-uploads/825a8aa9-40fa-4d6e-a7f9-7832b2ae0570.png" 
                      alt="Classical painting of Orpheus with his lyre" 
                      className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                  
                  <h4 className="text-3xl font-magical text-white text-center">Lyra</h4>
                  <p className="text-white/70 text-center italic text-lg">By Alexandra Renggli</p>
                  <p className="text-primary font-medium text-center">Winner of Pensieve Prose Competition</p>
                  
                  <div className="prose prose-lg max-w-none text-white space-y-6">
                    <div className="text-white/90 leading-relaxed space-y-4">
                      <p className="italic">"Tell me, Prince of Thrace, why you would walk through hell willingly."</p>
                      
                      <p>The Lord of the Dead's voice echoes through the obsidian chamber. You kneel before Hades and Persephone, trembling, your breath catching in your throat. A thousand answers swarm your mind. But in the end, it's simple.</p>
                      
                      <p>You are scarcely a prince. Certainly not a hero. Not really a poet.</p>
                      
                      <p>You are Orpheus.</p>
                      
                      <p>And you say the only truth that matters:</p>
                      
                      <p className="italic">"Eurydice."</p>
                      
                      <p>The name leaves your lips like a prayer. A mercy. A release.</p>
                      
                      <p>"My lord," you say quietly, "this is not hell to the land of the living—and if it is, I will bear it. For it is where I have been since she died."</p>
                      
                      <p>Persephone, the Goddess of Spring, turns to her husband. Her face is soft, her eyes wet. Hades meets her gaze. Then he looks back at you.</p>
                      
                      <p>"Well then," he says. "I shall see your perception of heaven."</p>
                      
                      <p>His hand rises. A finger touches your temple.</p>
                      
                      <p>Memory washes over you like a wave.</p>
                      
                      <div className="border-t border-white/20 pt-6 mt-6">
                        <p>It had been a restless night. One of those evenings when the stars felt too far and the palace walls too tight. So you slipped away, your lyre slung across your back, and let your feet carry you toward the woods. You followed a deer trail that wound like music through the trees.</p>
                        
                        <p>The deeper you went, the clearer the air became. The moonlight filtered through the leaves in silver ribbons, and the world hushed itself to listen.</p>
                        
                        <p>You are Orpheus, and you play as you walk.</p>
                        
                        <p>The notes slip from your fingers like birds released to flight. Your voice joins them, soft and unburdened, lifting into the dark. You do not sing of heroism or legacy. You sing of longing. Of nights too quiet and hearts too full. Of the aching, fragile hope that beauty might be enough.</p>
                        
                        <p>The clearing finds you. A perfect circle framed in wildflowers, the grass soft, the night blooming around you.</p>
                        
                        <p>You sit, and truly let the lyre speak.</p>
                        
                        <p>The forest holds its breath.</p>
                        
                        <p>A fawn steps from the underbrush, ears twitching. A wolf slinks from shadow and lies down in stillness. Even the stars seem to draw near, watching.</p>
                        
                        <p>They would say later—even the rocks wept.</p>
                        
                        <p>Then, from the trees, a voice.</p>
                        
                        <p className="italic">"You play very well."</p>
                        
                        <p>You are Orpheus, and you turned back.</p>
                        
                        <p>She stood just within the ferns, half in shadow. Barefoot, brown-skinned, her hair curled and tangled with leaves, eyes green like deep summer. She wore a linen shift and a circlet of dried thyme and laurel. A nymph, perhaps. A daughter of the wild.</p>
                        
                        <p>She stepped into the moonlight, and your breath caught.</p>
                        
                        <p>"Thank you—"</p>
                        
                        <p>"Eurydice," she said, her voice warm with quiet humor. Her smile was small, but certain.</p>
                        
                        <p>"Eurydice," you repeated, tasting it. Eu-ry-di-ce. It was a song all its own.</p>
                        
                        <p>She approached without fear, and sat beside you as if she'd always known you. She patted the space beside her. You sat, careful, reverent, half-afraid the moment would vanish.</p>
                        
                        <p>"And you?" she asked.</p>
                        
                        <p>"Orpheus."</p>
                        
                        <p>"Prince of Thrace?"</p>
                        
                        <p>"In name only," you said, with a crooked smile. "I have no sword. No title that means anything. Just this." You lifted your lyre.</p>
                        
                        <p>She tilted her head. Considered you.</p>
                        
                        <p>"Then don't be a hero. Be Orpheus. 'Best of bards and best of poets' is more than enough."</p>
                        
                        <p>You blinked. No one had said it like that before—without expectation, without weight. Just… truth.</p>
                        
                        <p>She lay back in the grass, folding her arms beneath her head. You lay beside her.</p>
                        
                        <p>The stars overhead glittered, and you whispered, half-hopeful:</p>
                        
                        <p className="italic">"Do you know their names?"</p>
                        
                        <p>She raised a hand and pointed.</p>
                        
                        <p>"That one is Hercules. Once Heracles. The hero who killed his wife and children in a madness Hera sent, and spent the rest of his life repenting."</p>
                        
                        <p>You turned to look at her, startled.</p>
                        
                        <p>"You know, the only reason the Gods write heroes' tales in the sky is because they are moved by grief and despair. For what God has truly experienced it, their lives eternal and ensured? Pain is a novelty to them, and they love nothing more than novelties. That is why they make tragic beauties and beautiful tragedies of heroes."</p>
                        
                        <p>She pointed out each constellation in the sky, and you asked.</p>
                        
                        <p>She spoke of Hercules, the constellation based on the famed Heracles, a hero who had killed his family in a fit of madness brought by Zeus' wife, Hera, and you asked.</p>
                        
                        <p>She spoke of swift and strong Achilles going mad following the death of his lover, Patroclus, and witty Odysseus who had left a trail of red on every island to get back to his wife Penelope, and you asked.</p>
                        
                        <p>You asked and she answered, never condescending. Her voice held the calm certainty of rivers. You forgot time. You forgot yourself.</p>
                        
                        <p>When you stood at last to go, she called out.</p>
                        
                        <p>You are Orpheus, and you turned back.</p>
                        
                        <p>"One last thing," she said. "You may be 'Orpheus, best of bards and best of poets'—but simply 'Orpheus,' to me, is enough."</p>
                        
                        <p>She smiled. It was not the first time someone had looked at you.</p>
                        
                        <p>But it was the first time you were seen.</p>
                      </div>
                      
                      <div className="border-t border-white/20 pt-6 mt-6">
                        <p>The forest became your temple.</p>
                        
                        <p>Day after day, you returned. She would be waiting, or arrive soon after. You brought fruit; she brought flowers. You played songs. She named stars.</p>
                        
                        <p>She taught you the names of herbs, how to spot animal tracks, how to listen for rain in the silence. You told her stories your mother, the Muse, had whispered to you at birth. She listened without needing you to perform. She simply listened.</p>
                        
                        <p>The seasons turned.</p>
                        
                        <p>Your wedding was in spring. A full moon crowned the sky. The glade shimmered with torchlight, and the trees seemed to bend closer in blessing.</p>
                        
                        <p>Nymphs sang and poured wine. Fauns danced and tripped over each other. Someone strung laurel between trees. Someone else spread wild roses and lavender over the ground.</p>
                        
                        <p>You waited beneath an olive tree, your lyre pressed to your chest.</p>
                        
                        <p>When she appeared, you forgot how to breathe.</p>
                        
                        <p>She wore white linen, stitched with gold thread. Her feet were bare, adorned with thin strands of ivy. Her hair was crowned in violets and rosemary. The moonlight loved her.</p>
                        
                        <p>She stood before you and whispered:</p>
                        
                        <p className="italic">"Will you sing for me?"</p>
                        
                        <p>You nodded, throat tight, and lifted your lyre.</p>
                        
                        <p>You sang not as Orpheus, best of poets—but as Orpheus, the man who loved Eurydice. You sang of morning dew and stolen kisses, of hands touching in the dark, of the trembling, holy ache of finding someone who knows you.</p>
                        
                        <p>When the last note fell, you took her hands.</p>
                        
                        <p>"I only ask," you said, gazing into her eyes, "that you do not go where I cannot follow. I would leave my home, my palace, my legacy. I would leave everything I know and everyone I ever met. I would do all of this, as long as you are with me. So travel wherever you'd like, and I will not stop you. So look back, and see me following you, just a few steps behind. I would follow you beyond till death do us part. And if you stumble, my hands will always be at the ready to catch you. So will you take them for your husband?"</p>
                        
                        <p>Tears brimmed in emerald eyes. "I do."</p>
                        
                        <p>She kissed you. And for one moment, everything was perfect.</p>
                        
                        <p>Then—</p>
                        
                        <p>A scream.</p>
                        
                        <p>A snake hidden in the flowers.</p>
                        
                        <p>Fangs sinking into her heel.</p>
                        
                        <p>You held her as she fell.</p>
                        
                        <p>She had vowed not to go where you could not follow.</p>
                      </div>
                      
                      <div className="border-t border-white/20 pt-6 mt-6">
                        <p>Hades is silent.</p>
                        
                        <p>The Lord of the Dead, the King of Shadows, watches you with eyes as dark as Lethe's depths. Time means nothing to him—he who has seen all things die, and most things twice. Yet here you are, and somehow, you've surprised him.</p>
                        
                        <p>You kneel, the echoes of your lyre still whispering through the halls of the Underworld.</p>
                        
                        <p>Then, with a motion like a breath, he summons them.</p>
                        
                        <p>Clotho. Lachesis. Atropos.</p>
                        
                        <p>The Fates appear from the dark. You know their names without needing to be told. Clotho spins, Lachesis measures, Atropos waits—thread in one hand, shears in the other. And in that thread, glowing faint and red, is her soul.</p>
                        
                        <p>You came for this. You crossed Lethe. You made the dead weep. You made even Cerberus sleep.</p>
                        
                        <p>Hades speaks at last.</p>
                        
                        <p className="italic">"You may bring her back."</p>
                        
                        <p>Your breath catches.</p>
                        
                        <p>"But go now. She will follow. Do not speak. Do not look back. Not until both your feet have left this place."</p>
                        
                        <p>His voice lowers.</p>
                        
                        <p>"If you do, she is lost. And the Fates will not mend her thread again."</p>
                        
                        <p>The thread trembles in Atropos' hand.</p>
                        
                        <p>You are Orpheus. You have sung to the dead. You have made gods listen. But now, more than any song, more than any plea, this one thing is asked of you:</p>
                        
                        <p>Do not look back.</p>
                      </div>
                      
                      <div className="border-t border-white/20 pt-6 mt-6">
                        <p>Her hand is in yours.</p>
                        
                        <p>It is where it is meant to be, both shaped perfectly to complete the other. Her warmth is reassurance, a sliver of light in the dark and dreary Underworld. Your limbs ache, but what eats at you is not the soreness of your feet but the seed of worry that grows steadily for your wife. However, you don't dare to halt; to slow your footsteps on the rough ground of the mountain that holds the entrance to the land of the living at its top. As Charon had ferried you and Eurydice across the River Lethe for a second time, you tried to see a reflection of your beloved in the murky water, but as if it could sense his desire, it rippled and lapped, leaving your efforts in vain. The fear for her brings needles to your feet with each step, piercing and throbbing.</p>
                        
                        <p>The light peaked over the mountain's craggy crown, hope flaring in your broken but beating heart. You could feel each fragment slowly stitch itself together, with the future with her in mind—</p>
                        
                        <p>A stumble.</p>
                        
                        <p>Hands at the ready to catch her.</p>
                        
                        <p>You are Orpheus, and you turn back.</p>
                        
                        <p>It was second nature. And if you had not turned back, you would not be Orpheus. Because you would follow her in your dreams, in life, in death. Because there is no world where Orpheus would not catch Eurydice if she fell.</p>
                        
                        <p>You meet her eyes, eyes of the trees and leaves and grass above. The eyes of the woman you fell for first. The eyes that are your first and forever.</p>
                        
                        <p className="italic">"Eurydice—"</p>
                        
                        <p>"You're early." she smiles.</p>
                        
                        <p>You are scarcely a prince, and certainly not a poet. Except in emerald eyes. You are Orpheus, and you can only simply say the truth.</p>
                        
                        <p className="italic">"I missed you."</p>
                        
                        <p>She laughs, the sound the most lovely melody you've ever heard, and it is gone with her in the wind.</p>
                      </div>
                      
                      <div className="border-t border-white/20 pt-6 mt-6">
                        <p>Is it nighttime where you are? If it is, and you spy the stars twinkling in the inky black expanse of the night above, stop for a moment to raise your head.</p>
                        
                        <p>You may spot a constellation in the sky. It is called Lyra, for the lyre.</p>
                        
                        <p>As you know, Gods love novelty. Thus they make tragic beauties and beautiful tragedies of tales of heroes, painting them in Nyx's domain. This constellation, Lyra, was painted in the night sky for a boy who loved a girl so much he was willing to reverse the natural order for her. It told the tale of a boy who loved a girl so much his love for her would make a hero out of him, a bard with no weapon but his lyre and voice, yet even death made an exception for him.</p>
                        
                        <p>How, you ask, is this not just a tale of love? Well, then I shall tell you. Of a boy named Orpheus, and a nymph called Eurydice, who now walk hand in hand.</p>
                        
                        <p className="italic text-center mt-8">Sometimes he walks ahead,<br/>
                        and turns back to look at her whenever he likes.</p>
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

export default PensieveProse;