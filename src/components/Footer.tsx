/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, MapPin, CreditCard, ChevronRight, HelpCircle } from 'lucide-react';
import { PageView } from '../types';
import { LogoLockup } from './UI';
import { CONFIG } from '../config';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  onOpenTerms: () => void;
}

export default function Footer({ setCurrentPage, onOpenTerms }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-dark text-white pt-12 pb-24 md:pb-12 border-t border-brand-rose/10">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Brand Information Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-white p-3 rounded-2xl inline-block self-start shadow-md">
            <LogoLockup showTagline={true} />
          </div>
          <p className="font-sans text-xs text-neutral-300 leading-relaxed max-w-xs">
            Professional saree pleating, doorstep pickup/delivery, customized pre-pleated box & hanger folds, and comprehensive draping masterclasses in Chennai. Wear it effortlessly first try. Let our experts pin perfection.
          </p>
          
          <div className="flex gap-3.5 mt-2">
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Page"
              className="p-2.5 bg-neutral-800 rounded-full text-brand-rose hover:bg-brand-rose hover:text-white transition-all shadow-sm"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp Us"
              className="p-2.5 bg-neutral-800 rounded-full text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .007c-6.627 0-12 5.373-12 12 0 2.112.546 4.16 1.587 5.946l-1.687 6.163 6.163-1.687c1.786 1.041 3.834 1.587 5.946 1.587 6.627 0 12-5.373 12-12s-5.373-12-12-12zm6.59 15.132c-.24.56-1.15 1.07-1.61 1.14-.41.06-.93.08-1.51-.1-.34-.1-.77-.25-1.34-.5-2.41-1.04-3.98-3.46-4.1-3.62-.14-.18-1-1.38-1-2.5s.62-1.76.84-2c.22-.24.48-.3.64-.3h.46c.14 0 .34-.06.54.42l.74 1.78c.06.12.1.26.02.42s-.49.98-.76 1.41c.49.94 1.49 1.53 3.55 3.1.24.12.38.1.52-.06.14-.16.54-.69.76-.93.22-.24.38-.2.54-.12.22.08 1.39.65 1.63.77.24.12.18.21.14.29z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Helpful Quick Navigation Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg font-bold text-brand-rose tracking-wider">
            Quick Navigation
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-neutral-300">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Home
            </button>
            <button
              onClick={() => handleNav('services')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Services
            </button>
            <button
              onClick={() => handleNav('classes')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Draping Classes
            </button>
            <button
              onClick={() => handleNav('how-it-works')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> How It Works
            </button>
            <button
              onClick={() => handleNav('reviews')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Reviews
            </button>
            <button
              onClick={() => handleNav('book')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Book Pleating
            </button>
            <button
              onClick={() => handleNav('book-class')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Join Academy
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> Contact Us
            </button>
            <button
              onClick={() => handleNav('faq')}
              className="flex items-center gap-1.5 py-1.5 text-left hover:text-brand-rose transition-all cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-neutral-500" /> FAQ
            </button>
          </div>
        </div>

        {/* Studio Location & Quick Support Details */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg font-bold text-brand-rose tracking-wider">
            Studio Details
          </h4>
          <div className="flex items-start gap-3 text-xs text-neutral-300">
            <MapPin className="h-5 w-5 text-brand-rose shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">Chennai Pleating Studio</span>
              <span>Near coordinates: {CONFIG.locationCoords}</span>
              <span>Chennai, Tamil Nadu</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-300 mt-2">
            <CreditCard className="h-5 w-5 text-brand-rose shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-white">Payment Methods</span>
              <span>UPI Transfers & Cash on Delivery (COD)</span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-neutral-800 pt-6 px-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-neutral-400 font-medium">
        <span>© {currentYear} Tuck & Pin Chennai - Ritesh Prajan S. All rights reserved.</span>
        <div className="flex flex-wrap items-center gap-3.5">
          <button 
            onClick={onOpenTerms}
            className="hover:text-brand-rose transition-all cursor-pointer outline-none bg-transparent border-none p-0 text-[11px] text-neutral-400 font-medium"
          >
            Terms & Conditions
          </button>
          <span className="w-1 h-1 bg-neutral-600 rounded-full" />
          <button 
            onClick={() => handleNav('about-developer')}
            className="hover:text-brand-rose transition-all cursor-pointer outline-none bg-transparent border-none p-0 text-[11px] text-neutral-400 font-medium"
          >
            About Developer
          </button>
          <span className="w-1 h-1 bg-neutral-600 rounded-full" />
          <span>Saree Draping Perfection</span>
          <span className="w-1 h-1 bg-neutral-600 rounded-full" />
          <span>Professional Pleating Chennai</span>
        </div>
      </div>
    </footer>
  );
}
