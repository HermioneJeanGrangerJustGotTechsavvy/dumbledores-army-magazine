
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="animate-float mb-6">
          <span className="inline-block text-8xl font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">404</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-foreground/70 mb-8">
          It seems this magical page has vanished or perhaps never existed.
          Even the best locator spells couldn't find what you're looking for.
        </p>
        
        <CustomButton asChild>
          <Link to="/">
            Return to the Great Hall
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
