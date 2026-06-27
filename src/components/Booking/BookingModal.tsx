import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { StepMoodboard } from './StepMoodboard';
import { StepDetails } from './StepDetails';
import { StepConnect } from './StepConnect';
import { BookingForm } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    city: '',
    projectType: '',
    approxSize: '',
    description: ''
  });

  // Reset modal steps on open/close changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      id="booking-modal-overlay"
    >
      {/* Semi-transparent dark overlay */}
      <div
        className="absolute inset-0 bg-navy/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div
        className="relative bg-white w-full max-w-3xl h-[90vh] md:h-auto md:max-h-[85vh] flex flex-col p-6 md:p-10 shadow-2xl overflow-hidden animate-zoom-in"
        id="booking-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-navy/40 hover:text-navy transition-colors duration-300 z-10 focus:outline-none"
          id="booking-modal-close-btn"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stepper Header */}
        <div className="flex justify-between items-center max-w-md mx-auto w-full mb-10 border-b border-navy/5 pb-6">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center font-sans font-semibold text-xs transition-colors duration-300 ${
                currentStep >= 1 ? 'bg-orange-accent text-white' : 'bg-warm-grey text-navy/40'
              }`}
            >
              1
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-navy/60 font-sans mt-2">
              Reference
            </span>
          </div>

          <div className="flex-1 h-[2px] bg-warm-grey mx-2 mb-5">
            <div
              className="h-full bg-orange-accent transition-all duration-300"
              style={{ width: currentStep > 1 ? '100%' : '0%' }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center font-sans font-semibold text-xs transition-colors duration-300 ${
                currentStep >= 2 ? 'bg-orange-accent text-white' : 'bg-warm-grey text-navy/40'
              }`}
            >
              2
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-navy/60 font-sans mt-2">
              Details
            </span>
          </div>

          <div className="flex-1 h-[2px] bg-warm-grey mx-2 mb-5">
            <div
              className="h-full bg-orange-accent transition-all duration-300"
              style={{ width: currentStep > 2 ? '100%' : '0%' }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center font-sans font-semibold text-xs transition-colors duration-300 ${
                currentStep >= 3 ? 'bg-orange-accent text-white' : 'bg-warm-grey text-navy/40'
              }`}
            >
              3
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-navy/60 font-sans mt-2">
              Connect
            </span>
          </div>
        </div>

        {/* Dynamic Step Component Content */}
        <div className="flex-1 overflow-hidden" id="booking-modal-step-container">
          {currentStep === 1 && (
            <StepMoodboard
              onNext={() => setCurrentStep(2)}
              onClose={onClose}
            />
          )}
          {currentStep === 2 && (
            <StepDetails
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <StepConnect
              formData={formData}
              onBack={() => setCurrentStep(2)}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};
