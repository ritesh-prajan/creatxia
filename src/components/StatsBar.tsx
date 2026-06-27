import React from 'react';
import { stats } from '../data';
import { StatCard } from './ui/StatCard';

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-navy py-16 md:py-24 px-6 md:px-12 relative overflow-hidden" id="stats-section">
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              id={stat.id}
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
