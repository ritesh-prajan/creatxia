import React from 'react';
import { PageView } from '../types';

// ─── Single Skeleton Primitive Components ─────────────────────────────────────

interface BoneProps {
  className?: string;
}

export function SkeletonPulse({ className = '' }: BoneProps) {
  return (
    <div className={`animate-pulse bg-brand-blush/20 rounded-md ${className}`} />
  );
}

export function SkeletonCircle({ className = '' }: BoneProps) {
  return <SkeletonPulse className={`rounded-full shrink-0 ${className}`} />;
}

export function SkeletonText({ className = '' }: BoneProps) {
  return <SkeletonPulse className={`h-3 w-5/6 ${className}`} />;
}

export function SkeletonButton({ className = '' }: BoneProps) {
  return <SkeletonPulse className={`h-11 rounded-full ${className}`} />;
}

// ─── Section Title Skeleton ──────────────────────────────────────────────────

export function SkeletonSectionTitle() {
  return (
    <div className="space-y-3 pb-4 max-w-xl">
      {/* Decorative short line */}
      <SkeletonPulse className="h-1.5 w-16 bg-brand-rose/25 mx-auto md:mx-0" />
      {/* Main Title heading line */}
      <SkeletonPulse className="h-8 w-64 bg-brand-plum/10 mx-auto md:mx-0" />
      {/* Subtitle description line */}
      <SkeletonPulse className="h-3 w-96 max-w-full bg-brand-blush/30 mx-auto md:mx-0" />
    </div>
  );
}

// ─── Compound Page Level Skeletons ───────────────────────────────────────────

