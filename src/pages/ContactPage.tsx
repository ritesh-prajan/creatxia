import React from 'react';
import { faqs } from '../data';
import { SectionTitle, FAQItem } from '../components/UI';
import { CONFIG } from '../config';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-fadeIn text-left">
      {/* FIND US LOCATION DETAILS */}
      <section className="space-y-6">
        <SectionTitle
          title="Find Us"
          subtitle="Reach our Chennai studio via Google Maps, WhatsApp, or Instagram DM."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Google Maps embed structure */}
          <div className="bg-white rounded-2xl border border-brand-blush/20 shadow-xs overflow-hidden h-full flex flex-col justify-between">
            <div className="h-64 w-full bg-neutral-100 relative">
              <iframe
                title="Google Maps Location for Tuck & Pin Chennai"
                src={CONFIG.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-5 space-y-2 text-left">
              <span className="text-[9px] font-bold text-brand-rose uppercase tracking-widest block font-sans">
                Physical Location
              </span>
              <h4 className="font-sans text-sm font-extrabold text-brand-plum uppercase tracking-tight block">
                Officers Colony, Porur
              </h4>
              <p className="font-mono text-[10px] text-neutral-mid block leading-none pt-0.5">
                Coordinates: {CONFIG.locationCoords}
              </p>
              <p className="font-sans text-[11px] text-neutral-mid leading-relaxed pt-1">
                Chennai Saree Studio, Tamil Nadu. Dunzo pickups can be routed using these coordinates directly for flawless courier navigation.
              </p>
            </div>
          </div>

          {/* CLICKABLE DIGITAL CHANNELS & PAYMENT INFO */}
          <div className="space-y-6">
            <div className="p-4 bg-white/50 rounded-2xl border border-brand-blush/10 font-sans">
              <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3 py-1 rounded-sm uppercase inline-block mb-4">
                Instant Channels
              </span>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-5 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 flex flex-col items-center text-center shadow-[0_2px_10px_rgba(16,185,129,0.03)] cursor-pointer group transition-all"
                >
                  <svg className="w-8 h-8 text-emerald-600 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.008.01C5.397.01.06 5.348.06 11.953c0 2.097.546 4.142 1.587 5.946L.057 24l6.163-1.687c1.786 1.041 3.834 1.587 5.946 1.587 6.627 0 11.997-5.34 11.997-11.953s-5.373-11.996-11.953-11.996zm6.59 15.132c-.24.56-1.15 1.07-1.61 1.14-.41.06-.93.08-1.51-.1-.34-.1-.77-.25-1.34-.5-2.41-1.04-3.98-3.46-4.1-3.62-.14-.18-1-1.38-1-2.5s.62-1.76.84-2c.22-.24.48-.3.64-.3h.46c.14 0 .34-.06.54.42l.74 1.78c.06.12.1.26.02.42s-.49.98-.76 1.41c.49.94 1.49 1.53 3.55 3.1.24.12.38.1.52-.06.14-.16.54-.69.76-.93.22-.24.38-.2.54-.12.22.08 1.39.65 1.63.77.24.12.18.21.14.29z" />
                  </svg>
                  <span className="font-serif font-bold text-xs text-neutral-dark mt-2.5">
                    WhatsApp Chat
                  </span>
                  <span className="text-[10px] text-neutral-mid mt-0.5 font-sans">
                    {CONFIG.whatsappDisplay}
                  </span>
                </a>

                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-5 rounded-2xl border border-brand-rose/10 hover:border-brand-rose/30 flex flex-col items-center text-center shadow-[0_2px_10px_rgba(107,31,74,0.03)] cursor-pointer group transition-all"
                >
                  <svg className="w-8 h-8 text-brand-rose transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span className="font-serif font-bold text-xs text-neutral-dark mt-2.5">
                    Instagram DM
                  </span>
                  <span className="text-[10px] text-neutral-mid mt-0.5 font-sans">
                    @{CONFIG.instagramHandle}
                  </span>
                </a>
              </div>
            </div>

            {/* PAYMENT INFORMATION */}
            <div className="bg-brand-blush/20 rounded-2xl border border-brand-blush/40 p-6 space-y-2 text-left font-sans">
              <span className="text-[9px] font-bold text-brand-rose uppercase tracking-widest block">
                Secure Settlement
              </span>
              <h4 className="font-serif text-base font-bold text-brand-plum">
                Zero Advance Necessary
              </h4>
              <p className="text-xs text-[#555] leading-relaxed">
                We collect payment only when the finished sarees are back in your physical hands. You can transfer securely via GPay/PhonePe UPI or pay COD at the moment of delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACCORDION FAQ SECTION */}
      <section className="space-y-6 pt-6 border-t border-brand-blush/20 font-sans">
        <div className="text-center mb-5">
          <h3 className="font-serif text-xl font-bold text-brand-plum">
            Frequently Asked Questions
          </h3>
          <div className="w-12 h-[2px] bg-brand-rose mx-auto mt-2" />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush/20 shadow-xs divide-y divide-brand-blush/20 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index}>
              <FAQItem item={faq} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
