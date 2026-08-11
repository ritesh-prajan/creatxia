import React from 'react';
import { SectionTitle } from '../components/UI';
import ClassForm from '../components/ClassForm';
import { Clock } from 'lucide-react';

interface BookClassPageProps {
  activeClassTier: string;
  setActiveClassTier: (classTier: string) => void;
}

export default function BookClassPage({ activeClassTier, setActiveClassTier }: BookClassPageProps) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-fadeIn text-left">
      <SectionTitle
        title="Join a Draping Class"
        subtitle="Enroll in Chennai's premier saree folding masterclass."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        <div className="lg:col-span-12 xl:col-span-7 bg-white p-4.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-brand-blush/30 shadow-xs">
          <ClassForm
            initialTierName={activeClassTier}
            onSuccess={() => {
              setActiveClassTier('');
            }}
          />
        </div>

        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white border border-[#F2D6E4] p-6 rounded-3xl space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3 py-1 rounded-sm uppercase inline-block font-sans">
              Course Benefits
            </span>
            <ul className="space-y-3 font-sans text-xs text-[#555]">
              <li className="flex gap-2 items-start">
                <span className="text-emerald-600 font-bold">✔</span>
                <span>Learn the exact shoulder-to-border placement secrets.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-600 font-bold">✔</span>
                <span>Hands-on live practice using heavy silk and fabrics.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-600 font-bold">✔</span>
                <span>Get recognized certifications from Tuck & Pin Chennai.</span>
              </li>
            </ul>
            <div className="p-4 rounded-xl bg-brand-blush/15 border border-brand-blush/30 flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-plum shrink-0" />
              <p className="text-[10px] text-neutral-mid leading-relaxed">
                Classes fill fast. Book your preferred slot above; our team will follow up on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
