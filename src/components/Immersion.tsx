import React, { useRef } from 'react';
import { immersionImages } from '../data';
import { useImmersionAnimation } from '../hooks/useScrollTrigger';

export const Immersion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useImmersionAnimation(containerRef, panelsRef);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-navy"
      id="immersion-section"
    >
      {immersionImages.map((img, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) panelsRef.current[idx] = el;
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            opacity: idx === 0 ? 1 : 0,
            zIndex: 10 + idx,
            pointerEvents: idx === 0 ? 'auto' : 'none',
          }}
        >
          {/* Background Image with referral policy */}
          <div
            className="absolute inset-0 bg-cover bg-center immersion-bg"
            style={{
              backgroundImage: `url(${img.url})`,
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-navy/60 z-10" />

          {/* Text Overlay */}
          <div className="relative z-20 text-center px-6 max-w-4xl">
            <h2
              className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-wide leading-tight immersion-text"
              style={{ opacity: idx === 0 ? 1 : 0 }}
            >
              {img.text}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
};
