
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Wand2, Bookmark, ScrollText } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    toast("Welcome to Dumbledore's Army Magazine!", {
      description: "Explore the wizarding world and unleash your creativity!",
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center overflow-hidden parchment-bg border-b border-hogwarts-gold/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30"></div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10 py-12 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="inline-block mb-4 px-3 py-1 text-sm font-medium bg-secondary/20 rounded-full text-primary animate-float">
                The Official Magazine for Aspiring Witches and Wizards
              </p>
            </div>
            
            <h1 className={`mb-6 text-4xl md:text-6xl font-bold leading-tight transition-all duration-700 delay-150 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="block font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dumbledore's Army
              </span>
              <span className="block mt-2 font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Magazine
              </span>
            </h1>
            
            <h2 className={`mb-4 text-2xl md:text-3xl font-magical text-gryffindor-primary transition-all duration-700 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              "Hogwarts is Our Home"
            </h2>
            
            <p className={`mb-8 md:text-lg text-foreground/80 max-w-2xl mx-auto transition-all duration-700 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Presenting the magical crossover like never before. Discover the magic of storytelling, get sorted into your Hogwarts house, design your dream dormitory, and master the art of wizarding creativity.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-450 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <CustomButton variant="default" size="lg" asChild className="text-black">
                <Link to="/house-sorting">
                  Get Sorted <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CustomButton>
              
              <CustomButton variant="outline" size="lg" asChild className="text-black">
                <Link to="/classes">
                  Explore Classes
                </Link>
              </CustomButton>
            </div>
          </div>
        </div>
        
        {/* Decorative magical particles */}
        <div className="absolute inset-0 pointer-events-none magic-particles-container"></div>
      </section>

      {/* Latest Issue Preview */}
      <section className="w-full py-16 bg-blue-100">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <p className="text-sm font-medium text-secondary mb-2">LATEST ISSUE</p>
                <a 
                  href="https://www.canva.com/design/DAGuAP8JRf4/u2vPt1oFOFxGBFMMKiwL5A/edit?utm_content=DAGuAP8JRf4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">EMOTIONS</h2>
                </a>
                <p className="text-foreground/70 mb-6">
                  Editor-in-Chief Jiya Doshi starts the magazine with a bang with a poetic detonation, an issue carved from heartbreak, stitched with rage, dipped in longing, and sealed with the quiet ache of words unsaid.
                </p>
                <p className="text-foreground/70 mb-6">
                  So take a deep breath.
                </p>
                <p className="text-foreground/70 mb-6">
                  Get ready to confront the things you've buried.
                </p>
                <p className="text-foreground/70 mb-6">
                  And remember:
                </p>
                <p className="text-foreground/70 mb-6 font-medium">
                  Here, we write, perform, draw, create and capture what we can't say.
                </p>
                
                <CustomButton variant="default" asChild>
                  <Link to="/writing">
                    Begin Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CustomButton>
              </div>
              
              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
                <a 
                  href="https://www.canva.com/design/DAGuAP8JRf4/u2vPt1oFOFxGBFMMKiwL5A/edit?utm_content=DAGuAP8JRf4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-[3/4] bg-gray-200 relative flex items-center justify-center hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                      alt="Emotions magazine cover - Issue 1" 
                      className="object-cover w-full h-full" 
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/lovable-uploads/emotions-magazine-final.png";
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white/80 text-sm">Issue 1</p>
                      <h3 className="text-white text-2xl font-bold font-magical">EMOTIONS</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your Magical Journey Today</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
            Get sorted into your Hogwarts house, design your dream dormitory, and unlock your creative potential with Dumbledore's Army Magazine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CustomButton variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/house-sorting">
                Try House Sorting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CustomButton>
            
            <CustomButton variant="default" size="lg" asChild>
              <Link to="/dorm-designer">
                Design Your Dorm
              </Link>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
