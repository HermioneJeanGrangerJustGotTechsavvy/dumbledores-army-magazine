
import { Link } from "react-router-dom";
import { Post } from "@/utils/posts";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-4 text-white/70 text-sm mb-3">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          {post.author && <span>by {post.author}</span>}
        </div>
        <p className="text-white/80 mb-4">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
