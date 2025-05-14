import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary text-white fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-heading font-bold">Yard Bros Landscaping</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="#quotes" className="hover:text-accent transition-colors">Free Quotes</a></li>
            <li><a href="#services" className="hover:text-accent transition-colors">Our Services</a></li>
            <li><a href="#sod" className="hover:text-accent transition-colors">Our Sod</a></li>
            <li><a href="#calculator" className="hover:text-accent transition-colors">Topsoil Calculator</a></li>
          </ul>
        </nav>
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-primary text-white w-full`}>
        <div className="container mx-auto px-4 py-2">
          <ul className="space-y-2">
            <li><a href="#home" className="block py-2 hover:text-accent transition-colors" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#quotes" className="block py-2 hover:text-accent transition-colors" onClick={closeMobileMenu}>Free Quotes</a></li>
            <li><a href="#services" className="block py-2 hover:text-accent transition-colors" onClick={closeMobileMenu}>Our Services</a></li>
            <li><a href="#sod" className="block py-2 hover:text-accent transition-colors" onClick={closeMobileMenu}>Our Sod</a></li>
            <li><a href="#calculator" className="block py-2 hover:text-accent transition-colors" onClick={closeMobileMenu}>Topsoil Calculator</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
