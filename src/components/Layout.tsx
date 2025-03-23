
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Apply page transition animation
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add('animate-page-in');
      const timer = setTimeout(() => {
        mainContent.classList.remove('animate-page-in');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-midnight text-midnight-foreground night-sky">
      <Navbar />
      <main id="main-content" className="flex-grow pt-16 md:pt-20 relative z-10">
        {children}
      </main>
      <footer className="bg-midnight-dark text-midnight-foreground py-6 mt-12 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-magical text-lg text-stars">Dumbledore's Army Magazine</h3>
              <p className="text-sm opacity-80">© {new Date().getFullYear()} Wizarding World Publications</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-midnight-foreground hover:text-stars transition-colors duration-200">About</a>
              <a href="#" className="text-midnight-foreground hover:text-stars transition-colors duration-200">Contact</a>
              <a href="#" className="text-midnight-foreground hover:text-stars transition-colors duration-200">Subscribe</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Randomly positioned stars for night sky effect */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={i}
          className="star"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default Layout;
