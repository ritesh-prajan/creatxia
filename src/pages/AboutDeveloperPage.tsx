import React from 'react';
import { ExternalLink, Code2, Sparkles, Laptop, ShieldCheck, Heart } from 'lucide-react';

export default function AboutDeveloperPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-fadeIn text-left font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-plum to-brand-rose text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="relative z-10 space-y-4 max-w-xl">
          <span className="text-[10px] font-bold tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full uppercase inline-block">
            Creator Profile
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
            Meet the Developer
          </h1>
          <p className="text-sm md:text-base text-neutral-100 leading-relaxed font-light">
            Crafting beautiful digital experiences. Learn more about the creator behind Tuck & Pin's high-fidelity draping platform.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Card: Quick Info */}
        <div className="md:col-span-1 bg-white border border-[#F2D6E4] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-brand-blush/40 flex items-center justify-center text-brand-plum">
              <Code2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-dark">
                Ritesh Prajan
              </h2>
              <p className="text-xs text-brand-rose font-medium tracking-wide uppercase mt-1">
                Full-Stack Developer
              </p>
            </div>
            <p className="text-xs text-neutral-mid leading-relaxed">
              Specialized in crafting fast, responsive, and visually stunning web applications with modern design languages.
            </p>
          </div>

          <a
            href="https://riteshprajanportfolio.netlify.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-brand-plum hover:bg-[#521337] text-white font-medium text-xs py-3.5 px-6 rounded-full shadow-md select-none transition-all active:scale-[0.98] w-full text-center"
          >
            <span>View Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right Columns: Skills & Platform Engineering */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Engineering details */}
          <div className="bg-white border border-[#F2D6E4] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-brand-plum flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-brand-rose" />
              Digital Craftsmanship
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-mid leading-relaxed">
              This platform was built to solve the offline styling coordination bottleneck for saree drapery services in Chennai. By coupling lightweight frontend routing, robust state synchronization, and reactive design aesthetics, Tuck & Pin guarantees a zero-latency client booking process.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3">
                <div className="bg-brand-blush/30 p-2 rounded-xl h-fit text-brand-rose shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-dark">Modern Stack Integration</h4>
                  <p className="text-[11px] text-neutral-mid leading-relaxed mt-1">
                    Powered by React, TypeScript, and TailwindCSS for high-performance builds.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-brand-blush/30 p-2 rounded-xl h-fit text-brand-rose shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-dark">Enterprise Standards</h4>
                  <p className="text-[11px] text-neutral-mid leading-relaxed mt-1">
                    Self-cleaning storage filters, portal constraints, and high-fidelity error isolation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note card */}
          <div className="bg-[#FAF7F9] border border-[#F2D6E4]/40 rounded-3xl p-6 flex items-center gap-4">
            <div className="bg-white p-2.5 rounded-full text-brand-rose shadow-2xs">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <p className="text-[11px] text-neutral-mid leading-relaxed">
              Designed and engineered with absolute attention to detail to ensure clients feel the luxury experience of Tuck & Pin Chennai.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
