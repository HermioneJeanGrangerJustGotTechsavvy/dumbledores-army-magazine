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
                <div className="text-center p-8 bg-white/5 rounded-lg border border-white/20">
                  <h4 className="text-xl font-magical text-white mb-4">Mental Health</h4>
                  <p className="text-white/80">Content for mental health will be added here.</p>
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