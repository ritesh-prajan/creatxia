import React from 'react';

interface SilkShimmerProps {
  isActive: boolean;
}

const PLEAT_COUNT = 6;

export default function SilkShimmer({ isActive }: SilkShimmerProps) {
  if (!isActive) return null;

  return (
    <div aria-hidden="true" className="pleat-transition-container">
      {Array.from({ length: PLEAT_COUNT }).map((_, i) => (
        <div
          key={i}
          className="pleat-line"
          style={{ animationDelay: `${i * 28}ms` }}
        />
      ))}
    </div>
  );
}
