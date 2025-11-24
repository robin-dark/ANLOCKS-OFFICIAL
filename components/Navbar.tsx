import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-orange-800' : 'text-white'}`}>
          ANLOCKS<span className="text-orange-500">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium hover:text-orange-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105 flex items-center gap-2">
            Shop Now <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-orange-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t absolute w-full shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-orange-600"
              >
                {link.name}
              </a>
            ))}
             <button className="bg-orange-600 text-white px-5 py-3 rounded-lg text-sm font-semibold w-full">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;