import React, { useRef } from 'react';
import { useCounterAnimation } from '../../hooks/useScrollTrigger';

interface StatCardProps {
  id: number;
  numericValue: number;
  suffix: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ numericValue, suffix, label }) => {
  const countRef = useRef<HTMLSpanElement>(null);
  useCounterAnimation(countRef, numericValue, 2);

  return (
    <div className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-orange-accent mb-2">
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </div>
      <p className="text-xs md:text-sm uppercase tracking-widest text-white/70 font-sans">
        {label}
      </p>
    </div>
  );
};
