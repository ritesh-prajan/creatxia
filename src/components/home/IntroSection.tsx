import React from 'react';
import { LogoMonogram } from '../UI';

export default function IntroSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white border-b border-[#F2D6E4]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-rose block font-sans">
              Our Philosophy
            </span>
            <h2 className="font-serif text-2.5xl sm:text-3.5xl font-extrabold text-brand-plum leading-snug">
              Perfection in every fold. Convenience at your doorstep.
            </h2>
          </div>

          <p className="font-sans text-xs md:text-sm text-neutral-mid leading-relaxed">
            At Tuck & Pin, we eliminate the morning drape stress. We specialize in custom body-contoured box and hanger folds. By delivering pre-pleated, perfectly pinned sarees directly back to you, we make draping simple, robust, and accessible for everyone in Chennai.
          </p>
        </div>

        {/* Aesthetic Brand Monogram container card */}
        <div className="md:col-span-5 flex justify-center w-full">
          <div className="relative group rounded-2xl overflow-hidden aspect-video md:aspect-[4/3] w-full max-w-sm bg-neutral-100/60 flex items-center justify-center border border-brand-rose/10 p-6 shadow-sm">
            {/* Background abstract gradient curves */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blush/30 to-brand-rose/10 opacity-50" />
            
            <div className="relative z-10 flex flex-col items-center text-center gap-2">
              <LogoMonogram className="w-16 h-16" />
              <span className="font-serif font-bold text-sm text-brand-plum tracking-widest uppercase">
                TUCK & PIN
              </span>
              <span className="font-sans text-[9px] text-[#777] uppercase tracking-widest">
                Chennai Studio Est. 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
