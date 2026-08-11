import React from 'react';
import { SectionTitle, LogoMonogram } from '../components/UI';
import BookingForm from '../components/BookingForm';

interface BookPageProps {
  activeFormService: string;
  setActiveFormService: (serviceId: string) => void;
}

export default function BookPage({ activeFormService, setActiveFormService }: BookPageProps) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-fadeIn text-left">
      <SectionTitle
        title="Book Your Saree Pleating"
        subtitle="Fill measurements and secure doorstep Dunzo arrangements."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        <div className="lg:col-span-7 bg-white p-4.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#F2D6E4] shadow-xs">
          <BookingForm
            initialServiceId={activeFormService}
            onSuccess={() => {
              setActiveFormService('');
            }}
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* Convenient Steps Card info */}
          <div className="bg-brand-plum text-white rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-serif text-lg font-bold">Important Instructions</h4>
            <ul className="space-y-3.5 text-xs text-white/85">
              <li className="flex gap-2">
                <span className="text-brand-rose">✦</span>
                <span>Ensure you measure your <b>hip size</b> carefully before booking.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-rose">✦</span>
                <span>Saree must be couriered/Dunzoed to our Chennai studio by the scheduled slot.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-rose">✦</span>
                <span>We return your sarees perfectly pleated, locked with rust-proof pin guards inside clean wardrobe wrappers.</span>
              </li>
            </ul>
          </div>

          {/* Trust indicator */}
          <div className="bg-white rounded-3xl p-6 border border-[#F2D6E4] flex items-center gap-4">
            <LogoMonogram className="w-12 h-12 shrink-0" />
            <div>
              <h5 className="font-serif font-bold text-xs text-brand-plum uppercase tracking-wider">Zero Damage Guarantee</h5>
              <p className="text-[11px] text-neutral-mid mt-0.5 leading-normal font-sans">
                Our expert technicians use safe heat settings & rounded alignment locks on all premium silks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
