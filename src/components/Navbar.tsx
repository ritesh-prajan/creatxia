/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Phone, CalendarDays, Compass, HelpCircle, Star, MessageSquare, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { LogoLockup } from './UI';
import { CONFIG } from '../config';

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const desktopNavItems = [
    { id: 'services', label: 'Services' },
    { id: 'classes', label: 'Classes' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const mobileMainItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'services', label: 'Services', icon: MessageSquare },
    { id: 'classes', label: 'Classes', icon: GraduationCapIcon }, 
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'book', label: 'Book Now', icon: CalendarDays },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const navigateTo = (pageId: PageView) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    
    // Smooth scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F2D6E4] h-16 flex items-center justify-between px-4 md:px-8 relative">
      {/* Brand Logo - Left */}
      <div className="cursor-pointer select-none" onClick={() => navigateTo('home')}>
        <LogoLockup />
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10">
        {desktopNavItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as PageView)}
              className={`font-sans text-[11px] h-16 uppercase tracking-widest font-bold transition-colors border-b-2 cursor-pointer flex items-center ${
                isActive
                  ? 'text-brand-plum border-brand-plum'
                  : 'text-neutral-mid border-transparent hover:text-brand-plum hover:border-brand-plum/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Desktop Book Now Pill CTA - Far Right */}
      <div className="hidden md:flex items-center">
        <button
          onClick={() => navigateTo('book')}
          className="bg-brand-plum hover:bg-purple-950 text-white font-sans text-[10px] uppercase tracking-widest font-extrabold px-6 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-xs hover:shadow-sm cursor-pointer group"
        >
          <span>Book Now</span>
          <span className="text-[#F2D6E4] font-serif transition-transform group-hover:translate-x-0.5">▶</span>
        </button>
      </div>

      {/* Mobile/Desktop Hamburger Button - Right Side (Only on mobile/tablet) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 -mr-1 text-brand-plum hover:bg-[#F2D6E4]/30 rounded-full transition-colors cursor-pointer block md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Slide-out Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay inside phone layout bounds */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute left-0 right-0 top-full h-[100vh] bg-neutral-dark/40 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Slide-in drawer container starting from right side but bound to header width */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute right-0 top-full w-72 h-[calc(100vh-64px)] bg-white z-50 border-l border-[#F2D6E4] shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="py-6 px-1 flex flex-col h-full justify-between">
                <div>
                  <div className="px-5 mb-6">
                    <span className="font-sans text-[10px] font-bold text-brand-rose uppercase tracking-[0.2em]">
                      Bookings & Enquiries
                    </span>
                  </div>

                  <div className="space-y-1">
                    {mobileMainItems.map((item) => {
                      const isActive =
                        currentPage === item.id || (item.id === 'book' && currentPage === 'book-class');
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigateTo(item.id as PageView)}
                          className={`w-full flex items-center gap-4 py-4 px-6 text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#F2D6E4]/30 text-brand-plum font-bold border-l-4 border-brand-plum'
                              : 'text-neutral-dark hover:bg-neutral-50 border-l-4 border-transparent'
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${isActive ? 'text-brand-plum' : 'text-neutral-mid'}`} />
                          <span className="font-sans text-sm font-medium tracking-wide">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional drawer footer info */}
                <div className="p-6 border-t border-[#F2D6E4]/60 bg-neutral-warm/20">
                  {/* Secondary links for demoted pages */}
                  <div className="flex gap-4 mb-4 pb-4 border-b border-[#F2D6E4]/40 justify-start items-center">
                    <button
                      onClick={() => navigateTo('how-it-works')}
                      className="font-sans text-[10px] uppercase tracking-wider font-bold text-brand-rose hover:text-brand-plum cursor-pointer"
                    >
                      How It Works
                    </button>
                    <span className="text-[#F2D6E4] h-3 w-[1px] bg-[#F2D6E4]/50"></span>
                    <button
                      onClick={() => navigateTo('faq')}
                      className="font-sans text-[10px] uppercase tracking-wider font-bold text-brand-rose hover:text-brand-plum cursor-pointer"
                    >
                      FAQ Help
                    </button>
                  </div>

                  <p className="font-serif text-sm font-bold text-brand-plum mb-1">
                    Tuck & Pin Chennai
                  </p>
                  <p className="font-sans text-[11px] text-neutral-mid mb-4">
                    Expert Saree Pleating, Pre-stitching & Draping Academy
                  </p>
                  
                  {/* Quick-reach actions */}
                  <a
                    href={`https://wa.me/${CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center gap-2 bg-emerald-600 active:bg-emerald-700 text-white font-sans font-semibold text-xs py-2.5 px-4 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.45 5.5 0 10-4.5 10-10s-4.5-10-10-10C6.9 1 2.4 5.5 2.4 11c0 1.9.5 3.4 1.5 4.9l-.98 3.59 3.69-.966zm11.41-6.1c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06-1.54-.77-2.54-1.36-3.55-3.1-.27-.46.27-.43.76-1.41.08-.16.04-.3-.02-.42s-.54-1.3-.74-1.78c-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32 1 p-2.5c.12.16 1.69 2.58 4.1 3.62.57.25 1 .4 1.34.5.58.18 1.1.16 1.51.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.11-.22-.17-.46-.29z" />
                    </svg>
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
