import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getBlogPosts } from "@/services/contentful";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

// This type definition will be useful when integrating with a CMS
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

const Writing = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    
    loadPosts();

    const handleOpenSubscribeDialog = () => {
      setShowSubscribeDialog(true);
    };

    window.addEventListener('openSubscribeDialog', handleOpenSubscribeDialog);
    return () => {
      window.removeEventListener('openSubscribeDialog', handleOpenSubscribeDialog);
    };
  }, [toast]);

  // This function will be called when clicking on a post to view the full content
  const handleReadMore = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setDialogOpen(true);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!subscribeEmail || !/^\S+@\S+\.\S+$/.test(subscribeEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Get existing subscribers from localStorage
    const savedSubscribers = localStorage.getItem('magazine-subscribers');
    const currentSubscribers = savedSubscribers ? JSON.parse(savedSubscribers) : [];
    
    // Check if email already exists
    if (currentSubscribers.includes(subscribeEmail)) {
      toast({
        title: "Already Subscribed",
        description: "This email is already subscribed to our magazine.",
      });
      setSubscribeEmail("");
      setShowSubscribeDialog(false);
      return;
    }
    
    setIsSubmitting(true);
    
    // Add the new subscriber
    const updatedSubscribers = [...currentSubscribers, subscribeEmail];
    
    // Save to localStorage
    localStorage.setItem('magazine-subscribers', JSON.stringify(updatedSubscribers));
    
    toast({
      title: "Subscription Successful!",
      description: "Thank you for subscribing to Dumbledore's Army Magazine.",
    });
    
    setSubscribeEmail("");
    setIsSubmitting(false);
    setShowSubscribeDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Writing</h1>
        <p className="text-white max-w-3xl mx-auto">
          A collection of articles, tips, and stories about magical writing from the wizarding world.
        </p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-midnight-dark/70 backdrop-blur-sm border border-white/10 shadow-lg">
              <div className="h-48 bg-gray-800 animate-pulse"></div>
              <CardHeader>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-1/3"></div>
                <div className="h-6 bg-gray-700 rounded animate-pulse w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-full"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-4/6"></div>
              </CardContent>
              <CardFooter>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={post.id}
              className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-primary text-sm mb-2">{post.date} • by {post.author}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                <p className="text-white/80 mb-4">{post.excerpt}</p>
                <CustomButton 
                  variant="link" 
                  className="text-primary p-0"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className={`mt-16 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center transition-all duration-700 delay-450 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-2xl font-bold mb-3 text-white">Submit Your Writing</h2>
        <p className="text-white mb-4">
          Are you a passionate writer with stories from the wizarding world to share? We'd love to feature your work!
        </p>
        <CustomButton variant="default" asChild>
          <Link to="/about">
            Contact Us
          </Link>
        </CustomButton>
      </div>

      {/* Dialog to display full post content */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-midnight-dark/95 border border-white/10 text-white">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedPost.title}</DialogTitle>
                <DialogDescription className="text-primary">
                  {selectedPost.date} • by {selectedPost.author}
                </DialogDescription>
              </DialogHeader>
              <div className="my-4">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-64 object-cover rounded-md mb-6"
                />
                <div className="whitespace-pre-line leading-relaxed">
                  {selectedPost.content}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Subscribe Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogTrigger>
          {/* Trigger button remains hidden as we control dialog open state programmatically */}
        </DialogTrigger>
        <DialogContent className="bg-midnight-dark/95 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Subscribe to Our Magazine</DialogTitle>
            <DialogDescription className="text-primary">
              Join our magical community and stay updated with the latest stories.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
            <Input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-white/10 border border-white/20"
              disabled={isSubmitting}
            />
            <div className="flex justify-end">
              <CustomButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </CustomButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Writing;
