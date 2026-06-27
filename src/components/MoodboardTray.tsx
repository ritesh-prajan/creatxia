import React, { useEffect, useRef, useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { useMoodboard } from '../hooks/useMoodboard';
import { Button } from './ui/Button';

interface MoodboardTrayProps {
  onOpenBooking: () => void;
}

export const MoodboardTray: React.FC<MoodboardTrayProps> = ({ onOpenBooking }) => {
  const { moodboard, removeFromMoodboard } = useMoodboard();
  const trayRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(moodboard.length);
  const shouldAnimateInRef = useRef(false);
  const [visible, setVisible] = useState(moodboard.length > 0);

  useEffect(() => {
    const prev = prevLengthRef.current;
    const curr = moodboard.length;
    prevLengthRef.current = curr;

    if (curr > 0 && prev === 0) {
      shouldAnimateInRef.current = true;
      setVisible(true);
    } else if (curr === 0 && prev > 0) {
      const tray = trayRef.current;
      if (tray) {
        gsap.to(tray, {
          y: '100%',
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => setVisible(false),
        });
      } else {
        setVisible(false);
      }
    }
  }, [moodboard.length]);

  useEffect(() => {
    if (!visible || !shouldAnimateInRef.current) return;

    shouldAnimateInRef.current = false;
    const tray = trayRef.current;
    if (!tray) return;

    gsap.fromTo(
      tray,
      { y: '100%' },
      { y: '0%', duration: 0.5, ease: 'power3.out' }
    );
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={trayRef}
      className="fixed bottom-0 left-0 w-full bg-navy text-white z-30 shadow-2xl border-t border-white/10 py-5 px-6"
      id="moodboard-tray-container"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side Info */}
        <div className="flex items-center gap-4">
          <div className="bg-orange-accent text-white font-sans text-sm font-bold w-10 h-10 flex items-center justify-center rounded-none shadow">
            {moodboard.length}
          </div>
          <div>
            <h4 className="font-display text-lg text-white font-medium">Your Moodboard</h4>
            <p className="text-xs text-white/60 font-sans mt-0.5">
              These reference styles will be shared with our design consultants.
            </p>
          </div>
        </div>

        {/* Saved Thumbnails Row */}
        <div className="flex items-center gap-3 overflow-x-auto max-w-full md:max-w-xl py-1 no-scrollbar">
          {moodboard.map((item) => (
            <div key={item.id} className="relative w-14 h-14 bg-white/5 flex-shrink-0 group">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => removeFromMoodboard(item.id)}
                className="absolute -top-1.5 -right-1.5 bg-orange-accent hover:bg-orange-accent/80 text-white p-1 rounded-full shadow-lg transition-transform hover:scale-110"
                aria-label="Remove item"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="md"
          className="w-full md:w-auto"
          onClick={onOpenBooking}
          id="moodboard-tray-cta"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Proceed to Booking
        </Button>
      </div>
    </div>
  );
};
