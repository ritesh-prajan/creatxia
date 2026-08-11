import React from 'react';
import { PageView } from '../types';
import { ZariGlintButton } from './ZariGlint';

interface StickyBookBarProps {
  currentPage: PageView;
  navigateTo: (page: PageView) => void;
}

export default function StickyBookBar({ currentPage, navigateTo }: StickyBookBarProps) {
  if (currentPage !== 'home' && currentPage !== 'services') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-rose/25 py-3 px-5 sm:px-6 flex items-center justify-between shadow-[0_-4px_25px_rgba(107,31,74,0.12)] md:hidden">
      <div className="flex flex-col">
        <span className="font-serif text-[11px] uppercase tracking-wider font-semibold text-brand-rose">
          Saree perfection
        </span>
        <span className="font-sans text-xs font-bold text-neutral-dark">
          Drapes ready in 24 hrs
        </span>
      </div>
      <ZariGlintButton
        variant="full"
        className="relative overflow-hidden inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 py-2.5 px-5 rounded-full cursor-pointer select-none border shadow-xs active:scale-[0.98] outline-none bg-brand-plum text-white border-brand-plum hover:bg-[#521337] hover:border-[#521337]"
        onClick={() => navigateTo('book')}
      >
        <span className="relative z-10">Book Saree Pleating</span>
      </ZariGlintButton>
    </div>
  );
}
