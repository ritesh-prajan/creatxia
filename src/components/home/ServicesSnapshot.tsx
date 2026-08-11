import React from 'react';
import { PageView } from '../../types';
import { SectionTitle } from '../UI';
import { ArrowRight, Layers, Sparkles, GraduationCap } from 'lucide-react';

interface ServicesSnapshotProps {
  navigateTo: (page: PageView) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  badgeStyle: 'bestseller' | 'wedding' | 'academy';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  targetPage: PageView;
  actionText: string;
  photoUrl: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'pleating',
    title: 'Professional Pleating',
    badge: 'Bestseller',
    badgeStyle: 'bestseller',
    description: 'Immaculate Box & Hanger folds prepared to your custom hip size. Ready and returned in 24 hours.',
    icon: Layers,
    targetPage: 'services',
    actionText: 'View Pleating Options',
    photoUrl: '/reviews/plum_silk_traditional.jpg',
  },
  {
    id: 'bridal',
    title: 'Bridal & Celebrity',
    badge: 'Wedding Special',
    badgeStyle: 'wedding',
    description: "Double-locked sturdy draping and beautiful Red Carpet style replication for Chennai's modern brides.",
    icon: Sparkles,
    targetPage: 'services',
    actionText: 'View Bridal Details',
    photoUrl: '/reviews/cream_gold_designer.jpg',
  },
  {
    id: 'academy',
    title: 'Draping Academy',
    badge: 'Learn Academics',
    badgeStyle: 'academy',
    description: 'Recorded, live, and in-person hands-on practice with certified draping expert coaches in Chennai.',
    icon: GraduationCap,
    targetPage: 'classes',
    actionText: 'Explore Classes',
    photoUrl: '/reviews/academy_workspace.jpg',
  },
];

const renderBadge = (item: ServiceItem) => {
  switch (item.badgeStyle) {
    case 'bestseller':
      return (
        <span className="text-[9px] font-bold text-brand-rose bg-white border border-brand-rose/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
          {item.badge}
        </span>
      );
    case 'wedding':
      return (
        <span className="text-[9px] font-bold text-white bg-brand-rose px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
          {item.badge}
        </span>
      );
    case 'academy':
      return (
        <span className="text-[9px] font-bold text-white bg-brand-plum px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
          {item.badge}
        </span>
      );
  }
};

interface ServiceCardProps {
  item: ServiceItem;
  isMobile?: boolean;
  navigateTo: (page: PageView) => void;
  key?: string;
}

const ServiceCard = ({ item, isMobile = false, navigateTo }: ServiceCardProps) => {
  const IconComponent = item.icon;
  return (
    <div 
      className={`space-y-4 bg-white p-6 rounded-3xl border border-[#F2D6E4] shadow-xs hover:shadow-md transition-all ${
        isMobile ? 'shrink-0 w-72' : ''
      }`}
    >
      <div className="aspect-[4/3] rounded-2xl bg-neutral-50 border border-brand-blush/20 overflow-hidden relative group">
        {item.photoUrl ? (
          <>
            <img
              src={item.photoUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/85 via-brand-plum/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
              {renderBadge(item)}
              <h4 className="font-serif text-lg font-bold text-white mt-1">
                {item.title}
              </h4>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
              {renderBadge(item)}
              <h4 className="font-serif text-lg font-bold text-brand-plum mt-1">
                {item.title}
              </h4>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-3 select-none">
              <IconComponent className={`h-16 w-16 ${item.badgeStyle === 'wedding' ? 'text-brand-rose/10' : 'text-brand-plum/10'}`} />
            </div>
          </>
        )}
      </div>
      <div className="text-left font-sans">
        <p className="text-xs text-neutral-mid leading-relaxed min-h-12">
          {item.description}
        </p>
        <button
          onClick={() => navigateTo(item.targetPage)}
          className="text-xs font-bold text-brand-plum mt-3 flex items-center gap-1 cursor-pointer hover:text-brand-rose transition-colors pointer-events-auto"
        >
          <span>{item.actionText}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default function ServicesSnapshot({ navigateTo }: ServicesSnapshotProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-warm/15 border-t border-brand-blush/20 overflow-hidden relative select-none">
      <SectionTitle
        title="Services Snapshot"
        subtitle="Browse our custom pleating, bridal priority drapes, and academy courses in Chennai."
      />

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 mt-8">
        {servicesData.map((item) => (
          <ServiceCard key={`desktop-${item.id}`} item={item} navigateTo={navigateTo} />
        ))}
      </div>

      {/* Mobile Infinite Layout */}
      <div className="block md:hidden mt-8 font-sans">
        <div className="flex w-max gap-6 animate-marquee-ltr hover:[animation-play-state:paused] active:[animation-play-state:paused] pb-4">
          {[...servicesData, ...servicesData].map((item, index) => (
            <ServiceCard key={`mobile-${item.id}-${index}`} item={item} isMobile navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </section>
  );
}
