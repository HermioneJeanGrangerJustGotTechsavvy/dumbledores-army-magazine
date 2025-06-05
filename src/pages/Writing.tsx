import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getBlogPosts } from "@/services/contentful";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter, Book } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  content: string;
  category?: string;
}

interface Subscriber {
  name: string;
  email: string;
}

const Writing = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [subscriberName, setSubscriberName] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        setPosts(data);
        setFilteredPosts(data);
        
        // Extract unique months, authors, and categories
        const months = [...new Set(data.map(post => {
          const dateParts = post.date.split(" ");
          return dateParts[0]; // Get the month part
        }))];
        
        const authors = [...new Set(data.flatMap(post => post.author.split(", ")))];
        const categories = [...new Set(data.map(post => post.category).filter(Boolean))];
        
        setAvailableMonths(months);
        setAvailableAuthors(authors);
        setAvailableCategories(categories);
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
      console.log("Event received, opening subscribe dialog");
      setShowSubscribeDialog(true);
    };

    window.removeEventListener('openSubscribeDialog', handleOpenSubscribeDialog);
    window.addEventListener('openSubscribeDialog', handleOpenSubscribeDialog);
    
    return () => {
      window.removeEventListener('openSubscribeDialog', handleOpenSubscribeDialog);
    };
  }, [toast]);

  // Filter posts when filter options change
  useEffect(() => {
    if (posts.length === 0) return;
    
    let result = [...posts];
    
    if (selectedMonth && selectedMonth !== "all") {
      result = result.filter(post => post.date.includes(selectedMonth));
    }
    
    if (selectedAuthor && selectedAuthor !== "all") {
      result = result.filter(post => post.author.includes(selectedAuthor));
    }
    
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(result);
  }, [selectedMonth, selectedAuthor, selectedCategory, posts]);

  const handleReadMore = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setDialogOpen(true);
    }
  };

  const handleClearFilters = () => {
    setSelectedMonth("all");
    setSelectedAuthor("all");
    setSelectedCategory("all");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriberName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return;
    }
    
    if (!subscribeEmail || !/^\S+@\S+\.\S+$/.test(subscribeEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    const savedSubscribers = localStorage.getItem('magazine-subscribers');
    let currentSubscribers: Subscriber[] = savedSubscribers ? JSON.parse(savedSubscribers) : [];
    
    if (currentSubscribers.some(sub => sub.email === subscribeEmail)) {
      toast({
        title: "Already Subscribed",
        description: "This email is already subscribed to our magazine.",
      });
      setSubscriberName("");
      setSubscribeEmail("");
      setShowSubscribeDialog(false);
      return;
    }
    
    setIsSubmitting(true);
    
    const newSubscriber: Subscriber = {
      name: subscriberName,
      email: subscribeEmail
    };
    
    const updatedSubscribers = [...currentSubscribers, newSubscriber];
    
    localStorage.setItem('magazine-subscribers', JSON.stringify(updatedSubscribers));
    
    toast({
      title: "Subscription Successful!",
      description: `Thank you ${subscriberName} for subscribing to Dumbledore's Army Magazine.`,
    });
    
    setSubscriberName("");
    setSubscribeEmail("");
    setIsSubmitting(false);
    setShowSubscribeDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Writing</h1>
        <p className="text-white max-w-3xl mx-auto">
          A collection of creativity from around the wizarding world.
        </p>
      </div>
      
      {/* Filter controls */}
      <div className={`mb-8 flex flex-col md:flex-row gap-4 items-center justify-between transition-all duration-700 delay-100 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="w-full sm:w-40">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {availableMonths.map((month) => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-40">
            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {availableAuthors.map((author) => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-52">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Options
              </CustomButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleClearFilters}>
                Clear All Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${150 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              {post.category === "Brushes and Broomsticks" ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <AspectRatio ratio={16/9} className="bg-white">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </AspectRatio>
              )}
              
              <div className="p-6">
                {post.category && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary mb-2">
                    <Book className="w-3 h-3 mr-1" />
                    {post.category}
                  </div>
                )}
                <div className="text-white text-sm mb-2">{post.date} • by {post.author}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                <p className="text-white/80 mb-4">{post.excerpt}</p>
                <CustomButton 
                  variant="link" 
                  className="text-white p-0"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-4">No posts matching your filters</h3>
          <CustomButton onClick={handleClearFilters}>Clear Filters</CustomButton>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-midnight-dark/95 border border-white/10 text-white">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-4xl font-bold text-center mb-2 text-white">
                  {selectedPost.title}
                </DialogTitle>
                <DialogDescription className="text-2xl font-bold text-center text-primary mb-4">
                  by {selectedPost.author}
                </DialogDescription>
                {selectedPost.category && (
                  <div className="flex justify-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary mb-2">
                      <Book className="w-4 h-4 mr-2" />
                      {selectedPost.category}
                    </div>
                  </div>
                )}
              </DialogHeader>
              <div className="my-4">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full max-h-96 object-contain bg-white rounded-md mb-6"
                />
                <div className="whitespace-pre-line leading-relaxed">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => {
                    const isTitleLine = /^(Eye Contact Poem by Jiya Doshi|Wounds Poem by Durva Shah|Look of Love|The Moment We Touched Souls|Unspoken blades|Beyond The Storm)$/.test(paragraph.trim());
                    
                    return (
                      <div 
                        key={index} 
                        className={`mb-6 ${
                          isTitleLine 
                            ? 'text-3xl font-bold text-white text-center' 
                            : 'text-left'
                        }`}
                      >
                        {paragraph}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent className="bg-midnight-dark/95 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Subscribe to Our Magazine</DialogTitle>
            <DialogDescription className="text-primary">
              Join our magical community and stay updated with the latest stories.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
              <Input
                id="name"
                type="text"
                value={subscriberName}
                onChange={(e) => setSubscriberName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white/10 border border-white/20"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
              <Input
                id="email"
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/10 border border-white/20"
                disabled={isSubmitting}
              />
            </div>
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
