import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

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
          ? 'bg-primary/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-primary py-3'
      } text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-heading font-bold">Yard Bros Landscaping</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#home" className="hover:text-accent transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a></li>
              <li><a href="#quotes" className="hover:text-accent transition-colors relative group">
                Free Quotes
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a></li>
              <li><a href="#services" className="hover:text-accent transition-colors relative group">
                Our Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a></li>
              <li><a href="#sod" className="hover:text-accent transition-colors relative group">
                Our Sod
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a></li>
              <li><a href="#calculator" className="hover:text-accent transition-colors relative group">
                Topsoil Calculator
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a></li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <button 
              className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-1.5 rounded-md" 
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
      </div>
      
      {/* Mobile menu - slide down animation */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-primary/95 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-3">
            <li><a href="#home" className="flex items-center py-2 px-3 hover:bg-primary/80 rounded-md transition-colors" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#quotes" className="flex items-center py-2 px-3 hover:bg-primary/80 rounded-md transition-colors" onClick={closeMobileMenu}>Free Quotes</a></li>
            <li><a href="#services" className="flex items-center py-2 px-3 hover:bg-primary/80 rounded-md transition-colors" onClick={closeMobileMenu}>Our Services</a></li>
            <li><a href="#sod" className="flex items-center py-2 px-3 hover:bg-primary/80 rounded-md transition-colors" onClick={closeMobileMenu}>Our Sod</a></li>
            <li><a href="#calculator" className="flex items-center py-2 px-3 hover:bg-primary/80 rounded-md transition-colors" onClick={closeMobileMenu}>Topsoil Calculator</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
