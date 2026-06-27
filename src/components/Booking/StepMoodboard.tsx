import React from 'react';
import { X, ArrowRight, Heart } from 'lucide-react';
import { useMoodboard } from '../../hooks/useMoodboard';
import { Button } from '../ui/Button';

interface StepMoodboardProps {
  onNext: () => void;
  onClose: () => void;
}

export const StepMoodboard: React.FC<StepMoodboardProps> = ({ onNext, onClose }) => {
  const { moodboard, removeFromMoodboard } = useMoodboard();

  const handleCloseToExplore = () => {
    onClose();
    // Smooth scroll to portfolio if they want to save images
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo('#portfolio', { offset: -80 });
    } else {
      document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full justify-between" id="booking-step-moodboard">
      <div className="overflow-y-auto pr-2 max-h-[55vh]">
        <h3 className="font-display text-2xl text-navy mb-2 font-medium">
          Step 1: Moodboard Style References
        </h3>
        <p className="text-sm text-navy/60 font-sans mb-8">
          The following reference items will be attached to your consultation blueprint to guide our architect panel.
        </p>

        {moodboard.length === 0 ? (
          <div className="text-center py-12 px-6 border border-dashed border-navy/10 bg-warm-grey">
            <Heart className="w-8 h-8 mx-auto text-orange-accent/40 mb-3 animate-pulse" />
            <p className="font-display text-lg text-navy font-medium mb-1">Your Moodboard is Empty</p>
            <p className="text-xs text-navy/50 font-sans max-w-sm mx-auto mb-6">
              Navigate to our Portfolio grid and tap the heart icons on designs that resonate with your target styling.
            </p>
            <Button variant="outline" size="sm" onClick={handleCloseToExplore}>
              Browse Portfolio
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" id="saved-moodboard-grid">
            {moodboard.map((item) => (
              <div
                key={item.id}
                className="relative bg-white border border-navy/5 p-2 aspect-[4/5] flex flex-col group overflow-hidden shadow-sm"
              >
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => removeFromMoodboard(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-orange-accent hover:bg-orange-accent/80 text-white rounded-full shadow transition-all duration-300"
                    aria-label="Remove item"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[9px] uppercase tracking-wider text-orange-accent font-semibold block">
                    {item.category}
                  </span>
                  <p className="text-[11px] font-sans text-navy/80 truncate font-medium">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-navy/10 pt-6 mt-6 flex justify-between items-center bg-white">
        <span className="text-xs text-navy/50 font-sans">
          {moodboard.length === 0 ? "You can also add styling later." : `${moodboard.length} styles selected`}
        </span>
        <Button variant="primary" size="md" onClick={onNext} className="w-full sm:w-auto">
          {moodboard.length === 0 ? "Continue Without References" : "Proceed to Project Details"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
