
import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, BookOpen, Feather, Sparkles } from "lucide-react";
import { Post } from "@/utils/posts";
import { getBlogPosts } from "@/services/contentful";

const Writing = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(posts.map(post => post.category)))];

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "poetry":
        return <Feather className="h-4 w-4" />;
      case "fiction":
        return <BookOpen className="h-4 w-4" />;
      case "creative":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Art of Magical Writing
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Discover the enchanting world of creative writing through our curated collection of stories, poems, and literary works that capture the essence of magic in words.
            </p>
            <CustomButton size="lg" className="bg-primary hover:bg-primary/90">
              Start Reading
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {post.image && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-sm text-foreground/60">
                          <Clock className="h-3 w-3 mr-1" />
                          {getReadingTime(post.content)} min read
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-foreground/60">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                      <CustomButton 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        Read More
                      </CustomButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured This Month</h2>
            <p className="text-foreground/70 mb-8">
              Dive into our most captivating stories and poems, carefully selected to showcase the art of magical storytelling.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.slice(0, 2).map((post) => (
                <Card key={post.id} className="text-left">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Featured</Badge>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                      <span>{post.author}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <CustomButton className="w-full">
                      Read Full Story
                    </CustomButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Writing;
