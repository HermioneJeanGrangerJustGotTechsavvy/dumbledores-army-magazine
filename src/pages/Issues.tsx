import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Copy, CheckCheck, X, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

// Sample issues data - in a real implementation, this would come from a CMS or database
const sampleIssues = [
  {
    id: 1,
    title: "Emotions",
    description: "Exploring the depths of human emotion through magical storytelling",
    coverImage: "/lovable-uploads/emotions-issue-cover.png",
    date: "19th September, 2025",
    volume: "",
    issue: "Issue 1",
    pdfUrl: "https://www.canva.com/design/DAGuAP8JRf4/u2vPt1oFOFxGBFMMKiwL5A/edit?utm_content=DAGuAP8JRf4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
  }
];

// Admin password for accessing subscriber list - in a real app, this would be secured properly
const ADMIN_PASSWORD = "alohomora.unlock";

// Interface for subscriber information
interface Subscriber {
  name: string;
  email: string;
}

const Issues = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("issues");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [copied, setCopied] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setLoaded(true);
    // Load subscribers from localStorage on component mount
    const savedSubscribers = localStorage.getItem('magazine-subscribers');
    if (savedSubscribers) {
      const parsedData = JSON.parse(savedSubscribers);
      
      // Check if we need to convert old format to new format
      if (parsedData.length > 0 && typeof parsedData[0] === 'string') {
        // Convert old format (string[]) to new format (Subscriber[])
        const convertedData: Subscriber[] = parsedData.map((email: string) => ({
          name: 'Subscriber',  // Default name for old subscribers
          email
        }));
        setSubscribers(convertedData);
        // Save the converted data back to localStorage
        localStorage.setItem('magazine-subscribers', JSON.stringify(convertedData));
      } else {
        // New format, use as is
        setSubscribers(parsedData);
      }
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return;
    }
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    if (subscribers.some(sub => sub.email === email)) {
      toast({
        title: "Already Subscribed",
        description: "This email is already subscribed to our magazine.",
      });
      setName("");
      setEmail("");
      return;
    }
    
    setIsSubmitting(true);
    
    // Add the new subscriber with name and email
    const newSubscriber: Subscriber = {
      name: name,
      email: email
    };
    
    const updatedSubscribers = [...subscribers, newSubscriber];
    
    // Save to localStorage
    localStorage.setItem('magazine-subscribers', JSON.stringify(updatedSubscribers));
    setSubscribers(updatedSubscribers);
    
    toast({
      title: "Subscription Successful!",
      description: `Thank you ${name} for subscribing to Dumbledore's Army Magazine.`,
    });
    
    setName("");
    setEmail("");
    setIsSubmitting(false);
  };

  const handleCopyEmails = () => {
    const emailsText = subscribers.map(sub => `${sub.name} <${sub.email}>`).join(', ');
    navigator.clipboard.writeText(emailsText);
    setCopied(true);
    
    toast({
      title: "Copied to Clipboard",
      description: `${subscribers.length} subscriber entries have been copied.`,
    });
    
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveSubscriber = (emailToRemove: string) => {
    const updatedSubscribers = subscribers.filter(sub => sub.email !== emailToRemove);
    localStorage.setItem('magazine-subscribers', JSON.stringify(updatedSubscribers));
    setSubscribers(updatedSubscribers);
    
    toast({
      title: "Subscriber Removed",
      description: `The subscriber has been removed from the list.`,
    });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowSubscribers(true);
      setAdminPassword("");
      
      toast({
        title: "Administrator Access Granted",
        description: "You now have access to the subscriber list.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "The password you entered is incorrect.",
        variant: "destructive"
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShowSubscribers(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Magazine Issues</h1>
        <p className="text-white max-w-3xl mx-auto mb-8">
          Browse and download all past issues of Dumbledore's Army Magazine in PDF format.
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <CustomButton
            variant={activeTab === "issues" ? "default" : "outline"}
            onClick={() => setActiveTab("issues")}
            className={activeTab === "issues" ? "" : "text-white border-white/30 hover:bg-white/10"}
          >
            Magazine Issues
          </CustomButton>
          <CustomButton
            variant={activeTab === "competitions" ? "default" : "outline"}
            onClick={() => setActiveTab("competitions")}
            className={activeTab === "competitions" ? "" : "text-white border-white/30 hover:bg-white/10"}
          >
            Competitions
          </CustomButton>
        </div>
      </div>
      
      {activeTab === "issues" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sampleIssues.map((issue, index) => (
          <div 
            key={issue.id}
            className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              <img 
                src={issue.coverImage} 
                alt={issue.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <div className="text-white/80 text-sm">{issue.issue}</div>
                <div className="text-primary text-sm font-medium">{issue.date}</div>
                <h3 className="text-lg font-bold text-white mt-1">{issue.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-white/80 text-sm mb-4">{issue.description}</p>
              <CustomButton variant="default" className="w-full" asChild>
                <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </CustomButton>
            </div>
          </div>
        ))}
        </div>
      )}
      
      {activeTab === "competitions" && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Pensieve Prose</h2>
            <p className="text-white/80 text-lg mb-8 text-center">
              A writing competition celebrating the art of storytelling in the magical world
            </p>
            
            <div className="text-center">
              <CustomButton 
                variant="default" 
                className="mb-6"
                onClick={() => window.open('/pensieve-prose', '_blank')}
              >
                View Competition Details
              </CustomButton>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Recent Winner</h3>
              <div className="flex items-center gap-4">
                <img 
                  src="/lovable-uploads/825a8aa9-40fa-4d6e-a7f9-7832b2ae0570.png" 
                  alt="Lyra by Alexandra Renggli" 
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-semibold text-white">"Lyra"</h4>
                  <p className="text-white/70">By Alexandra Renggli</p>
                  <p className="text-primary font-medium">Winner of Pensieve Prose Competition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`mt-16 bg-primary/10 border border-primary/20 rounded-lg p-8 text-center transition-all duration-700 delay-450 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-2xl font-bold mb-3 text-white">Subscribe to Dumbledore's Army Magazine</h2>
        <p className="text-white mb-6">
          Get early access to new issues and exclusive content delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex flex-col gap-3 mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="h-10 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isSubmitting}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-10 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isSubmitting}
            />
            <CustomButton 
              type="submit" 
              disabled={isSubmitting}
              className="sm:w-auto"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </CustomButton>
          </div>
          <p className="text-xs text-white/60 mt-3">
            We'll never share your email with anyone else. You can unsubscribe at any time.
          </p>
        </form>
        
        <div className="mt-8 text-left">
          {!isAuthenticated ? (
            <div>
              <CustomButton
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
                onClick={() => setShowSubscribers(!showSubscribers)}
              >
                {showSubscribers ? "Hide Admin Login" : "Admin Access"}
              </CustomButton>
              
              {showSubscribers && (
                <form onSubmit={handleAdminLogin} className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Administrator Login</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="h-10 bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                      >
                        {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <CustomButton type="submit" className="sm:w-auto">
                      Login
                    </CustomButton>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Subscriber Management</h3>
                <CustomButton
                  variant="outline"
                  size="sm"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={logout}
                >
                  Logout
                </CustomButton>
              </div>
              
              <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Subscribers ({subscribers.length})</h3>
                  {subscribers.length > 0 && (
                    <CustomButton
                      variant="outline"
                      size="sm"
                      className="text-white border-white/30 hover:bg-white/10"
                      onClick={handleCopyEmails}
                    >
                      {copied ? <CheckCheck className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied!" : "Copy All Emails"}
                    </CustomButton>
                  )}
                </div>
                
                {subscribers.length === 0 ? (
                  <p className="text-white/70 text-center py-4">No subscribers yet</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    {subscribers.map((subscriber, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                        <div>
                          <span className="text-white font-medium">{subscriber.name}</span>
                          <span className="text-white/70 ml-2">{subscriber.email}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveSubscriber(subscriber.email)}
                          className="text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10"
                          aria-label="Remove subscriber"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issues;
