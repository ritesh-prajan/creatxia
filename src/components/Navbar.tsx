import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo(targetId, { offset: -80 });
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home', id: '#home' },
    { label: 'Services', id: '#services' },
    { label: 'Portfolio', id: '#portfolio' },
    { label: 'About', id: '#about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 py-6 transition-[background-color,box-shadow,color,padding] duration-[400ms] ease-in-out ${
          isScrolled
            ? 'bg-white shadow-md py-4 text-navy'
            : 'bg-transparent text-white'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="font-display text-2xl font-bold tracking-[0.15em]"
          >
            CREATXIA
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`text-xs uppercase tracking-widest font-medium font-sans hover:text-orange-accent transition-colors duration-[400ms] ease-in-out ${
                  isScrolled ? 'text-navy/80' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant={isScrolled ? 'primary' : 'outline'}
              size="sm"
              onClick={onOpenBooking}
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none p-1"
            aria-label="Toggle Menu"
            id="mobile-menu-hamburger"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-navy z-30 flex flex-col justify-center items-center px-10 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu-overlay"
      >
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={link.id}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="font-display text-3xl text-white hover:text-orange-accent transition-colors duration-300 transform"
              style={{
                transitionDelay: isMobileMenuOpen ? `${idx * 100}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            className="pt-6 transform"
            style={{
              transitionDelay: isMobileMenuOpen ? `${navLinks.length * 100}ms` : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
