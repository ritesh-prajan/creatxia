import React, { useState, useRef, useEffect } from 'react';
import { Camera, Check, ShieldCheck, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeDesc: string;
  afterDesc: string;
  stats: { label: string; value: string };
}

const COMPARISONS: GalleryItem[] = [
  {
    id: 'bridal-kanchipuram',
    category: 'Golden Silk Saree',
    title: 'Traditional Golden Cream Silk',
    description: 'Watch our scientific box-pleating turn loose, sagging waist folds into ultra-flat, clean vertical pleats in seconds.',
    beforeImg: '/reviews/cream_saree_raw.jpg', // Messy/Raw drape
    afterImg: '/reviews/cream_saree_perfect.jpg', // Perfect box-pleated drape
    beforeDesc: 'Slippery fabric wraps unevenly, causing bulky waist folds and loose pleats that sag over the feet.',
    afterDesc: 'Pristine box-pleated silhouette with 100% uniform pleat lines locked flat for a slim, neat traditional fall.',
    stats: { label: 'Time Saved', value: '45 mins' },
  },
];

export default function BeforeAfterGallery() {
  const [activeTab, setActiveTab] = useState<string>('bridal-kanchipuram');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeItem = COMPARISONS.find(item => item.id === activeTab) || COMPARISONS[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) {
        // Prevent body/background scroll while interactively dragging on mobile
        if (e.cancelable) {
          e.preventDefault();
        }
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp, { passive: true });
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);

  const onDragStart = () => {
    isDragging.current = true;
  };

  return (
    <section className="py-12 border-t border-[#F2D6E4]/40 font-sans mt-8 text-left">
      <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3.5 py-1.5 rounded-full uppercase inline-block">
          Interactive Proof
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum tracking-tight">
          Saree Before & After Transformations
        </h2>
        <p className="text-xs sm:text-sm text-neutral-mid leading-relaxed">
          See the dramatic comparison between self-pleated struggle and our scientific, box-cured atelier pre-pleating.
        </p>
      </div>



      {/* Dynamic Comparison Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#F2D6E4]/25 p-5 sm:p-8 rounded-3xl shadow-sm">
        
        {/* Interactive Split Slider Container (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            ref={containerRef}
            onMouseDown={onDragStart}
            onTouchStart={onDragStart}
            onMouseMove={(e) => {
              if (isDragging.current) {
                handleMove(e.clientX);
              }
            }}
            onTouchMove={(e) => {
              if (isDragging.current && e.touches[0]) {
                handleMove(e.touches[0].clientX);
              }
            }}
            className="relative aspect-square sm:aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#F2D6E4]/30 shadow-xs"
          >
            {/* After State (Always visible in background) */}
            <img
              src={activeItem.afterImg}
              alt="After pre-pleating"
              className="absolute inset-0 w-full h-full object-cover scale-125 origin-center"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-4 right-4 z-20 bg-brand-plum text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-xs backdrop-blur-2xs">
              Perfected Drape
            </span>

            {/* Before State (Clipped based on slider position) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeItem.beforeImg}
                alt="Before pre-pleating"
                className="absolute inset-0 w-full h-full object-cover max-w-none scale-125 origin-center"
                style={{ width: containerRef.current?.getBoundingClientRect().width }}
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 z-20 bg-neutral-dark/80 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-xs">
                Raw Fold
              </span>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-md"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-brand-plum rounded-full p-2 shadow-md border border-[#F2D6E4] flex items-center justify-center scale-90 sm:scale-100 hover:scale-105 active:scale-95 transition-transform">
                <RefreshCw className="w-4 h-4 text-brand-plum" />
              </div>
            </div>
          </div>

          {/* Instruction footnote */}
          <p className="text-[10px] text-neutral-mid text-center flex items-center justify-center gap-1.5 pt-1">
            <Camera className="w-3.5 h-3.5 text-brand-rose" />
            Hover and drag or slide the handle to interactively compare raw folds vs styled master drapes.
          </p>
        </div>

        {/* Description & Verification Copy (5 Cols) */}
        <div className="lg:col-span-5 text-left space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-brand-rose uppercase tracking-widest block leading-none">
              {activeItem.category} Case
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum">
              {activeItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-mid leading-relaxed">
              {activeItem.description}
            </p>
          </div>

          {/* Before vs After Bullet Details */}
          <div className="space-y-3.5 pt-1 font-sans">
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 flex gap-3 text-left">
              <div className="h-5 w-5 bg-neutral-200 text-neutral-600 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">
                ✕
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider block">Raw Self-Pleated</span>
                <p className="text-[11px] text-neutral-mid leading-relaxed mt-0.5">
                  {activeItem.beforeDesc}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-brand-blush/10 rounded-xl border border-brand-rose/10 flex gap-3 text-left">
              <div className="h-5 w-5 bg-brand-rose/20 text-brand-plum rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-bold text-brand-plum uppercase tracking-wider block">Atelier Tuck & Pin Perfected</span>
                <p className="text-[11px] text-[#555] leading-relaxed mt-0.5">
                  {activeItem.afterDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#F2D6E4]/25">
            <div className="space-y-0.5">
              <span className="text-[10px] text-neutral-mid font-medium block">{activeItem.stats.label}</span>
              <span className="text-lg font-serif font-bold text-brand-plum flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-rose shrink-0" />
                {activeItem.stats.value}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-neutral-mid font-medium block">Hold Guarantee</span>
              <span className="text-lg font-serif font-bold text-brand-plum flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-rose shrink-0" />
                No Pins Pulled
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
