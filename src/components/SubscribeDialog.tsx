
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { CustomButton } from "./ui/custom-button";
import { useToast } from "@/hooks/use-toast";

interface Subscriber {
  name: string;
  email: string;
}

export const SubscribeDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [subscriberName, setSubscriberName] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      onOpenChange(false);
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};
