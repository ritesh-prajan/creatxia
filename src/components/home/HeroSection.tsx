import React from 'react';
import { PageView } from '../../types';
import { LogoMonogram } from '../UI';
import { ZariGlintButton } from '../ZariGlint';

interface HeroSectionProps {
  navigateTo: (page: PageView) => void;
}

export default function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFBFC] via-[#FDFBFC] to-[#F2D6E4]/70 border-b border-[#F2D6E4] py-16 md:py-24 px-6 text-center md:text-left">
      {/* Organic abstract vector shape from Clean Minimalism theme */}
      <div className="absolute right-0 top-0 h-full w-[250px] opacity-10 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6B1F4A" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,86.4,-0.4C85.7,14.8,80.9,29.6,72.7,42.1C64.4,54.6,52.8,64.8,39.6,71.5C26.4,78.2,11.7,81.4,-2.7,86.1C-17.1,90.8,-31.2,97,-44.4,93.5C-57.6,90,-69.9,76.8,-78.4,61.9C-86.9,47,-91.6,30.3,-92.4,14C-93.1,-2.3,-89.9,-18.2,-82.9,-32.2C-75.9,-46.2,-65.1,-58.3,-52,-65.7C-38.9,-73.1,-23.5,-75.8,-7.4,-77.1C8.7,-78.4,26.4,-78.3,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 space-y-5">
          <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-rose bg-white border border-brand-rose/20 mx-auto md:mx-0">
            Premium Chennai Service
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-semibold tracking-tight text-brand-plum px-2 md:px-0">
            Wear it effortlessly.<br/>Leave the <span className="italic text-brand-rose">pleating</span> to us.
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#6B6B6B] leading-relaxed max-w-[310px] md:max-w-md mx-auto md:mx-0">
            Professional saree pleating, doorstep delivery, and draping classes — right here in Chennai.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-[280px] sm:max-w-none mx-auto md:mx-0 font-sans">
            <ZariGlintButton
              variant="full"
              className="relative overflow-hidden inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 py-3.5 px-6 rounded-full cursor-pointer select-none border shadow-xs active:scale-[0.98] outline-none bg-brand-plum text-white border-brand-plum hover:bg-[#521337] hover:border-[#521337] sm:w-44"
              onClick={() => navigateTo('book')}
            >
              <span className="relative z-10">Book Now</span>
            </ZariGlintButton>
            <ZariGlintButton
              variant="line"
              className="relative overflow-hidden inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 py-3.5 px-6 rounded-full cursor-pointer select-none border shadow-xs active:scale-[0.98] outline-none bg-transparent text-brand-plum border-brand-plum hover:bg-brand-blush/30 sm:w-44"
              onClick={() => navigateTo('classes')}
            >
              <span className="relative z-10">Explore Classes</span>
            </ZariGlintButton>
          </div>
        </div>

        {/* Elegant computer graphic display on desktop column */}
        <div className="hidden md:flex md:col-span-5 justify-center relative">
          <div className="aspect-square w-80 rounded-3xl bg-white border border-[#F2D6E4] shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F2D6E4]/40 to-brand-rose/5 opacity-55 animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <LogoMonogram className="w-20 h-20 transition-transform duration-500 hover:scale-110" />
              <h2 className="font-serif text-xl font-bold text-brand-plum tracking-widest">TUCK & PIN</h2>
              <p className="text-[10px] font-sans text-brand-rose uppercase tracking-widest leading-none font-semibold">Chennai Styling Academy</p>
              <div className="h-[2px] w-12 bg-brand-rose/40 mt-1" />
              <p className="text-[11px] text-[#6b6b6b] leading-relaxed mt-2 max-w-[210px] font-sans">
                Expert body-contoured box and hanger folds made ready for quick adjustments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