function ServicesPageSkeleton() {
  return (
    <div className="space-y-16 py-12 px-6">
      <section className="space-y-8">
        <SkeletonSectionTitle />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border border-brand-blush/10 rounded-2xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex gap-4">
                <SkeletonCircle className="h-12 w-12 bg-brand-plum/5" />
                <div className="space-y-2 flex-1">
                  <SkeletonPulse className="h-5 w-40 bg-brand-plum/10" />
                  <SkeletonText className="w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <SkeletonText className="w-full" />
                <SkeletonText className="w-5/6" />
                <SkeletonText className="w-4/5" />
              </div>
              <div className="flex gap-2 pt-2 justify-between items-center">
                <SkeletonPulse className="h-6 w-24 rounded-full" />
                <SkeletonPulse className="h-10 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SkeletonSectionTitle />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border border-brand-blush/10 rounded-2xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex gap-4">
                <SkeletonCircle className="h-12 w-12 bg-brand-plum/5" />
                <div className="space-y-2 flex-1">
                  <SkeletonPulse className="h-5 w-40 bg-brand-plum/10" />
                  <SkeletonText className="w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <SkeletonText className="w-full" />
                <SkeletonText className="w-5/6" />
              </div>
              <div className="flex gap-2 pt-2 justify-between items-center">
                <SkeletonPulse className="h-6 w-24 rounded-full" />
                <SkeletonPulse className="h-10 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ClassesPageSkeleton() {
  return (
    <div className="space-y-12 py-12 px-6">
      <SkeletonSectionTitle />
      {/* Category selector row */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
        <SkeletonPulse className="h-10 w-24 rounded-full shrink-0" />
        <SkeletonPulse className="h-10 w-32 rounded-full shrink-0" />
        <SkeletonPulse className="h-10 w-28 rounded-full shrink-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-brand-blush/10 rounded-2xl bg-white shadow-xs overflow-hidden flex flex-col h-full">
            <SkeletonPulse className="aspect-video w-full" />
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between items-start gap-2">
                  <SkeletonPulse className="h-5 w-32 bg-brand-plum/10" />
                  <SkeletonPulse className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <SkeletonCircle key={s} className="h-3 w-3 bg-brand-rose/20" />
                  ))}
                </div>
                <div className="space-y-2 pt-1">
                  <SkeletonText className="w-full" />
                  <SkeletonText className="w-11/12" />
                  <SkeletonText className="w-4/5" />
                </div>
                <div className="flex gap-2 pt-1">
                  <SkeletonPulse className="h-6 w-20 rounded-full" />
                  <SkeletonPulse className="h-6 w-24 rounded-full" />
                </div>
              </div>
              <div className="pt-4 border-t border-brand-blush/10 flex justify-between items-center">
                <SkeletonPulse className="h-7 w-20" />
                <SkeletonPulse className="h-10 w-28 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsPageSkeleton() {
  return (
    <div className="space-y-12 py-12 px-6">
      <SkeletonSectionTitle />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-brand-blush/10 rounded-2xl p-6 bg-white shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <SkeletonCircle className="h-10 w-10 bg-brand-plum/5" />
              <div className="space-y-1.5 flex-1">
                <SkeletonPulse className="h-4 w-28 bg-brand-plum/10" />
                <SkeletonPulse className="h-3 w-20" />
              </div>
              <div className="flex gap-0.5 shrink-0">
                {[1, 2, 3, 4, 5].map((s) => (
                  <SkeletonPulse key={s} className="h-3 w-3 rounded-full bg-brand-rose/25" />
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <SkeletonText className="w-full" />
              <SkeletonText className="w-11/12" />
              <SkeletonText className="w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQPageSkeleton() {
  return (
    <div className="space-y-10 py-12 px-6 max-w-4xl mx-auto">
      <SkeletonSectionTitle />
      {/* Search Bar Skeleton */}
      <div className="max-w-xl mx-auto">
        <SkeletonPulse className="h-12 w-full rounded-2xl" />
      </div>

      {/* Categories Row */}
      <div className="flex gap-2 pt-2 overflow-x-auto no-scrollbar justify-start sm:justify-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonPulse key={i} className="h-9 w-24 rounded-full shrink-0" />
        ))}
      </div>

      {/* FAQ items */}
      <div className="space-y-3 pt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border border-brand-blush/10 rounded-xl p-4 bg-white shadow-xs flex justify-between items-center">
            <SkeletonPulse className="h-5 w-2/3 bg-brand-plum/5" />
            <SkeletonCircle className="h-6 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormPageSkeleton() {
  return (
    <div className="py-12 px-6 max-w-3xl mx-auto space-y-8">
      <SkeletonSectionTitle />
      <div className="bg-white border border-brand-blush/15 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-11 w-full rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-32" />
            <SkeletonPulse className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-28" />
            <SkeletonPulse className="h-11 w-full rounded-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <SkeletonPulse className="h-4 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SkeletonPulse className="h-14 w-full rounded-xl" />
            <SkeletonPulse className="h-14 w-full rounded-xl" />
            <SkeletonPulse className="h-14 w-full rounded-xl" />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <SkeletonButton className="w-full bg-brand-plum/10" />
        </div>
      </div>
    </div>
  );
}

function HomePageSkeleton() {
  return (
    <div className="space-y-16">
      {/* Hero section skeleton */}
      <section className="bg-brand-blush/10 py-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          <div className="md:col-span-7 space-y-6">
            <SkeletonPulse className="h-6 w-36 rounded-full" />
            <div className="space-y-3">
              <SkeletonPulse className="h-12 w-11/12 bg-brand-plum/10" />
              <SkeletonPulse className="h-12 w-2/3 bg-brand-plum/10" />
            </div>
            <div className="space-y-2.5 max-w-md pt-2">
              <SkeletonText className="w-full" />
              <SkeletonText className="w-5/6" />
              <SkeletonText className="w-4/5" />
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <SkeletonButton className="w-44 bg-brand-plum/15" />
              <SkeletonButton className="w-44 bg-transparent border border-brand-plum/20" />
            </div>
          </div>
          <div className="md:col-span-5 relative flex justify-center">
            <SkeletonCircle className="h-72 w-72 md:h-80 md:w-80 bg-brand-blush/20 border border-brand-blush/20" />
          </div>
        </div>
      </section>

      {/* Trust badges skeleton */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center p-4 border border-brand-blush/10 rounded-2xl space-y-2">
            <SkeletonCircle className="h-10 w-10 bg-brand-plum/5" />
            <SkeletonPulse className="h-4 w-20" />
            <SkeletonPulse className="h-3 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      {/* Pleating Workflow */}
      <section className="space-y-6">
        <SkeletonSectionTitle />
        <div className="text-center py-2">
          <SkeletonPulse className="h-6 w-32 rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-brand-blush/10 rounded-2xl p-5 bg-white space-y-3">
              <SkeletonCircle className="h-8 w-8 bg-brand-plum/10" />
              <SkeletonPulse className="h-4 w-20 bg-brand-plum/5" />
              <SkeletonText className="w-full" />
              <SkeletonText className="w-4/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Academy Process */}
      <section className="space-y-6 pt-12 border-t border-brand-blush/10">
        <div className="text-center py-2">
          <SkeletonPulse className="h-6 w-36 rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-brand-blush/10 rounded-2xl p-6 bg-white space-y-3">
              <SkeletonCircle className="h-8 w-8 bg-brand-plum/10" />
              <SkeletonPulse className="h-4 w-24 bg-brand-plum/5" />
              <SkeletonText className="w-full" />
              <SkeletonText className="w-11/12" />
            </div>
          ))}
        </div>
      </section>

      {/* In depth operational guidelines */}
      <section className="space-y-8 pt-12 border-t border-brand-blush/10">
        <div className="text-center space-y-2">
          <SkeletonPulse className="h-5 w-48 rounded-full mx-auto" />
          <SkeletonPulse className="h-7 w-80 bg-brand-plum/5 mx-auto" />
          <SkeletonPulse className="h-3.5 w-96 max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-brand-blush/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <SkeletonCircle className="h-5 w-5 bg-brand-plum/10" />
                  <SkeletonPulse className="h-4 w-32 bg-brand-plum/5" />
                </div>
                <SkeletonText className="w-full" />
                <SkeletonText className="w-5/6" />
                <SkeletonText className="w-4/5" />
              </div>
              <div className="pt-4 border-t border-brand-blush/5 mt-4">
                <SkeletonPulse className="h-3.5 w-20" />
                <SkeletonText className="w-full mt-1.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      <section className="space-y-6">
        <SkeletonSectionTitle />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column Map */}
          <div className="border border-brand-blush/10 rounded-2xl overflow-hidden bg-white">
            <SkeletonPulse className="h-64 w-full" />
            <div className="p-5 space-y-3">
              <SkeletonPulse className="h-3.5 w-36" />
              <SkeletonPulse className="h-5 w-48 bg-brand-plum/5" />
              <SkeletonText className="w-full" />
              <SkeletonText className="w-4/5" />
            </div>
          </div>

          {/* Right Column Channels */}
          <div className="space-y-6">
            <div className="p-4 bg-white/50 border border-brand-blush/10 rounded-2xl space-y-4">
              <SkeletonPulse className="h-5 w-28 rounded-full" />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-100 flex flex-col items-center space-y-3">
                  <SkeletonCircle className="h-8 w-8 bg-emerald-500/10" />
                  <SkeletonPulse className="h-4 w-20 bg-brand-plum/5" />
                  <SkeletonPulse className="h-3 w-28" />
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-100 flex flex-col items-center space-y-3">
                  <SkeletonCircle className="h-8 w-8 bg-brand-rose/10" />
                  <SkeletonPulse className="h-4 w-20 bg-brand-plum/5" />
                  <SkeletonPulse className="h-3 w-28" />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-brand-blush/10 rounded-2xl border border-brand-blush/20 p-6 space-y-3">
              <SkeletonPulse className="h-3 w-24" />
              <SkeletonPulse className="h-5 w-40 bg-brand-plum/5" />
              <SkeletonText className="w-full" />
              <SkeletonText className="w-11/12" />
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ section */}
      <section className="space-y-6 pt-6 border-t border-brand-blush/10">
        <div className="text-center space-y-2 mb-5">
          <SkeletonPulse className="h-6 w-52 bg-brand-plum/5 mx-auto" />
          <SkeletonPulse className="h-0.5 w-12 bg-brand-rose/20 mx-auto" />
        </div>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush/10 max-w-4xl mx-auto space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-4 border-b border-neutral-100 flex justify-between items-center last:border-b-0">
              <SkeletonPulse className="h-4 w-1/2 bg-brand-plum/5" />
              <SkeletonCircle className="h-5 w-5 bg-brand-rose/15" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Main Dispatching Skeleton View ──────────────────────────────────────────

interface SkeletonPageProps {
  page: PageView;
}

export default function SkeletonPage({ page }: SkeletonPageProps) {
  switch (page) {
    case 'services':
      return <ServicesPageSkeleton />;
    case 'classes':
      return <ClassesPageSkeleton />;
    case 'reviews':
    case 'gallery':
      return <ReviewsPageSkeleton />;
    case 'faq':
      return <FAQPageSkeleton />;
    case 'how-it-works':
      return <HowItWorksPageSkeleton />;
    case 'contact':
      return <ContactPageSkeleton />;
    case 'book':
    case 'book-class':
      return <FormPageSkeleton />;
    case 'about-developer':
      return <HowItWorksPageSkeleton />;
    case 'home':
    default:
      return <HomePageSkeleton />;
  }
}
