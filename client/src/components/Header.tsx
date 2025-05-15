import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Anchor } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-background py-3'
      } text-foreground border-b border-primary/10`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a href="#home" className="flex items-center">
            <img 
              src="/images/yardbros-logo.png" 
              alt="Yard Bros Landscaping Logo" 
              className="h-12 md:h-14"
            />
          </a>
        </motion.div>
        
        <div className="flex items-center gap-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="#quotes"
              className="hidden md:inline-flex mr-4 bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
            >
              <Anchor className="w-4 h-4 mr-2" />
              Get a Free Quote
            </a>
          </motion.div>
          
          <ThemeToggle />
          
          <button 
            className="md:hidden text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary p-1.5 rounded-md" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu - slide down animation */}
      <motion.div 
        className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg border-t border-primary/10`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 py-4 overflow-hidden">
          <div className="flex flex-col space-y-3">
            <a 
              href="#quotes" 
              className="flex items-center justify-center gap-2 py-3 px-4 bg-accent text-white rounded-md shadow-sm"
              onClick={closeMobileMenu}
            >
              <Anchor className="w-4 h-4" />
              Get a Free Quote
            </a>
            
            <div className="h-px w-full bg-primary/10 my-2"></div>
            
            <a href="#services" className="flex items-center py-2 px-3 hover:bg-primary/10 rounded-md transition-colors" onClick={closeMobileMenu}>Our Services</a>
            <a href="#sod" className="flex items-center py-2 px-3 hover:bg-primary/10 rounded-md transition-colors" onClick={closeMobileMenu}>Our Sod</a>
            <a href="#calculator" className="flex items-center py-2 px-3 hover:bg-primary/10 rounded-md transition-colors" onClick={closeMobileMenu}>Topsoil Calculator</a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
