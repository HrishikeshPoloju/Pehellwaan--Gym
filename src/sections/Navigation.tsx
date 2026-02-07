import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollY: number;
}

const Navigation = ({ scrollY }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Facilities', href: '#categories' },
    { name: 'Memberships', href: '#products' },
    { name: 'Retreats', href: '#destinations' },
    { name: 'About', href: '#about' },
  ];

  const isScrolled = scrollY > (typeof window !== 'undefined' ? window.innerHeight * 0.9 : 50);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 custom-expo ${isScrolled
        ? 'w-[95%] max-w-6xl nav-glass shadow-card rounded-full py-3 px-6'
        : 'w-full max-w-7xl py-4 px-6 bg-transparent'
        }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <img
            src="/pehellwaan-logo.png"
            alt="Pehellwaan Gym Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${isScrolled ? 'text-sage-dark' : 'text-white'
            }`}>
            Pehellwaan Gym
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:opacity-70 relative group ${isScrolled ? 'text-sage-dark' : 'text-white'
                }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className={`text-sm font-semibold transition-colors duration-300 hover:opacity-80 ${isScrolled ? 'text-sage-dark' : 'text-white'}`}
            >
              Contact Us
            </a>
            <a
              href="#join"
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-orange-500/20 hover:scale-105 transition-all duration-300"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${isScrolled ? 'text-sage-dark' : 'text-white'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 mt-2 nav-glass rounded-2xl overflow-hidden transition-all duration-300 custom-expo ${isMenuOpen ? 'max-h-[500px] opacity-100 p-4' : 'max-h-0 opacity-0 p-0'
          }`}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-sage-dark font-medium hover:text-orange-600 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <div className="h-px bg-gray-200/20 w-full" />

          <a
            href="#contact"
            className="block py-2 text-sage-dark font-medium hover:text-orange-600 transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </a>
          <a
            href="#join"
            className="block py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center font-bold rounded-full shadow-md active:scale-95 transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
