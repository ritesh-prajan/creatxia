import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Lucide from 'lucide-react';
import { PageView } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import StickyBookBar from './components/StickyBookBar';
import ErrorBoundary from './components/ErrorBoundary';
import SilkShimmer from './components/SilkShimmer';
import SkeletonPage from './components/SkeletonLoader';

// Page components
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ClassesPage from './pages/ClassesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import BookPage from './pages/BookPage';
import BookClassPage from './pages/BookClassPage';
import ReviewsPage from './pages/ReviewsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import AboutDeveloperPage from './pages/AboutDeveloperPage';

const pageNames: Record<PageView, string> = {
  home: 'Home',
  services: 'Saree Pleating Services',
  classes: 'Draping Academy Classes',
  'how-it-works': 'How It Works Guide',
  book: 'Saree Pleating Booking Form',
  'book-class': 'Academy Registration Form',
  reviews: 'Client Reviews',
  gallery: 'Client Draping Gallery',
  contact: 'Contact Us & Find Us Location',
  faq: 'Frequently Asked Questions',
  'about-developer': 'About Developer',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [activeFormService, setActiveFormService] = useState<string>('');
  const [activeClassTier, setActiveClassTier] = useState<string>('');
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  
  // Transition state to avoid jarring instant page swaps
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  const [displayPage, setDisplayPage] = useState<PageView>('home');
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Trigger a subtle animated page-load delay to display high-fidelity modern skeleton loaders
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [displayPage]);

  // Suffixed hashtag routing detection for browser navigation consistency
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (['home', 'services', 'classes', 'how-it-works', 'reviews', 'gallery', 'book', 'book-class', 'contact', 'faq', 'about-developer'].includes(hash)) {
        setCurrentPage(hash);
        setDisplayPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic page titles for absolute elite SEO feedback
  useEffect(() => {
    let subtitle = 'Saree Pleating & Academy';
    switch (currentPage) {
      case 'home':
        subtitle = 'Effortless Saree Pre-Pleating';
        break;
      case 'services':
        subtitle = 'Professional Box, Hanger & Bridal Pleating Services';
        break;
      case 'classes':
        subtitle = 'Draping Academy Classes & Seminars';
        break;
      case 'how-it-works':
        subtitle = 'Instruction Guides & Operations';
        break;
      case 'book':
        subtitle = 'Place Chennai Pleating Booking';
        break;
      case 'book-class':
        subtitle = 'Register for Academy Styling Class';
        break;
      case 'reviews':
        subtitle = '100% Zero-Damage Client Reviews';
        break;
      case 'gallery':
        subtitle = 'Real Client Draping & Studio Photo Gallery';
        break;
      case 'contact':
        subtitle = 'Studio Map Location, Hours & Address';
        break;
      case 'faq':
        subtitle = 'Detailed Knowledge Base FAQs';
        break;
      case 'about-developer':
        subtitle = 'About Developer — Ritesh Prajan';
        break;
    }
    document.title = `Tuck & Pin — ${subtitle}`;
  }, [currentPage]);

  const navigateTo = (page: PageView) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setIsPageLoading(true); // Trigger skeleton loaders immediately on navigation
    setIsShimmering(true);
    
    // Smooth transition timeout to allow fine visual fade and loading bar progress
    setTimeout(() => {
      window.location.hash = page;
      setCurrentPage(page);
      setDisplayPage(page);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 175);

    setTimeout(() => {
      setIsShimmering(false);
    }, 420);
  };

  const handleBookService = (serviceId: string) => {
    setActiveFormService(serviceId);
    navigateTo('book');
  };

  const handleEnquireClass = (classTierName: string) => {
    setActiveClassTier(classTierName);
    navigateTo('book-class');
  };

  return (
    <div className="min-h-screen bg-[#FDFBFC] text-neutral-dark flex flex-col justify-between relative w-full overflow-x-hidden">
      {/* Visually hidden screen reader status for page navigation */}
      <div className="sr-only" aria-live="polite" role="status">
        Navigated to {pageNames[currentPage] || currentPage} page
      </div>

      {/* Silk shimmer fires on every page navigation */}
      <SilkShimmer isActive={isShimmering} />

      {/* Dynamic top micro progress loading bar */}
      <div 
        className={`fixed top-0 left-0 right-0 h-1 bg-brand-rose z-[9999] transition-all duration-300 pointer-events-none ${
          isTransitioning ? 'w-3/4 opacity-100 animate-pulse' : 'w-full opacity-0'
        }`}
      />

      {/* Dynamic Nav Header */}
      <Navbar currentPage={currentPage} setCurrentPage={navigateTo} />

      {/* Global Floating Actions */}
      <FloatingWhatsApp />
      <StickyBookBar currentPage={currentPage} navigateTo={navigateTo} />

      {/* Core Main View Engine wrapped inside an ErrorBoundary */}
      <main className="flex-1 pb-24 md:pb-12">
        <ErrorBoundary key={currentPage} fallbackTitle={`An error occurred in the ${currentPage} view`}>
          {isPageLoading ? (
            <SkeletonPage page={displayPage} />
          ) : (
            <>
              {displayPage === 'home' && (
                <HomePage navigateTo={navigateTo} />
              )}
              {displayPage === 'services' && (
                <ServicesPage navigateTo={navigateTo} onBookService={handleBookService} />
              )}
              {displayPage === 'classes' && (
                <ClassesPage onEnquireClass={handleEnquireClass} />
              )}
              {displayPage === 'how-it-works' && (
                <HowItWorksPage />
              )}
              {displayPage === 'book' && (
                <BookPage
                  activeFormService={activeFormService}
                  setActiveFormService={setActiveFormService}
                />
              )}
              {displayPage === 'book-class' && (
                <BookClassPage
                  activeClassTier={activeClassTier}
                  setActiveClassTier={setActiveClassTier}
                />
              )}
              {displayPage === 'reviews' && (
                <ReviewsPage />
              )}
              {displayPage === 'gallery' && (
                <GalleryPage navigateTo={navigateTo} onBookService={handleBookService} />
              )}
              {displayPage === 'contact' && (
                <ContactPage />
              )}
              {displayPage === 'faq' && (
                <FAQPage />
              )}
              {displayPage === 'about-developer' && (
                <AboutDeveloperPage />
              )}
            </>
          )}
        </ErrorBoundary>
      </main>

      {/* Global Footer element */}
      <Footer setCurrentPage={navigateTo} onOpenTerms={() => setIsTermsOpen(true)} />

      {/* Terms & Conditions Modal */}
      {isTermsOpen && createPortal(
        <div 
          onClick={() => setIsTermsOpen(false)}
          className="fixed inset-0 bg-[#FAF7F9]/90 z-[10005] flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-brand-blush/25 cursor-default font-sans text-left"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#F2D6E4]/40 bg-neutral-warm/5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-plum">
                    Terms & Conditions
                  </h3>
                  <p className="text-[10px] text-neutral-mid font-medium uppercase tracking-wider mt-1">
                    Last Updated: July 2026
                  </p>
                </div>
                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="bg-brand-plum/10 hover:bg-brand-plum/20 text-brand-plum rounded-full p-2 cursor-pointer transition-colors"
                >
                  <Lucide.X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Terms Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-dark leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-brand-plum uppercase tracking-wide">
                  1. Service Booking & Saree Draping
                </h4>
                <p>
                  Tuck & Pin provides custom pre-pleating, box folding, hanger folding, and draping styling classes. By booking our services, you agree to provide accurate measurements and drop off your sarees at our designated Chennai studio location within the selected timeframe.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-brand-plum uppercase tracking-wide">
                  2. Handling & Styling Risks
                </h4>
                <p>
                  Saree pre-pleating and box folding involve high-precision steaming, mechanical pressing, and the placement of security safety pins. Delicate silk, handloom zari borders, vintage heirlooms, georgette, and cotton fabrics carry inherent risks of thread-thinning, color transfers, or fiber snags.
                </p>
                <div className="bg-brand-blush/10 border-l-2 border-brand-rose p-3 text-neutral-dark font-medium italic rounded-r-md">
                  <strong>Important:</strong> All pleating, pressing, folding, and styling services are performed entirely at the client's own risk. Tuck & Pin carries zero liability for damage to materials during the styling, steaming, or pinning process.
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-brand-plum uppercase tracking-wide">
                  3. Transit & Third-Party Delivery Risks
                </h4>
                <p>
                  We facilitate local door-step pickups and deliveries via third-party courier services (e.g. Dunzo, Porter, ST Courier, Professional Couriers, etc.) for customer convenience.
                </p>
                <div className="bg-brand-blush/10 border-l-2 border-brand-rose p-3 text-neutral-dark font-medium italic rounded-r-md">
                  <strong>Important:</strong> Any loss, theft, delay, weather damage, moisture exposure, or damage occurring to your sarees during transit is strictly at your own risk. Tuck & Pin is not liable for the actions, delays, or service failures of third-party shipping couriers.
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-brand-plum uppercase tracking-wide">
                  4. Safety Pin Snags & Wearer Care
                </h4>
                <p>
                  All pleat sets are pinned with high-quality steel or brass pins. Care must be taken when unpacking, unwrapping, and draping your saree. We are not responsible for any runs, fabric holes, or personal injuries caused by pin placements during wear.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-brand-plum uppercase tracking-wide">
                  5. Payment & Cancellations
                </h4>
                <p>
                  Payments are accepted via UPI transfer or Cash on Delivery (COD). Cancellations must be made at least 24 hours prior to your scheduled drop-off or pickup. No refunds will be provided for completed pleating/folding services or styling classes.
                </p>
              </div>
            </div>

            {/* Footer button */}
            <div className="p-4 border-t border-[#F2D6E4]/40 bg-neutral-warm/5 flex justify-end">
              <button
                onClick={() => setIsTermsOpen(false)}
                className="bg-brand-plum hover:bg-[#521337] text-white font-medium text-xs py-2.5 px-6 rounded-full cursor-pointer shadow-md select-none transition-all active:scale-[0.98]"
              >
                I Understand & Accept
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
