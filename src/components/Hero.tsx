import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleScrollToPortfolio = () => {
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo('#portfolio', { offset: -80 });
    } else {
      document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      {/* Dark Navy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy/80 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center">
        <span
          className={`text-xs md:text-sm uppercase tracking-[0.3em] font-sans font-semibold text-orange-accent mb-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          CREATXIA DESIGN STUDIO
        </span>

        <h1
          className={`font-display text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight leading-tight md:leading-none mb-8 transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Every Space Has a Story. <br className="hidden md:inline" />
          <span className="text-orange-accent">We Write It.</span>
        </h1>

        <p
          className={`text-base md:text-xl font-sans text-white/80 max-w-2xl mb-12 transition-all duration-1000 delay-400 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          An award-winning pan-India interior architecture firm crafting bespoke residential, retail, and corporate spaces that command respect.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-1000 delay-600 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button variant="primary" size="lg" onClick={onOpenBooking}>
            Design Your Space
          </Button>
          <Button variant="ghost" size="lg" onClick={handleScrollToPortfolio}>
            Explore Portfolio
          </Button>
        </div>
      </div>

      {/* Pulsing Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300" onClick={handleScrollToPortfolio}>
        <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-white/60 mb-2">
          Scroll Down
        </span>
        <div className="p-2 rounded-full border border-white/20 animate-bounce">
          <ArrowDown className="w-4 h-4 text-white" />
        </div>
      </div>
    </section>
  );
};
