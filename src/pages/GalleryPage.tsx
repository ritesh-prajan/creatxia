import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X, ChevronLeft, ChevronRight, CalendarDays, ExternalLink, Filter, Eye } from 'lucide-react';
import { PageView } from '../types';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Celebrity & Designer' | 'Bridal & Festive' | 'Pre-Pleated Drapes' | 'Studio Showcase';
  image: string;
  sareeType: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g_1',
    title: 'Celebrity Golden Champagne Silk Drape',
    category: 'Celebrity & Designer',
    image: '/gallery/img_0582.jpg',
    sareeType: 'Champagne Gold Tissue Silk',
  },
  {
    id: 'g_2',
    title: 'Celebrity Metallic Satin Cocktail Saree',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e0269.jpg',
    sareeType: 'Contemporary Satin Silk',
  },
  {
    id: 'g_3',
    title: 'Celebrity Kanchipuram Box Fold Drape',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1084.jpg',
    sareeType: 'Pure Kanchipuram Silk',
  },
  {
    id: 'g_4',
    title: 'Celebrity Pleated Pallu Styling',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1100.jpg',
    sareeType: 'Designer Crepe Silk',
  },
  {
    id: 'g_5',
    title: 'Celebrity Sheer Organza Drape',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1371.jpg',
    sareeType: 'Sheer Organza Silk',
  },
  {
    id: 'g_6',
    title: 'Celebrity Crimson Red Silk Saree',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1376.jpg',
    sareeType: 'Heavy Zari Red Silk',
  },
  {
    id: 'g_7',
    title: 'Celebrity Studio Pallu Styling Drape',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1379.jpg',
    sareeType: 'Expert Studio Precision',
  },
  {
    id: 'g_8',
    title: 'Celebrity Peach Georgette Drape',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1509.jpg',
    sareeType: 'Georgette Silk Drape',
  },
  {
    id: 'g_9',
    title: 'Celebrity Nude Gold Sequined Drape',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e1528.jpg',
    sareeType: 'Sequined Tissue Georgette',
  },
  {
    id: 'g_10',
    title: 'Bridal Deep Magenta Pattu Saree',
    category: 'Bridal & Festive',
    image: '/gallery/img_e1547.jpg',
    sareeType: 'Heavy Kanchipuram Brocade',
  },
  {
    id: 'g_11',
    title: 'Studio Heat Setting & Pinning Process',
    category: 'Studio Showcase',
    image: '/gallery/img_e1661.jpg',
    sareeType: 'Zero-Damage Heat Setting',
  },
  {
    id: 'g_12',
    title: 'Pre-Pleated Emerald Green Silk',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e3999.jpg',
    sareeType: 'Kanjivaram Silk Pleats',
  },
  {
    id: 'g_13',
    title: 'Bridal Pearl Embellished Ivory Saree',
    category: 'Bridal & Festive',
    image: '/gallery/img_e4019.jpg',
    sareeType: 'Pearl Embellished Ivory Silk',
  },
  {
    id: 'g_14',
    title: 'Zero-Crease Hanger Box Fold',
    category: 'Studio Showcase',
    image: '/gallery/img_e4812.jpg',
    sareeType: 'Wardrobe Ready Hanger Fold',
  },
  {
    id: 'g_15',
    title: 'Pre-Pleated Teal Blue Soft Silk',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/img_e5383.jpg',
    sareeType: 'Soft Silk Pre-Pleat',
  },
  {
    id: 'g_16',
    title: 'Bridal Mauve Designer Saree',
    category: 'Bridal & Festive',
    image: '/gallery/img_e5560.jpg',
    sareeType: 'Bridal Designer Mauve Silk',
  },
  {
    id: 'g_17',
    title: 'Celebrity Draping Style Masterclass',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e8577.jpg',
    sareeType: 'Academy Draping Technique',
  },
  {
    id: 'g_18',
    title: 'Celebrity Sunset Temple Border Saree',
    category: 'Celebrity & Designer',
    image: '/gallery/img_e8655.jpg',
    sareeType: 'Heritage Temple Border Silk',
  },
  {
    id: 'g_19',
    title: 'Pre-Pleated Box Fold Delivery Pack',
    category: 'Pre-Pleated Drapes',
    image: '/gallery/jbkm2418.jpg',
    sareeType: 'Pre-Pleated Wardrobe Pack',
  },
  {
    id: 'g_20',
    title: 'Bridal Mustard Gold Festival Saree',
    category: 'Bridal & Festive',
    image: '/gallery/kzqq3563.jpg',
    sareeType: 'Traditional Festival Silk',
  },
  {
    id: 'g_21',
    title: 'Celebrity Copper Zari Shimmer Saree',
    category: 'Celebrity & Designer',
    image: '/gallery/pnra7250.jpg',
    sareeType: 'Copper Zari Shimmer Silk',
  },
  {
    id: 'g_22',
    title: 'Bridal Blush Pink Pre-Pleated Georgette',
    category: 'Bridal & Festive',
    image: '/gallery/qndd2515.jpg',
    sareeType: 'Bridal Georgette Pre-Pleat',
  },
  {
    id: 'g_23',
    title: 'Studio 5-Point Pleat Inspection Check',
    category: 'Studio Showcase',
    image: '/gallery/uhvn7069.jpg',
    sareeType: 'Quality Inspection',
  },
  {
    id: 'g_24',
    title: 'Celebrity Silver Zari Tissue Saree',
    category: 'Celebrity & Designer',
    image: '/gallery/ykoi7845.jpg',
    sareeType: 'Silver Zari Tissue Drape',
  },
];

interface GalleryPageProps {
  navigateTo: (page: PageView) => void;
  onBookService?: (serviceName: string) => void;
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
            Explore our portfolio of 24+ real pre-pleated saree transformations, celebrity draping styles, and studio craftsmanship.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-blush/20 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Celebrity & Designer', 'Bridal & Festive', 'Pre-Pleated Drapes', 'Studio Showcase'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
          Showing <span className="font-bold text-brand-plum">{filteredItems.length}</span> items
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
                alt={item.title}
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

            <div className="p-4 space-y-1.5 bg-white">
              <h3 className="font-serif font-bold text-sm text-neutral-dark group-hover:text-brand-plum transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[11px] text-brand-rose font-medium">
                {item.sareeType}
              </p>
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose block">
                  {currentItem.category} • {lightboxIndex! + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  {currentItem.title}
                </h3>
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
                alt={currentItem.title}
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
                <span className="text-xs text-neutral-300 block">Saree Variant</span>
                <span className="font-serif font-bold text-white text-sm">{currentItem.sareeType}</span>
              </div>

              <button
                onClick={() => {
                  closeLightbox();
                  if (onBookService) onBookService(currentItem.title);
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
