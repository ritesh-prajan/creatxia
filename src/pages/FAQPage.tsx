import React, { useState, useMemo } from 'react';
import { SectionTitle } from '../components/UI';
import { detailedFaqs, FaqSection } from '../data';
import { Search, ChevronDown, HelpCircle, Package, Ruler, Scissors, Truck, CreditCard, GraduationCap, Heart, AlertCircle } from 'lucide-react';
import { CONFIG } from '../config';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Compute total questions dynamically from data source
  const totalQuestionsCount = useMemo(() => {
    return detailedFaqs.reduce((acc, section) => acc + (section.faqs?.length || 0), 0);
  }, []);

  // Helper to map section icon string to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'package':
        return <Package className="h-4 w-4" />;
      case 'ruler':
        return <Ruler className="h-4 w-4" />;
      case 'scissors':
        return <Scissors className="h-4 w-4" />;
      case 'truck':
        return <Truck className="h-4 w-4" />;
      case 'credit-card':
        return <CreditCard className="h-4 w-4" />;
      case 'graduation-cap':
        return <GraduationCap className="h-4 w-4" />;
      case 'heart':
        return <Heart className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter FAQs based on active tab and search query
  const filteredFaqs = useMemo(() => {
    return detailedFaqs
      .map((section) => {
        // If an active category filter is set, verify match (e.g. comparing titles)
        const categoryMatch = activeCategory === 'all' || section.title.includes(activeCategory);
        if (!categoryMatch) return null;

        const matchingFaqs = section.faqs.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchingFaqs.length === 0) return null;

        return {
          ...section,
          faqs: matchingFaqs,
        };
      })
      .filter((section): section is FaqSection => section !== null);
  }, [searchQuery, activeCategory]);

  // Clean title helpers (removes emojis)
  const getCleanTitle = (fullTitle: string) => {
    return fullTitle.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-5 sm:px-6 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3 py-1.5 rounded-full uppercase inline-block font-sans">
          Client Knowledge Base
        </span>
        <SectionTitle
          title="Tuck & Pin Helper & FAQs"
          subtitle="Everything you need to know about our saree pleating methods, measurement requirements, delivery details, courses, and studio terms."
        />
      </div>

      {/* Real-time Search Input Field */}
      <div className="max-w-xl mx-auto relative group font-sans">
        <label htmlFor="faqSearchInput" className="sr-only">
          Search through frequently asked questions
        </label>
        <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-neutral-400 group-focus-within:text-brand-plum transition-colors pointer-events-none" />
        <input
          id="faqSearchInput"
          type="text"
          placeholder={`Search through all ${totalQuestionsCount} questions (e.g., georgette, Dunzo, sizes)...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[#F2D6E4] py-3 pl-11 pr-4 rounded-2xl text-xs sm:text-sm shadow-xs focus:outline-none focus:border-brand-plum focus:ring-1 focus:ring-brand-plum/10 transition-all font-medium text-neutral-dark placeholder-neutral-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-3 text-[10px] font-bold tracking-wider text-brand-rose bg-brand-blush/35 px-2 py-1 rounded-md uppercase"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Horizontal Navigation Scroll Tabs */}
      <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar border-b border-brand-blush/20 scroll-smooth font-sans">
        <button
          onClick={() => setActiveCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
            activeCategory === 'all'
              ? 'bg-brand-plum text-white border-brand-plum shadow-xs'
              : 'bg-white text-neutral-mid border-brand-blush/30 hover:text-brand-plum hover:border-brand-plum/40'
          }`}
        >
          All Questions
        </button>
        {detailedFaqs.map((sec) => {
          const categoryName = getCleanTitle(sec.title);
          const isSelected = activeCategory === categoryName;
          return (
            <button
              key={sec.title}
              onClick={() => setActiveCategory(categoryName)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-plum text-white border-brand-plum shadow-xs'
                  : 'bg-white text-neutral-mid border-brand-blush/30 hover:text-brand-plum hover:border-brand-plum/40'
              }`}
            >
              {getIcon(sec.icon)}
              <span>{categoryName}</span>
            </button>
          );
        })}
      </div>

      {/* Main FAQs Accordion Area */}
      <div className="space-y-12 max-w-4xl mx-auto font-sans">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((section, secIdx) => (
            <div key={section.title} className="space-y-4">
              {/* Category Sub-Header */}
              <div className="flex items-center gap-2.5 border-b border-brand-blush/20 pb-2 mb-4">
                <span className="p-1.5 bg-brand-blush/20 text-brand-plum rounded-lg shrink-0">
                  {getIcon(section.icon)}
                </span>
                <h3 className="font-serif text-lg font-bold text-brand-plum tracking-wide">
                  {section.title}
                </h3>
                <span className="ml-auto text-[10px] font-bold text-brand-rose font-mono bg-brand-blush/10 px-2 py-0.5 rounded">
                  {section.faqs.length} articles
                </span>
              </div>

              {/* Accordion Questions Stack */}
              <div className="space-y-3">
                {section.faqs.map((faq, faqIdx) => {
                  const itemKey = `${secIdx}-${faqIdx}`;
                  const isExpanded = !!expandedItems[itemKey];
                  return (
                    <div
                      key={faq.question}
                      className="bg-white border border-brand-blush/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-3xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleExpand(itemKey)}
                        className="w-full py-4.5 px-5 flex items-start justify-between text-left gap-4 cursor-pointer focus:outline-none transition-colors hover:bg-neutral-50/50"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-neutral-dark leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4.5 w-4.5 text-neutral-450 transition-transform duration-300 shrink-0 mt-0.5 ${
                            isExpanded ? 'rotate-180 text-brand-plum' : ''
                          }`}
                        />
                      </button>

                      {/* Smooth expandable details div container */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-96 opacity-100 border-t border-brand-blush/10 bg-brand-blush/5' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-5 text-neutral-mid text-xs sm:text-[13px] leading-relaxed select-text">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          /* Empty Search Fallback */
          <div className="bg-brand-blush/15 border border-brand-blush/25 rounded-3xl p-10 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="h-10 w-10 text-brand-rose mx-auto" />
            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-brand-plum">No Matching Answers Found</h4>
              <p className="text-xs text-neutral-mid leading-relaxed">
                We couldn&apos;t find any results for &quot;<span className="font-semibold text-brand-rose">{searchQuery}</span>&quot;. Try refining your search query or choosing another tab above.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs font-bold text-brand-plum bg-white border border-brand-blush/30 px-4 py-2 rounded-full hover:bg-neutral-50 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Elegant CTA Block at the bottom of the section */}
      <div className="bg-brand-plum text-white rounded-3xl p-6 sm:p-8 text-center max-w-2xl mx-auto space-y-4 font-sans">
        <h4 className="font-serif text-lg font-bold">Still got specific questions?</h4>
        <p className="text-xs text-white/80 leading-relaxed max-w-lg mx-auto">
          Contact our Chennai styling academy support staff directly on WhatsApp. We typically respond within 15 minutes of receiving your messages.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hi%20Tuck%20and%20Pin%2C%20I%20checked%20the%20FAQs%20but%20had%20another%20question%20about...`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-sans font-bold text-xs py-3 px-6 rounded-full shadow-md transition-all cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.008.01C5.397.01.06 5.348.06 11.953c0 2.097.546 4.142 1.587 5.946L.057 24l6.163-1.687c1.786 1.041 3.834 1.587 5.946 1.587 6.627 0 11.997-5.34 11.997-11.953s-5.373-11.996-11.953-11.996zm6.59 15.132c-.24.56-1.15 1.07-1.61 1.14-.41.06-.93.08-1.51-.1-.34-.1-.77-.25-1.34-.5-2.41-1.04-3.98-3.46-4.1-3.62-.14-.18-1-1.38-1-2.5s.62-1.76.84-2c.22-.24.48-.3.64-.3h.46c.14 0 .34-.06.54.42l.74 1.78c.06.12.1.26.02.42s-.49.98-.76 1.41c.49.94 1.49 1.53 3.55 3.1.24.12.38.1.52-.06.14-.16.54-.69.76-.93.22-.24.38-.2.54-.12.22.08 1.39.65 1.63.77.24.12.18.21.14.29z" />
            </svg>
            <span>Ask Us On WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
