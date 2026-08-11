/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import * as Lucide from 'lucide-react';
import { motion } from 'motion/react';
import { Service, PricingClass, Step, Review, TrustBadge as TrustBadgeType, FaqItemType } from '../types';
import { ZariGlint, useZariGlint, ZariGlintButton } from './ZariGlint';

/**
 * High-fidelity vector rendition of the Tuck & Pin Monogram Logo
 * Based on the serif TP stem + elegant cascading pleat curves.
 */
export function LogoMonogram({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <img
      src="/logo_brand.png"
      alt="Tuck & Pin Logo"
      referrerPolicy="no-referrer"
      className={`${className} object-contain transition-transform duration-300 hover:scale-105`}
    />
  );
}

/**
 * Horizontal Full Lockup Logo (Monogram + Text)
 */
export function LogoLockup({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMonogram className="w-10 h-10 select-none" />
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold tracking-wide text-brand-plum leading-none">
          TUCK & PIN
        </span>
        {showTagline && (
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-brand-rose leading-none mt-1">
            Saree Pleating
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Reusable SectionTitle Component
 * Plum heading with an elegant rose pink underline bar
 */
export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center text-center px-4 mb-8">
      <h2 className="font-serif text-3xl font-semibold text-brand-plum tracking-wide">
        {title}
      </h2>
      <div className="w-16 h-[3px] bg-brand-rose mt-3 rounded-full" />
      {subtitle && (
        <p className="font-sans text-sm text-neutral-mid mt-3 max-w-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Custom CTAButton Component
 * Supports primary (plum fill) and secondary (outline) variants
 */
export function CTAButton({
  label,
  onClick,
  variant = 'primary',
  fullWidth = false,
  icon,
  disabled = false,
  className = '',
}: {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const { isGlinting, triggerGlint, handleAnimationEnd } = useZariGlint();

  const handleClick = () => {
    if (disabled) return;
    triggerGlint();
    onClick();
  };

  const baseClasses =
    'relative overflow-hidden inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 py-3.5 px-6 rounded-full cursor-pointer select-none border shadow-xs active:scale-[0.98] outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = 'bg-brand-plum text-white border-brand-plum hover:bg-[#521337] hover:border-[#521337]';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-transparent text-brand-plum border-brand-plum hover:bg-brand-blush/30';
  } else if (variant === 'accent') {
    variantClasses = 'bg-brand-rose text-white border-brand-rose hover:bg-[#af4e77] hover:border-[#af4e77]';
  } else {
    variantClasses = 'bg-white text-neutral-dark border-neutral-350 hover:bg-neutral-50';
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <ZariGlint
        isActive={isGlinting}
        onAnimationEnd={handleAnimationEnd}
        variant="full"
      />
      {icon && <span className="mr-2 relative z-10">{icon}</span>}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

/**
 * Reusable ServiceCard Component
 * Displays service details with clean spacing and subtle shadows
 */
export function ServiceCard({
  service,
  onBook,
  actionLabel = 'Book This Service',
}: {
  service: Service;
  onBook: (serviceId: string) => void;
  actionLabel?: string;
}) {
  // Select icon based on service properties
  let iconNode = <Lucide.Scissors className="h-6 w-6 text-brand-plum" />;
  if (service.category === 'bridal') {
    iconNode = <Lucide.Crown className="h-6 w-6 text-brand-rose" />;
  } else if (service.category === 'celebrity') {
    iconNode = <Lucide.Sparkles className="h-6 w-6 text-brand-rose" />;
  } else if (service.id.includes('hanger')) {
    iconNode = <Lucide.Shirt className="h-6 w-6 text-brand-plum" />;
  } else if (service.id.includes('box')) {
    iconNode = <Lucide.FolderHeart className="h-6 w-6 text-brand-plum" />;
  }

  return (
    <div
      id={`service-card-${service.id}`}
      className="bg-white rounded-[32px] border border-[#F2D6E4] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full min-w-[260px] overflow-hidden"
    >
      <div>
        {service.photoUrl && (
          <div className="w-full h-[320px] overflow-hidden relative border-b border-[#F2D6E4]/25 bg-neutral-50">
            <img
              src={service.photoUrl}
              alt={service.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectPosition: service.id === 'hanger-fold' ? '50% 15%' : '50% 0%' }}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-brand-blush/40 p-2.5 rounded-xl inline-block">
              {iconNode}
            </div>
            <div className="text-right">
              <span className="font-serif text-2xl font-bold text-brand-plum">
                ₹{service.price}
              </span>
              {service.meta && (
                <p className="text-[10px] text-brand-rose uppercase tracking-wider font-semibold">
                  {service.meta}
                </p>
              )}
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-neutral-dark mb-2">
            {service.name}
          </h3>
          <p className="font-sans text-xs text-neutral-mid leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <ZariGlintButton
          variant="full"
          className="relative overflow-hidden inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 py-3.5 px-6 rounded-full cursor-pointer select-none border shadow-xs active:scale-[0.98] outline-none bg-brand-plum text-white border-brand-plum hover:bg-[#521337] hover:border-[#521337] w-full"
          onClick={() => onBook(service.id)}
        >
          <span className="relative z-10">{actionLabel}</span>
        </ZariGlintButton>
      </div>
    </div>
  );
}

/**
 * Reusable PricingCard Component (Used in Classes Page)
 * Displays tier name, price, offer price badge, features list, and CTA
 */
export function PricingCard({
  pricingClass,
  onEnquire,
}: {
  pricingClass: PricingClass;
  onEnquire: () => void;
}) {
  const isBestValue = pricingClass.isPopular;

  return (
    <div
      id={`pricing-card-tier-${pricingClass.tier}`}
      className={`bg-white rounded-[32px] p-6 border relative transition-all duration-300 flex flex-col justify-between h-full ${
        isBestValue
          ? 'border-brand-plum shadow-md scale-[1.01] ring-2 ring-brand-plum/5'
          : 'border-[#F2D6E4] shadow-xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Ribbon badges in a responsive container to avoid overlapping on mobile */}
        {(isBestValue || pricingClass.offerPrice) && (
          <div className="flex flex-wrap gap-1.5 -mt-3 mb-4 z-10">
            {isBestValue && (
              <span className="bg-brand-plum text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
                Most Popular
              </span>
            )}
            {pricingClass.offerPrice && (
              <span className="bg-brand-rose text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
                Launching Offer
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-start mb-4 pt-1">
          <div>
            <span className="text-xs uppercase font-semibold text-brand-rose tracking-wider">
              Tier {pricingClass.tier}
            </span>
            <h3 className="font-serif text-2xl font-bold text-neutral-dark mt-0.5">
              {pricingClass.name}
            </h3>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-6 bg-brand-blush/25 p-3 rounded-xl border border-brand-blush/30">
          {pricingClass.offerPrice ? (
            <>
              <span className="font-serif text-3xl font-extrabold text-brand-plum">
                ₹{pricingClass.offerPrice}
              </span>
              <span className="text-xs text-neutral-mid line-through">
                ₹{pricingClass.price}
              </span>
            </>
          ) : (
            <span className="font-serif text-3xl font-extrabold text-brand-plum">
              ₹{pricingClass.price}
            </span>
          )}
          <span className="text-neutral-mid text-xs font-medium ml-1">/ seat</span>
        </div>

        <ul className="space-y-3 mb-8">
          {pricingClass.details.map((detail, index) => (
            <li key={index} className="flex items-start text-xs text-neutral-mid leading-snug">
              <Lucide.Check className="h-4 w-4 text-brand-plum shrink-0 mr-2 mt-0.5" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <ZariGlintButton
        variant={isBestValue ? 'full' : 'line'}
        className={`relative overflow-hidden inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 py-3.5 px-6 rounded-full cursor-pointer select-none border shadow-xs active:scale-[0.98] outline-none w-full ${
          isBestValue
            ? 'bg-brand-plum text-white border-brand-plum hover:bg-[#521337] hover:border-[#521337]'
            : 'bg-transparent text-brand-plum border-brand-plum hover:bg-brand-blush/30'
        }`}
        onClick={onEnquire}
      >
        <span className="mr-2 relative z-10">
          <Lucide.MessageSquareShare className="h-4 w-4" />
        </span>
        <span className="relative z-10">Enquire Now</span>
      </ZariGlintButton>
    </div>
  );
}

/**
 * Reusable TrustBadge Component
 * Displays custom numbers and labels for beautiful micro-credibility highlights
 */
export function TrustBadge({ badge }: { badge: TrustBadgeType }) {
  const getLucideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return <Lucide.Scissors className="h-5 w-5 text-brand-plum" />;
      case 'Zap':
        return <Lucide.Zap className="h-5 w-5 text-brand-plum" />;
      case 'Truck':
        return <Lucide.Truck className="h-5 w-5 text-brand-plum" />;
      case 'Crown':
        return <Lucide.Crown className="h-5 w-5 text-brand-plum" />;
      case 'GraduationCap':
        return <Lucide.GraduationCap className="h-5 w-5 text-brand-plum" />;
      default:
        return <Lucide.HelpCircle className="h-5 w-5 text-brand-plum" />;
    }
  };

  return (
    <div className="flex items-center gap-3.5 bg-white border border-[#F2D6E4] py-3.5 px-5 rounded-[20px] min-w-[210px] shrink-0 shadow-xs">
      <div className="bg-brand-blush/40 p-2.5 rounded-xl flex items-center justify-center shrink-0">
        {getLucideIcon(badge.icon)}
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold text-brand-plum leading-tight">
          {badge.number}
        </span>
        <span className="font-sans text-xs text-[#6B6B6B] font-medium leading-none mt-1">
          {badge.label}
        </span>
      </div>
    </div>
  );
}

/**
 * Reusable StepCard Component for "How It Works"
 */
export function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex gap-4 items-start bg-white p-5 rounded-[32px] border border-[#F2D6E4] shadow-xs hover:border-brand-rose/20 transition-all duration-300">
      <div className="flex items-center justify-center w-9 h-9 bg-brand-plum text-white font-serif rounded-full shrink-0 font-bold text-sm shadow-sm">
        {step.number}
      </div>
      <div>
        <h4 className="font-serif text-lg font-bold text-brand-plum mb-1.5 leading-tight">
          {step.title}
        </h4>
        <p className="font-sans text-[13px] text-neutral-mid leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

/**
 * Reusable ReviewCard Component
 */
export function ReviewCard({ review }: { review: Review }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  let objectPosition = 'center';
  if (review.photoUrl?.includes('thamayanthi_green_saree')) {
    objectPosition = '50% 28%';
  } else if (review.photoUrl?.includes('flawless_pleats_darshan')) {
    objectPosition = 'center 35%';
  } else if (review.photoUrl?.includes('two_minutes_maggi')) {
    objectPosition = 'center 45%';
  } else if (review.photoUrl?.includes('packed_abroad_green')) {
    objectPosition = 'center 22%';
  }

  return (
    <>
      <div className="bg-white rounded-[32px] p-5 border border-[#F2D6E4] shadow-xs flex flex-col justify-between h-full w-full">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-serif text-base font-bold text-brand-plum">
              {review.name}
            </h4>
            {review.date && (
              <span className="text-[10px] text-neutral-mid font-medium">
                {review.date}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex gap-0.5 text-brand-rose">
              {Array.from({ length: 5 }).map((_, i) => (
                <Lucide.Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.stars ? 'fill-brand-rose' : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            {review.sareeType && (
              <span className="text-[8.5px] font-bold text-brand-plum bg-brand-blush/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {review.sareeType}
              </span>
            )}
          </div>

          <p className="font-sans text-xs text-[#4A4A4A] leading-relaxed italic mb-4">
            "{review.text}"
          </p>
        </div>

        {/* Media / Photo Showcase Section */}
        {review.photoUrl ? (
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="mt-2 relative group rounded-2xl overflow-hidden aspect-square border border-brand-blush/30 cursor-pointer shadow-3xs"
          >
            <img
              src={review.photoUrl}
              alt={`${review.name}'s saree drape`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#6b1f4a]/10 group-hover:bg-[#6b1f4a]/20 transition-colors flex items-end justify-between p-3">
              <span className="bg-white/90 backdrop-blur-3xs text-brand-plum text-[8.5px] font-bold tracking-wider uppercase px-2 py-1 rounded-md shadow-3xs flex items-center gap-1">
                <Lucide.Camera className="w-3 h-3 text-brand-rose" />
                Client Drape Photo
              </span>
              <span className="bg-brand-plum text-white p-1.5 rounded-full shadow-3xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Lucide.Maximize2 className="w-3 h-3" />
              </span>
            </div>
          </div>
        ) : review.chatScreenshot ? (
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="mt-2 relative group rounded-2xl overflow-hidden aspect-video border border-brand-blush/20 cursor-pointer bg-[#FAF7F9] flex flex-col items-center justify-center p-3 text-center border-dashed"
          >
            {/* Displaying screenshot thumbnail */}
            <div className="w-full h-full relative overflow-hidden rounded-lg">
              <img
                src={review.chatScreenshot}
                alt="WhatsApp Chat Feedback"
                className="w-full h-full object-cover object-[50%_15%] opacity-60 filter blur-[0.5px] group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-plum/10 group-hover:bg-brand-plum/20 transition-all flex flex-col items-center justify-center">
                <div className="bg-white/95 backdrop-blur-3xs border border-[#F2D6E4] px-3 py-2 rounded-xl shadow-xs flex items-center gap-2">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-600">
                    <Lucide.MessageSquare className="w-3.5 h-3.5 fill-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-neutral-dark uppercase leading-none">Verified Chat</p>
                    <p className="text-[8px] text-neutral-mid leading-none mt-1">Click to view screenshot</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : review.videoThumbnail ? (
          <div className="mt-2 relative group rounded-2xl overflow-hidden aspect-video border border-brand-blush/30">
            <img
              src={review.videoThumbnail}
              alt="Customer review video thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-plum/10 group-hover:bg-brand-plum/20 transition-colors flex items-center justify-center">
              <div className="bg-white/90 p-2.5 rounded-full shadow-md text-brand-plum hover:scale-110 transition-transform">
                <Lucide.Play className="h-4 w-4 fill-brand-plum" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Fullscreen Lightbox Modal for Photo / Chat screenshots */}
      {isLightboxOpen && createPortal(
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 bg-[#FAF7F9]/90 z-[10005] flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-brand-blush/25 cursor-default"
          >
            {/* Close trigger button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 bg-brand-plum/10 hover:bg-brand-plum/20 text-brand-plum rounded-full p-2 z-[10010] cursor-pointer transition-colors"
            >
              <Lucide.X className="w-4 h-4" />
            </button>

            {/* Displaying target image */}
            <div className="w-full flex-1 bg-[#FAF7F9] overflow-y-auto no-scrollbar flex items-center justify-center">
              <img
                src={review.chatScreenshot || review.photoUrl}
                alt={`${review.name}'s verified client feedback`}
                className="w-full h-auto max-h-[75vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Sticky Info footer */}
            <div className="p-4 bg-[#FAF7F9] border-t border-[#F2D6E4]/40 text-left">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-serif text-sm font-bold text-brand-plum">
                  {review.name}
                </h4>
                {review.date && (
                  <span className="text-[10px] text-neutral-mid font-medium">{review.date}</span>
                )}
              </div>
              <p className="text-[11px] text-[#444] italic">
                "{review.text}"
              </p>
              {review.sareeType && (
                <span className="inline-block mt-2 text-[8px] font-bold text-brand-rose bg-brand-rose/10 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {review.sareeType}
                </span>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/**
 * Reusable FAQItem Accordion Component
 */
export function FAQItem({ item }: { item: FaqItemType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-blush/30 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-1 flex justify-between items-center text-left focus:outline-none focus:text-brand-plum transition-colors group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-base font-semibold text-neutral-dark group-hover:text-brand-plum transition-colors pr-4">
          {item.question}
        </span>
        <div className="p-1 rounded-lg bg-brand-blush/30 text-brand-plum shrink-0">
          {isOpen ? (
            <Lucide.ChevronUp className="h-4.5 w-4.5" />
          ) : (
            <Lucide.ChevronDown className="h-4.5 w-4.5" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="font-sans text-xs text-neutral-mid leading-relaxed pb-4 px-1">
          {item.answer}
        </p>
      </motion.div>
    </div>
  );
}
