import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CustomButton } from "./ui/custom-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubscribeClick = () => {
    const event = new CustomEvent('openSubscribeDialog');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sorting Hat", path: "/house-sorting" },
    { name: "Dorm Designer", path: "/dorm-designer" },
    { name: "Classes", path: "/classes" },
    { name: "Writing", path: "/writing" },
    { name: "Issues", path: "/issues" },
    { name: "About", path: "/about" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 20 || isMenuOpen 
          ? "bg-background/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2"
          >
            <div className="relative w-7 h-8 md:w-8 md:h-9 font-magical text-primary flex items-center justify-center text-lg md:text-xl">
              D
              <span className="absolute animate-glow opacity-50 blur-sm w-full h-full"></span>
            </div>
            <h1 className="text-lg md:text-xl font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dumbledore's Army
            </h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary relative ${
                  location.pathname === link.path 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <CustomButton 
              onClick={handleSubscribeClick} 
              variant="default" 
              size="sm" 
              className="ml-2"
              type="button"
            >
              Subscribe
            </CustomButton>
          </nav>
          
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <div
        className={`md:hidden absolute w-full transition-all duration-300 origin-top ${
          isMenuOpen 
            ? "max-h-[480px] opacity-100" 
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-background/95 backdrop-blur-md`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-3 px-2 font-medium border-b border-border/50 transition-colors ${
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="py-4">
            <CustomButton 
              onClick={handleSubscribeClick} 
              variant="default" 
              className="w-full"
              type="button"
            >
              Subscribe
            </CustomButton>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
