import React from 'react';
import { badges } from '../../data';
import { TrustBadge } from '../UI';

export default function TrustBadgesMarquee() {
  return (
    <section className="py-4.5 bg-white border-y border-[#F2D6E4] overflow-hidden relative select-none">
      <div className="flex w-max gap-3.5 animate-marquee-ltr hover:[animation-play-state:paused] active:[animation-play-state:paused]">
        {/* First iteration of badges */}
        {badges.map((badge) => (
          <div key={`badge-a-${badge.id}`} className="shrink-0">
            <TrustBadge badge={badge} />
          </div>
        ))}
        {/* Second iteration of badges for seamless looping alignment */}
        {badges.map((badge) => (
          <div key={`badge-b-${badge.id}`} className="shrink-0">
            <TrustBadge badge={badge} />
          </div>
        ))}
      </div>
    </section>
  );
}
