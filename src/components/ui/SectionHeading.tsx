import React, { useRef } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollTrigger';

interface SectionHeadingProps {
  id?: string;
  label?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  label,
  title,
  subtitle,
  dark = false,
  align = 'center',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollFadeIn(containerRef, { direction: 'up', duration: 1.0 });

  const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto';

  return (
    <div
      id={id}
      ref={containerRef}
      className={`max-w-3xl ${alignmentClass} ${className} mb-12 md:mb-16`}
    >
      {label && (
        <span className={`block text-xs uppercase tracking-[0.25em] font-sans mb-3 font-semibold ${dark ? 'text-orange-accent' : 'text-orange-accent'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4 ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg font-sans max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-white/60' : 'text-navy/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
