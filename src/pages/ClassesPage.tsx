import React from 'react';
import { PageView } from '../types';
import { pricingClasses } from '../data';
import { SectionTitle, PricingCard } from '../components/UI';
import { Award } from 'lucide-react';

interface ClassesPageProps {
  onEnquireClass: (classTierName: string) => void;
}

export default function ClassesPage({ onEnquireClass }: ClassesPageProps) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-12 animate-fadeIn text-left">
      <SectionTitle
        title="Learn to Drape"
        subtitle="Join our saree wrapping masterclasses in Chennai and master structural alignments."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingClasses.map((pricingClass) => (
          <div key={pricingClass.tier} className="flex h-full justify-center w-full">
            <div className="w-full max-w-md md:max-w-none h-full">
              <PricingCard
                pricingClass={pricingClass}
                onEnquire={() => onEnquireClass(pricingClass.name)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick confidence block */}
      <div className="bg-white rounded-2xl p-6 border border-brand-blush/30 shadow-xs flex flex-col sm:flex-row items-center gap-5 max-w-xl mx-auto">
        <div className="bg-brand-blush/40 p-3.5 rounded-xl text-brand-plum shrink-0">
          <Award className="h-6 w-6" />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-serif text-sm font-bold text-neutral-dark">
            Earn Draping Badge
          </h4>
          <p className="text-[11px] text-[#777] leading-relaxed mt-1">
            Tier 3 hands-on course includes physical training credentials & certifications from our Chennai styling academy coaches.
          </p>
        </div>
      </div>
    </div>
  );
}
