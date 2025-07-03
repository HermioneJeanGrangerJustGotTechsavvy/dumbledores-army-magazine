import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BlogPost } from "@/pages/Writing";
import { X } from "lucide-react";

interface WritingModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const WritingModal = ({ post, isOpen, onClose }: WritingModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-midnight-dark/95 border-white/20 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-white pr-8">
            {post.title}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="mb-6">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="mb-4">
            <p className="text-white/70 text-sm">
              {post.date} • by {post.author} • {post.category}
            </p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WritingModal;