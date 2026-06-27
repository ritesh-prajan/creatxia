import React, { useRef } from 'react';
import { cities } from '../data';
import { SectionHeading } from './ui/SectionHeading';
import { useScrollFadeIn } from '../hooks/useScrollTrigger';
import { MapPin, Sparkles, PencilRuler, Construction, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);

  useScrollFadeIn(storyRef, { direction: 'up', duration: 1.2 });
  useScrollFadeIn(citiesRef, { direction: 'up', duration: 1.2, delay: 0.2 });

  const processSteps = [
    {
      icon: <Sparkles className="w-6 h-6 text-orange-accent" />,
      title: "1. Inspire & Consult",
      description: "We discuss your vision, review your custom moodboard styles, understand space functionality, and align on timeline and budget expectations."
    },
    {
      icon: <PencilRuler className="w-6 h-6 text-orange-accent" />,
      title: "2. Master Blueprint",
      description: "Our design architects create virtual layouts, photorealistic 3D renders, and select material options for your approval."
    },
    {
      icon: <Construction className="w-6 h-6 text-orange-accent" />,
      title: "3. Craft & Build",
      description: "Our experienced construction engineers and premium material suppliers execute the design under strict quality parameters."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-accent" />,
      title: "4. Turnkey Handover",
      description: "We complete fine styling, professional cleaning, rigorous system testing, and hand over the keys to your pristine bespoke space."
    }
  ];

  return (
    <section id="about" className="bg-white">
      {/* Full-width Hero Image with overlay brand story */}
      <div className="relative h-[65vh] w-full overflow-hidden bg-navy flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600"
          alt="Creatxia luxury interior design office"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-[1.02]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy/80 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <span className="text-orange-accent text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4 block">
            ABOUT CREATXIA
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-4">
            Forging Spaces, Defining Legacies.
          </h2>
          <p className="text-white/80 font-sans text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Headquartered in Chennai, we are a collective of visionary interior architects, construction perfectionists, and turnkey designers working pan-India.
          </p>
        </div>
      </div>

      {/* Brand Story & Core Process */}
      <div className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24 md:mb-36">
          <div className="lg:col-span-5">
            <span className="text-orange-accent text-xs uppercase tracking-widest font-sans font-semibold mb-3 block">
              OUR MISSION
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-navy tracking-tight leading-tight font-medium mb-6">
              Our spaces command attention because every detail is intentional.
            </h3>
          </div>
          <div className="lg:col-span-7 text-navy/70 font-sans text-base md:text-lg leading-relaxed space-y-6">
            <p>
              At <strong className="text-navy font-semibold">CREATXIA</strong>, we do not believe in templated templates or generic design choices. We view every home, retail storefront, or corporate headquarters as an empty canvas waiting for a highly structured, custom architectural narrative.
            </p>
            <p>
              Since our founding 5 years ago, we have built a reputation of delivering uncompromised high craftsmanship on strict schedules. We directly control quality from initial blueprints to the final touch of furniture styling.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div>
          <SectionHeading
            title="The Architectural Path"
            subtitle="How we bring your custom vision from initial concept consult to pristine physical handover."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-warm-grey p-8 relative border-t-2 border-orange-accent">
                <div className="mb-6">{step.icon}</div>
                <h4 className="font-display text-xl text-navy font-semibold mb-3">
                  {step.title}
                </h4>
                <p className="text-navy/60 font-sans text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cities Covered */}
        <div ref={citiesRef} className="mt-24 md:mt-36 border-t border-navy/10 pt-16 md:pt-24 text-center">
          <span className="text-orange-accent text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-3 block">
            OUR REACH
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-navy tracking-tight mb-12">
            Pan-India Direct Coverage
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {cities.map((city, idx) => (
              <div
                key={city}
                className="flex items-center justify-center gap-2 p-5 bg-warm-grey border border-navy/5 hover:border-orange-accent/30 transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-orange-accent" />
                <span className="font-sans font-medium text-navy text-sm md:text-base">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
