import { useState, useEffect, useMemo } from "react";
import { getAllPosts } from "@/utils/posts";
import PostCard from "@/components/PostCard";
import TagButton from "@/components/TagButton";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

const Writing = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState(new Set<string>());

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTags.size === 0 || 
                        post.tags.some(tag => selectedTags.has(tag));
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTags]);

  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  const toggleTag = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (selectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
          Writing
        </h1>
        <p className="text-white/80 max-w-3xl mx-auto">
          A collection of thoughts, experiences, and learnings.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full md:w-auto px-4 py-2 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 md:mb-0"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {allTags.map((tag) => (
            <TagButton
              key={tag}
              tag={tag}
              isSelected={selectedTags.has(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <div className="text-center mt-8 text-white/60">
          No posts found.
        </div>
      )}
    </div>
  );
};

export default Writing;
