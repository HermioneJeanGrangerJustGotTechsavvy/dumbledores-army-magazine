
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

  const magazineFeatures = [
    {
      title: "House Sorting",
      description: "Discover which Hogwarts house represents your true character.",
      icon: <Wand2 className="h-6 w-6 text-gryffindor-primary" />,
      delay: 100,
      link: "/house-sorting"
    },
    {
      title: "Dorm Designer",
      description: "Create your ideal Hogwarts dormitory with magical furniture and decorations.",
      icon: <Bookmark className="h-6 w-6 text-hufflepuff-primary" />,
      delay: 200,
      link: "/dorm-designer"
    },
    {
      title: "Magical Classes",
      description: "Learn the art of magical writing through our creative courses.",
      icon: <BookOpen className="h-6 w-6 text-ravenclaw-primary" />,
      delay: 300,
      link: "/classes"
    },
    {
      title: "Latest Issue",
      description: "Read the latest articles, stories, and news from the wizarding world.",
      icon: <ScrollText className="h-6 w-6 text-slytherin-primary" />,
      delay: 400,
      link: "/"
    }
  ];

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
              <CustomButton variant="default" size="lg" asChild>
                <Link to="/house-sorting">
                  Get Sorted <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CustomButton>
              
              <CustomButton variant="outline" size="lg" asChild>
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

      {/* Features Section */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Magical Experiences</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore interactive features designed to immerse you in the wizarding world while developing your creative talents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {magazineFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 transition-all duration-700 delay-${feature.delay} ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-muted mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Issue Preview */}
      <section className="w-full py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <p className="text-sm font-medium text-secondary mb-2">LATEST ISSUE</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The Art of Magical Writing</h2>
                <p className="text-foreground/70 mb-6">
                  In this month's issue, we explore the techniques of crafting compelling magical narratives, with exclusive interviews from renowned wizarding authors and tips from Hogwarts professors.
                </p>
                
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-gryffindor-primary/10 p-1">
                      <div className="w-4 h-4 rounded-full bg-gryffindor-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Spellbinding Poetry</h4>
                      <p className="text-sm text-foreground/70">Learn techniques for imbuing your verses with magical imagery.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-ravenclaw-primary/10 p-1">
                      <div className="w-4 h-4 rounded-full bg-ravenclaw-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Character Development</h4>
                      <p className="text-sm text-foreground/70">Craft memorable magical personalities for your stories.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-slytherin-primary/10 p-1">
                      <div className="w-4 h-4 rounded-full bg-slytherin-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Worldbuilding Workshop</h4>
                      <p className="text-sm text-foreground/70">Create rich, immersive magical settings that captivate readers.</p>
                    </div>
                  </div>
                </div>
                
                <CustomButton variant="default" asChild>
                  <Link to="/classes">
                    Begin Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CustomButton>
              </div>
              
              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-[3/4] bg-muted relative flex items-center justify-center magic-shine">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                    alt="Magazine cover featuring a magical landscape" 
                    className="object-cover w-full h-full opacity-90 mix-blend-overlay" 
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white/80 text-sm">Volume 42 • Issue 7</p>
                    <h3 className="text-white text-2xl font-bold font-magical">The Art of Magical Writing</h3>
                  </div>
                </div>
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
