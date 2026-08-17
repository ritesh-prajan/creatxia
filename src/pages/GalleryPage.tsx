import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X, ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import { PageView } from '../types';

interface GalleryItem {
  id: string;
  category: 'Celebrity' | 'Bridal & Festive' | 'Pre-Pleated Drapes' | 'Studio Showcase';
  image: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g_1',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_0582.jpg',
  },
  {
    id: 'g_2',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e0269.jpg',
  },
  {
    id: 'g_3',
    category: 'Celebrity',
    image: '/gallery/img_e1084.jpg',
  },
  {
    id: 'g_4',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e1100.jpg',
  },
  {
    id: 'g_5',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e1371.jpg',
  },
  {
    id: 'g_6',
    category: 'Celebrity',
    image: '/gallery/img_e1376.jpg',
  },
  {
    id: 'g_7',
    category: 'Celebrity',
    image: '/gallery/img_e1379.jpg',
  },
  {
    id: 'g_8',
    category: 'Celebrity',
    image: '/gallery/img_e1509.jpg',
  },
  {
    id: 'g_9',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e1528.jpg',
  },
  {
    id: 'g_10',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e1547.jpg',
  },
  {
    id: 'g_11',
    category: 'Studio Showcase',
    image: '/gallery/img_e1661.jpg',
  },
  {
    id: 'g_12',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e3999.jpg',
  },
  {
    id: 'g_13',
    category: 'Bridal & Festive',
    image: '/gallery/img_e4019.jpg',
  },
  {
    id: 'g_14',
    category: 'Studio Showcase',
    image: '/gallery/img_e4812.jpg',
  },
  {
    id: 'g_15',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e5383.jpg',
  },
  {
    id: 'g_16',
    category: 'Bridal & Festive',
    image: '/gallery/img_e5560.jpg',
  },
  {
    id: 'g_17',
    category: 'Celebrity',
    image: '/gallery/img_e8577.jpg',
  },
  {
    id: 'g_18',
    category: 'Celebrity',
    image: '/gallery/img_e8655.jpg',
  },
  {
    id: 'g_19',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/jbkm2418.jpg',
  },
  {
    id: 'g_20',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/kzqq3563.jpg',
  },
  {
    id: 'g_21',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/pnra7250.jpg',
  },
  {
    id: 'g_22',
    category: 'Bridal & Festive',
    image: '/gallery/qndd2515.jpg',
  },
  {
    id: 'g_23',
    category: 'Studio Showcase',
    image: '/gallery/uhvn7069.jpg',
  },
  {
    id: 'g_24',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/ykoi7845.jpg',
  },
];

interface GalleryPageProps {
  navigateTo: (page: PageView) => void;
  onBookService?: (serviceName: string, photoUrl?: string) => void;
}

export default function GalleryPage({ navigateTo, onBookService }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All'
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-10 font-sans animate-fadeIn text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-plum via-[#681947] to-brand-rose text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="text-[10px] font-bold tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Photo Showcase
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
            Client & Studio Gallery
          </h1>
          <p className="text-sm md:text-base text-neutral-100 leading-relaxed font-light">
            Explore our portfolio of 24 real pre-pleated saree transformations, celebrity draping styles, and studio craftsmanship.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-blush/20 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Celebrity', 'Bridal & Festive', 'Pre-Pleated Drapes', 'Studio Showcase'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`py-2 px-4 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-plum text-white shadow-xs'
                  : 'bg-brand-blush/20 text-neutral-mid hover:bg-brand-blush/35 hover:text-brand-plum'
              }`}
            >
              {cat} {cat === 'All' ? `(${galleryData.length})` : ''}
            </button>
          ))}
        </div>

        <div className="text-xs text-neutral-mid hidden sm:block">
          Showing <span className="font-bold text-brand-plum">{filteredItems.length}</span> photos
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group bg-white rounded-2xl overflow-hidden border border-[#F2D6E4] shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-warm/20">
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="bg-white/95 text-brand-plum text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1 shadow-xs">
                  <Eye className="w-3.5 h-3.5" />
                  View Fullscreen
                </span>
              </div>
              <span className="absolute top-3 left-3 bg-brand-plum/90 backdrop-blur-md text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-2xs">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentItem && createPortal(
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/90 z-[10005] flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out animate-fadeIn font-sans"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-neutral-dark text-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-white/10 cursor-default"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-rose block">
                  {currentItem.category} • Photo {lightboxIndex! + 1} of {filteredItems.length}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview & Navigation Arrows */}
            <div className="relative flex-1 bg-black/60 flex items-center justify-center p-4 min-h-[360px] overflow-hidden">
              <img
                src={currentItem.image}
                alt={currentItem.category}
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-lg"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-plum text-white p-3 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-plum text-white p-3 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer Bar */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-neutral-300 block">Selected Style</span>
                <span className="font-serif font-bold text-white text-sm">
                  {currentItem.category} Style (Photo #{lightboxIndex! + 1})
                </span>
              </div>

              <button
                onClick={() => {
                  closeLightbox();
                  const styleRefName = `${currentItem.category} Style (Photo #${lightboxIndex! + 1})`;
                  if (onBookService) onBookService(styleRefName, currentItem.image);
                  navigateTo('book');
                }}
                className="w-full sm:w-auto bg-brand-plum hover:bg-brand-rose active:scale-95 text-white font-bold text-xs py-3 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Book This Style</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
