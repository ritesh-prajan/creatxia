import React from 'react';
import { PageView } from '../types';
import { services } from '../data';
import { SectionTitle, ServiceCard } from '../components/UI';
import { Clock } from 'lucide-react';
import BeforeAfterGallery from '../components/BeforeAfterGallery';

interface ServicesPageProps {
  navigateTo: (page: PageView) => void;
  onBookService: (serviceId: string) => void;
}

export default function ServicesPage({ navigateTo, onBookService }: ServicesPageProps) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-fadeIn text-left">
      {/* PRIMARY SERVICE: SAREE PLEATING */}
      <section className="space-y-6">
        <SectionTitle
          title="Saree Pleating"
          subtitle="Masterfully balanced Box and Hanger folds catered to your exact parameters."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services
            .filter((s) => s.category === 'pleating')
            .map((service) => (
              <div key={service.id}>
                <ServiceCard
                  service={service}
                  onBook={onBookService}
                />
              </div>
            ))}
        </div>

        {/* TURNAROUND INFO BULLET BLOCK */}
        <div className="bg-brand-blush/25 border border-brand-blush/40 rounded-2xl p-6 md:p-8 space-y-3.5 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border-b border-brand-blush/20 pb-2">
            <Clock className="h-5 w-5 text-brand-plum shrink-0" />
            <span className="font-serif font-bold text-sm text-brand-plum">
              Turnaround & delivery Timeline
            </span>
          </div>

          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5 text-xs text-neutral-mid leading-snug">
              <span className="text-brand-plum font-semibold">1-2 Saree count:</span> Ready and returning in 1 Day.
            </li>
            <li className="flex items-start gap-2.5 text-xs text-neutral-mid leading-snug">
              <span className="text-brand-plum font-semibold">Over 2 Sarees:</span> Approximately half a day per additional item.
            </li>
            <li className="flex items-start gap-2.5 text-xs text-neutral-mid leading-snug bg-white/60 p-3 rounded-lg border border-brand-blush/20">
              <span className="text-brand-rose font-bold">Urgent Dispatch Booking:</span> +₹150 surcharge. Handled prioritised and dispatched back within 5 hours of parcel receipt.
            </li>
          </ul>
        </div>
      </section>

      {/* SECOND SERVICE: BRIDAL DRAPING */}
      <section className="space-y-6">
        <SectionTitle
          title="Bridal Draping"
          subtitle="Ultra-priority wedding preparative secure pinning draping services."
        />

        <div className="bg-brand-blush/15 rounded-2xl border border-brand-blush/30 p-6 text-center max-w-2xl mx-auto mb-6">
          <span className="inline-block bg-brand-rose text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-3">
            Bridal Procedure
          </span>
          <p className="font-sans text-xs md:text-sm text-[#555] leading-relaxed max-w-lg mx-auto">
             Saree must be couriered or dropped to our Chennai studio first for measurement fittings. It gets professionally pleated, double-locked, and dispatched back in pristine garment cover boxes ready for wedding morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services
            .filter((s) => s.category === 'bridal')
            .map((service) => (
              <div key={service.id}>
                <ServiceCard
                  service={service}
                  onBook={onBookService}
                />
              </div>
            ))}
        </div>
      </section>

      {/* THIRD SERVICE: CELEBRITY & DESIGNER DRAPING */}
      <section className="space-y-6">
        <SectionTitle
          title="Celebrity & Designer Draping"
          subtitle="Wear it like your favorite stars with red-carpet style replication."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services
            .filter((s) => s.category === 'celebrity')
            .map((service) => (
              <div key={service.id}>
                <ServiceCard
                  service={service}
                  onBook={onBookService}
                />
              </div>
            ))}
        </div>
      </section>

      <BeforeAfterGallery />
    </div>
  );
}
