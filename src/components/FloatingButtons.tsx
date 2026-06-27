import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useMoodboard } from '../hooks/useMoodboard';

export const FloatingButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { moodboard } = useMoodboard();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo('#home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Shift floating buttons up if moodboard tray is visible (moodboard has elements)
  const bottomOffsetClass = moodboard.length > 0 ? 'bottom-28 md:bottom-28' : 'bottom-6 md:bottom-8';

  return (
    <div
      className={`fixed right-6 z-30 flex flex-col gap-3 transition-all duration-500 ${bottomOffsetClass}`}
      id="floating-utilities-container"
    >
      {/* Scroll to Top */}
      <button
        onClick={handleScrollToTop}
        className={`p-3 bg-white hover:bg-orange-accent hover:text-white text-navy border border-navy/5 shadow-2xl transition-all duration-300 transform rounded-none ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        id="btn-scroll-to-top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 duration-300 flex items-center justify-center rounded-none"
        aria-label="Contact WhatsApp"
        id="btn-whatsapp-fab"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
      </a>
    </div>
  );
};
