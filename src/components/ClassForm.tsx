/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, User, Calendar, BookOpen, Layers, Send, HelpCircle, GraduationCap } from 'lucide-react';
import { ClassFormData } from '../types';
import { CONFIG } from '../config';

interface ClassFormProps {
  initialTierName?: string;
  onSuccess?: () => void;
}

export default function ClassForm({ initialTierName = '', onSuccess }: ClassFormProps) {
  // Translate initial tier selection
  let defaultTier = 'Hands-On Practice (₹1,499 offer)';
  if (initialTierName.toLowerCase().includes('recorded')) {
    defaultTier = 'Recorded Sessions (₹600)';
  } else if (initialTierName.toLowerCase().includes('live')) {
    defaultTier = 'Live Sessions (₹999 offer)';
  }

  const [formData, setFormData] = useState<ClassFormData>({
    fullName: '',
    phone: '',
    email: '',
    classTier: defaultTier,
    preferredDate: '',
    mode: 'In-Person',
    questions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(null);
  };

  const handleModeChange = (mode: 'Online' | 'In-Person') => {
    setFormData((prev) => ({
      ...prev,
      mode,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.email) {
      setErrorMessage('Please fill out all required fields: name, phone, and email!');
      const el = document.getElementById('class-form-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const isRecorded = formData.classTier.includes('Recorded');
    const isLive = formData.classTier.includes('Live');

    const formattedDate = isRecorded ? 'N/A (Instant Access)' : (formData.preferredDate || 'To be scheduled');
    const formattedMode = isRecorded ? 'N/A' : (isLive ? formData.mode : 'In-Person (At location)');

    // Construct the formatted WhatsApp output string precisely matching instructions
    const message = `*Class Enquiry — Tuck & Pin*\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Class: ${formData.classTier}\n` +
      `Date: ${formattedDate}\n` +
      `Mode: ${formattedMode}\n` +
      `Questions: ${formData.questions || 'N/A'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessUrl(whatsappUrl);
      if (onSuccess) {
        onSuccess();
      }
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  const isRecordedSelected = formData.classTier.includes('Recorded');
  const isLiveSelected = formData.classTier.includes('Live');

  if (successUrl) {
    return (
      <div className="bg-white rounded-[32px] border border-[#F2D6E4] p-8 shadow-md text-center space-y-6 my-4 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-neutral-dark">
            Academy Request Formed!
          </h3>
          <p className="font-sans text-xs text-neutral-mid leading-relaxed max-w-xs mx-auto">
            Your academy slot reservation parameters have been successfully structured. Tap the button below to instantly transmit them on WhatsApp.
          </p>
        </div>

        <div className="bg-neutral-warm p-4 rounded-2xl border border-brand-blush/20 text-left space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-rose">Summary Details</span>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            <div>
              <span className="text-neutral-mid block text-[10px] uppercase">Student Name</span>
              <span className="font-bold text-neutral-dark">{formData.fullName}</span>
            </div>
            <div>
              <span className="text-neutral-mid block text-[10px] uppercase">Academy Class</span>
              <span className="font-bold text-brand-plum block leading-tight">{formData.classTier}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <a
            href={successUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-4 px-6 rounded-full font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.008.01C5.397.01.06 5.348.06 11.953c0 2.097.546 4.142 1.587 5.946L.057 24l6.163-1.687c1.786 1.041 3.834 1.587 5.946 1.587 6.627 0 11.997-5.34 11.997-11.953s-5.373-11.996-11.953-11.996zm6.59 15.132c-.24.56-1.15 1.07-1.61 1.14-.41.06-.93.08-1.51-.1-.34-.1-.77-.25-1.34-.5-2.41-1.04-3.98-3.46-4.1-3.62-.14-.18-1-1.38-1-2.5s.62-1.76.84-2c.22-.24.48-.3.64-.3h.46c.14 0 .34-.06.54.42l.74 1.78c.06.12.1.26.02.42s-.49.98-.76 1.41c.49.94 1.49 1.53 3.55 3.1.24.12.38.1.52-.06.14-.16.54-.69.76-.93.22-.24.38-.2.54-.12.22.08 1.39.65 1.63.77.24.12.18.21.14.29z" />
            </svg>
            <span>Open WhatsApp Chat</span>
          </a>

          <button
            type="button"
            onClick={() => setSuccessUrl(null)}
            className="text-xs text-neutral-mid underline cursor-pointer hover:text-brand-plum block mx-auto"
          >
            Edit Enquiry Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="class-form-header" className="space-y-6 pb-4 relative animate-scaleUp">
      
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed animate-fadeIn">
          <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <span className="font-bold">Missing Information</span>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Contact information card */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-4 border-b border-brand-blush/15 sm:border-b-0 pb-6 sm:pb-0">
        <h3 className="font-serif text-lg font-bold text-brand-plum border-b border-brand-blush/20 pb-2 mb-3">
          1. Student Details
        </h3>

        <div>
          <label htmlFor="studentFullName" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
            Full Name <span className="text-brand-rose">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
            <input
              id="studentFullName"
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Anjali Nair"
              className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="studentPhone" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
              WhatsApp Phone <span className="text-brand-rose">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
              <input
                id="studentPhone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 9876543210"
                className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="studentEmail" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
              Email Address <span className="text-brand-rose">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
              <input
                id="studentEmail"
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. anjali.nair@gmail.com"
                className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white"
              />
            </div>
            <p className="text-[9px] text-[#777] mt-1.5 ml-1">
              Required to deliver link resources and recorded class materials.
            </p>
          </div>
        </div>
      </div>

      {/* Course preference card */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-5 border-b border-brand-blush/15 sm:border-b-0 pb-6 sm:pb-0">
        <h3 className="font-serif text-lg font-bold text-brand-plum border-b border-brand-blush/20 pb-2 mb-3">
          2. Class Parameters
        </h3>

        <div>
          <label htmlFor="studentClassTier" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
            Class Training Tier <span className="text-brand-rose">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400 pointer-events-none" />
            <select
              id="studentClassTier"
              name="classTier"
              value={formData.classTier}
              onChange={handleInputChange}
              className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark focus:bg-white appearance-none cursor-pointer"
            >
              <option value="Recorded Sessions (₹600)">Tier 1: Pre-Recorded Pack (₹600)</option>
              <option value="Live Sessions (₹999 offer)">Tier 2: Live Interactive Workshop (₹999 Launch Offer)</option>
              <option value="Hands-On Practice (₹1,499 offer)">Tier 3: In-person Hands-On Training (₹1,499 Launch Offer)</option>
            </select>
          </div>
        </div>

        {/* Dynamic fields based on tier */}

        {!isRecordedSelected && (
          <div className="grid grid-cols-1 gap-4 animate-scaleUp">
            <div>
              <label htmlFor="studentPreferredDate" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
                Preferred Date <span className="text-brand-rose">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400 pointer-events-none" />
                <input
                  id="studentPreferredDate"
                  type="date"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark focus:bg-white"
                />
              </div>
            </div>

            {isLiveSelected && (
              <div role="radiogroup" aria-labelledby="workshopModeLabel" className="pt-1 animate-scaleUp">
                <span id="workshopModeLabel" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2">
                  Preferred Workshop Mode <span className="text-brand-rose">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'Online', desc: 'Interactive Zoom Video' },
                    { id: 'In-Person', desc: 'At Chennai Saree Studio' },
                  ].map((elem) => (
                    <button
                      key={elem.id}
                      type="button"
                      role="radio"
                      aria-checked={formData.mode === elem.id}
                      onClick={() => handleModeChange(elem.id as any)}
                      className={`py-3 px-3 rounded-xl text-center border font-sans select-none flex flex-col items-center justify-center cursor-pointer transition-all ${
                        formData.mode === elem.id
                          ? 'border-brand-plum bg-brand-blush/20 text-brand-plum'
                          : 'border-brand-blush/35 bg-neutral-warm/20 text-neutral-mid hover:bg-brand-blush/10'
                      }`}
                    >
                      <span className="text-xs font-bold block">{elem.id}</span>
                      <span className="text-[9px] text-[#777] mt-0.5">{elem.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isRecordedSelected && (
          <div className="p-4 bg-brand-blush/25 rounded-2xl border border-brand-blush/40 flex items-start gap-3 text-xs leading-relaxed text-brand-plum animate-scaleUp">
            <BookOpen className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-serif font-bold text-sm block">Instant Digital Access</span>
              <p className="text-[11px] text-neutral-mid mt-0.5">
                Pre-recorded sessions are sent immediately to your email inbox once payment is processed via UPI on WhatsApp. Watch and replay anytime!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Special questions card */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-4 pb-2 sm:pb-0">
        <h3 className="font-serif text-lg font-bold text-brand-plum border-b border-brand-blush/20 pb-2 mb-3">
          3. Saree Types or Custom Questions
        </h3>

        <div>
          <label htmlFor="studentQuestions" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
            Ask Us Any Specific Questions
          </label>
          <textarea
            id="studentQuestions"
            name="questions"
            rows={3}
            value={formData.questions}
            onChange={handleInputChange}
            placeholder="e.g. Will you teach how to drape a heavy Jamdani saree? Can I bring my mother along?"
            className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 px-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white resize-none"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-plum active:scale-[0.98] text-white py-4 px-6 rounded-full font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#521337] flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Formatting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Enquire on WhatsApp</span>
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
