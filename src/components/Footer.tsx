import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo('#home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white relative pt-20 pb-10 px-6 md:px-12 overflow-hidden border-t border-white/5" id="main-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-3xl font-bold tracking-[0.15em] text-white">
              CREATXIA
            </h3>
            <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed max-w-sm">
              An award-winning pan-India luxury interior architecture studio specializing in high-contrast styling and premium turnkey craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-lg text-white font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-widest font-sans text-white/60">
              <li>
                <a href="#home" className="hover:text-orange-accent transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-accent transition-colors">Design Services</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-orange-accent transition-colors">Bespoke Portfolio</a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-accent transition-colors">Brand Story</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-lg text-white font-semibold">
              Get in Touch
            </h4>
            <div className="space-y-3.5 font-sans text-sm text-white/70">
              <a href="mailto:hello@creatxia.com" className="flex items-center gap-3 hover:text-orange-accent transition-colors">
                <Mail className="w-4 h-4 text-orange-accent" />
                <span>hello@creatxia.com</span>
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-accent transition-colors">
                <Phone className="w-4 h-4 text-orange-accent" />
                <span>+91 99999 99999</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-accent mt-1 flex-shrink-0" />
                <span>
                  Headquarters: Chennai, India.<br />
                  Direct design consultants pan-India.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright section */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-white/40">
          <p>© {currentYear} CREATXIA Interior Architects. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Chennai | Mumbai | Bangalore | Hyderabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
