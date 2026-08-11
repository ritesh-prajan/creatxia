import React from 'react';
import { SectionTitle, StepCard } from '../components/UI';
import { pleatingSteps, classesSteps } from '../data';
import { Package, Scan, Ruler, Gift, UserCheck, Zap } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-fadeIn text-left">
      {/* For Pleating Service */}
      <section className="space-y-6">
        <SectionTitle
          title="How It Works"
          subtitle="Our simplified 5-step pleating workflow designed for ultimate convenience."
        />

        <div className="space-y-6">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3.5 py-1.5 rounded-sm uppercase inline-block font-sans">
              Pleating Workflow
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pleatingSteps.map((step) => (
              <div key={step.number} className="flex h-full">
                <StepCard step={step} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Classes */}
      <section className="space-y-6 pt-12 border-t border-brand-blush/25">
        <div className="text-center">
          <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3.5 py-1.5 rounded-sm uppercase inline-block mx-auto mb-4 font-sans">
            Academy Process
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classesSteps.map((step) => (
            <div key={step.number} className="flex h-full">
              <StepCard step={step} />
            </div>
          ))}
        </div>
      </section>

      {/* 6 Core In-Depth Operations Sections */}
      <section className="space-y-8 pt-12 border-t border-brand-blush/25">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3.5 py-1.5 rounded-full uppercase inline-block font-sans">
            In-Depth operational guidelines
          </span>
          <h3 className="font-serif text-2xl font-bold text-brand-plum">
            Understanding the Tuck & Pin Method
          </h3>
          <p className="text-xs text-neutral-mid max-w-xl mx-auto font-sans">
            Learn more about our strict storage policies, professional pleat mathematics, doorstep packaging standards, and wear techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {/* Card 1: How to Pack before sending */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blush/20 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-plum">
                <Package className="h-5 w-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm">Packing Your Saree</h4>
              </div>
              <p className="text-xs text-neutral-mid leading-relaxed">
                Ensure your saree is clean and dry before dispatch. Fold it loosely in three or four layers to avoid harsh fabric folds. Place it securely in a water-resistant zip bag or clear envelope before sliding it in your courier envelope.
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-brand-blush/10 bg-brand-blush/5 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-brand-rose uppercase block">What to Avoid:</span>
              <p className="text-[10px] text-neutral-mid leading-normal mt-0.5">
                Do NOT use safety pins on delicate silks before courier, and do NOT wrap fabric tightly around hard cardboard edges as they can warp border profiles.
              </p>
            </div>
          </div>

          {/* Card 2: What happens when we receive it */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blush/20 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-plum">
                <Scan className="h-5 w-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm">In-Studio Saree Intake</h4>
              </div>
              <p className="text-xs text-neutral-mid leading-relaxed">
                The moment your package drops off at our Chennai lab, we weigh the package and photograph the weave edges. We attach a dedicated tracking barcode with your unique booking reference ID to bypass mix-ups.
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-brand-blush/10 bg-brand-blush/5 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-brand-rose uppercase block">WhatsApp Alerts:</span>
              <p className="text-[10px] text-neutral-mid leading-normal mt-0.5">
                Within 15 minutes of intake entry, an automated receipt confirmation drops on your WhatsApp phone with live pictures of your fabric.
              </p>
            </div>
          </div>

          {/* Card 3: How we read measurements */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blush/20 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-plum">
                <Ruler className="h-5 w-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm">The Hip-to-Pleat Math</h4>
              </div>
              <p className="text-xs text-neutral-mid leading-relaxed">
                We do not use templates. Our master style mechanics review your exact hip-to-waist ratio to establish the precise fold width. This calculation guides fabric distribution so the pleats stack together flat.
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-brand-blush/10 bg-brand-blush/5 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-brand-rose uppercase block">Dynamic Profiles:</span>
              <p className="text-[10px] text-neutral-mid leading-normal mt-0.5">
                Higher hip configurations set sturdy, layered box pleats, while trim waists receive narrow, ultra-compact step folds.
              </p>
            </div>
          </div>

          {/* Card 4: How we pack the finished saree */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blush/20 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-plum">
                <Gift className="h-5 w-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm">Pristine Saree Wrapping</h4>
              </div>
              <p className="text-xs text-neutral-mid leading-relaxed">
                After styling, the finished saree is wrapped gently around flexible internal mold inserts to preserve shape. We secure the layers using custom alignment safety-locks with soft needle caps to prevent thread pulls.
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-brand-blush/10 bg-brand-blush/5 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-brand-rose uppercase block">Inside the Box:</span>
              <p className="text-[10px] text-neutral-mid leading-normal mt-0.5">
                Every package arrives inside a reusable dustproof wardrobe pouch, featuring 5 premium stainless steel drapes and a visual stepwear guide.
              </p>
            </div>
          </div>

          {/* Card 5: How to wear a pre-pleated saree */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blush/20 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-plum">
                <UserCheck className="h-5 w-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm">3-Minute Saree Slip-On</h4>
              </div>
              <p className="text-xs text-neutral-mid leading-relaxed">
                Wearing it is simple. Step 1: Wear your underskirt or shapewear. Step 2: Slide the pre-aligned pleats inside your waistband. Step 3: Simply drag the pre-locked pallu across your left shoulder and pin.
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-brand-blush/10 bg-brand-blush/5 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-brand-rose uppercase block">Master Pallu Tip:</span>
              <p className="text-[10px] text-neutral-mid leading-normal mt-0.5">
                Secure the pallu 2 inches behind your shoulder peak rather than right on top; this secures the weight balances and prevents forward sliding.
              </p>
            </div>
          </div>

          {/* Card 6: How urgent dispatch works */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blush/20 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-plum">
                <Zap className="h-5 w-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm">Urgent 5-Hour Express</h4>
              </div>
              <p className="text-xs text-neutral-mid leading-relaxed">
                By choosing our 5-hour express option (₹150 surcharge), your order triggers a high-priority tag immediately. It joins a dedicated express queue when our Dunzo partner drops it off.
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-brand-blush/10 bg-brand-blush/5 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-brand-rose uppercase block">Continuous Priority:</span>
              <p className="text-[10px] text-neutral-mid leading-normal mt-0.5">
                Our in-house master is designated immediately to iron, pin and pack. Your package is back with Dunzo and returning home within 5 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
