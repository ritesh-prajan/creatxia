import React, { useRef } from 'react';
import { services } from '../data';
import { SectionHeading } from './ui/SectionHeading';
import { useScrollFadeIn } from '../hooks/useScrollTrigger';

interface ServiceRowProps {
  service: typeof services[0];
  index: number;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ service, index }) => {
  const isReversed = index % 2 !== 0;
  
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Animate image sliding in
  useScrollFadeIn(imageRef, {
    direction: isReversed ? 'right' : 'left',
    duration: 1.2
  });

  // Animate text sliding in
  useScrollFadeIn(textRef, {
    direction: isReversed ? 'left' : 'right',
    duration: 1.2,
    delay: 0.1
  });

  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 mb-24 md:mb-36 last:mb-0`}>
      {/* Image Container with hover state */}
      <div
        ref={imageRef}
        className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden relative group cursor-pointer bg-warm-grey"
      >
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Burnt Orange overlay 20% opacity on hover */}
        <div className="absolute inset-0 bg-orange-accent/0 group-hover:bg-orange-accent/20 transition-all duration-500 ease-out" />
      </div>

      {/* Text Container */}
      <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center">
        <span className="text-orange-accent text-xs uppercase tracking-[0.2em] font-sans font-semibold mb-3 block">
          {index + 1 < 10 ? `0${index + 1}` : index + 1} // SERVICE
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-navy tracking-tight leading-tight mb-4">
          {service.title}
        </h3>
        <h4 className="text-navy/70 text-lg md:text-xl font-sans italic mb-6">
          "{service.subtitle}"
        </h4>
        <p className="text-navy/60 font-sans text-base md:text-lg leading-relaxed mb-8">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-36 bg-white px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Our Expertise"
          title="Bespoke Design Services"
          subtitle="From concept architectural blueprints to hand-crafted styling, we design spaces that inspire, function, and endure."
        />

        <div className="mt-16 md:mt-24">
          {services.map((service, idx) => (
            <ServiceRow key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
