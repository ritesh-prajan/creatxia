import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Immersion } from './components/Immersion';
import { Services } from './components/Services';
import { StatsBar } from './components/StatsBar';
import { Gallery } from './components/Gallery';
import { MoodboardTray } from './components/MoodboardTray';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { BookingModal } from './components/Booking/BookingModal';

export const App: React.FC = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Check if screen is mobile to disable custom cursor
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update cursor position and listen for clickables hover
  useEffect(() => {
    if (isMobile) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Add listeners to clickable elements
    const updateListeners = () => {
      const clickables = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .cursor-pointer');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateListeners();

    // Re-check periodically when DOM changes
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-white text-navy selection:bg-orange-accent/20 selection:text-orange-accent">
      {/* Custom Desktop Cursor */}
      {!isMobile && (
        <>
          <div
            className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-accent/40 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out ${
              isHovered ? 'scale-150 bg-orange-accent/10 border-orange-accent' : ''
            }`}
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
          <div
            className="fixed top-0 left-0 w-2 h-2 bg-orange-accent rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
        </>
      )}

      {/* Header / Navbar */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Pinned Scroll Immersion */}
      <Immersion />

      {/* Services Section */}
      <Services />

      {/* Stats Counter Section */}
      <StatsBar />

      {/* Portfolio Gallery Section */}
      <Gallery />

      {/* About Brand & Story Section */}
      <About />

      {/* Footer Section */}
      <Footer />

      {/* Fixed bottom Moodboard tray */}
      <MoodboardTray onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Fixed Bottom Floating utilities */}
      <FloatingButtons />

      {/* Interactive Fullscreen Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default App;
