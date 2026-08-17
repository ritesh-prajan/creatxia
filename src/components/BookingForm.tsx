/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, HelpCircle, ChevronRight, User, Phone, Layers, Info, CheckCircle2, X } from 'lucide-react';
import { BookingFormData } from '../types';
import { CONFIG } from '../config';

interface BookingFormProps {
  initialServiceId?: string;
  selectedPhotoUrl?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ initialServiceId = '', selectedPhotoUrl = '', onSuccess }: BookingFormProps) {
  // Let's resolve the initial service based on initialServiceId
  let defaultService = 'Box Fold';
  if (initialServiceId.toLowerCase().includes('hanger')) {
    defaultService = 'Hanger Fold';
  } else if (initialServiceId.toLowerCase().includes('bridal')) {
    defaultService = 'Bridal Draping';
  } else if (initialServiceId.toLowerCase().includes('celebrity') || initialServiceId.toLowerCase().includes('designer')) {
    defaultService = 'Celebrity Draping';
  }

  const fullPhotoUrl = selectedPhotoUrl
    ? (selectedPhotoUrl.startsWith('http')
        ? selectedPhotoUrl
        : `${window.location.origin}${selectedPhotoUrl}`)
    : '';

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    serviceType: defaultService,
    sareeType: '',
    numberOfSarees: 1,
    expectedDeliveryDate: '',
    isUrgent: false,
    pickupMethod: 'Drop at Location',
    hipMeasurement: '',
    useCm: false, // default to inches
    shoulderToCalf: '',
    leftShoulderToSpine: '',
    spineToRightThigh: '',
    leftShoulderToBust: '',
    fullBustCoverage: '',
    additionalNotes: initialServiceId ? `I'd like it to be like "${initialServiceId}"` : '',
  });

  React.useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({
        ...prev,
        additionalNotes: `I'd like it to be like "${initialServiceId}"`,
      }));
    }
  }, [initialServiceId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeInstruction, setActiveInstruction] = useState<string | null>('hip');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const measurementGuides = {
    hip: {
      title: 'Hip Measurement',
      desc: 'Measure around the fullest part of your hips/buttocks where the saree skirt is normally pinned or secured.',
    },
    pallu: {
      title: 'Shoulder to Mid-Calf',
      desc: 'Measure from your left shoulder peak down to your mid-calf or ankle. This determines your Pallu drape length.',
    },
    lsSpine: {
      title: 'Left Shoulder to Mid-Spine',
      desc: 'Measure from your left shoulder peak curving down to the mid-point of your upper spine.',
    },
    spineThigh: {
      title: 'Spine to Mid-Right Thigh',
      desc: 'Measure starting from your upper mid-spine wrapping down around to your mid-right thigh.',
    },
    lsBust: {
      title: 'Left Shoulder to Mid-Bust',
      desc: 'Measure from the top left shoulder peak down to the midpoint of your bust line.',
    },
    bust: {
      title: 'Full Bust Coverage',
      desc: 'Measure around the chest at the fullest part of the bust for accurate chest wrap pinning.',
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    setErrorMessage(null);
  };

  const handleToggleUrgent = () => {
    setFormData((prev) => ({
      ...prev,
      isUrgent: !prev.isUrgent,
    }));
  };

  const handleToggleUnit = () => {
    setFormData((prev) => ({
      ...prev,
      useCm: !prev.useCm,
    }));
  };

  const handleRadioChange = (method: 'Drop at Location' | 'Courier' | 'Dunzo') => {
    setFormData((prev) => ({
      ...prev,
      pickupMethod: method,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.sareeType || !formData.expectedDeliveryDate) {
      setErrorMessage('Please fill out all required fields marked with *');
      // Scroll smoothly to top of form
      const el = document.getElementById('booking-form-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const unit = formData.useCm ? 'cm' : 'inches';
    const urgentText = formData.isUrgent ? 'Yes (+₹150)' : 'No';

    const styleReferenceLine = initialServiceId ? `Selected Style/Design: ${initialServiceId}\n` : '';
    const photoReferenceLine = fullPhotoUrl ? `Selected Photo Link: ${fullPhotoUrl}\n` : '';

    // Construct the WhatsApp message payload precisely format matching instructions
    const message = `*New Booking — Tuck & Pin*\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Service: ${formData.serviceType}\n` +
      styleReferenceLine +
      photoReferenceLine +
      `Saree Type: ${formData.sareeType}\n` +
      `No. of Sarees: ${formData.numberOfSarees}\n` +
      `Expected Delivery: ${formData.expectedDeliveryDate}\n` +
      `Urgent: ${urgentText}\n` +
      `Pickup: ${formData.pickupMethod}\n\n` +
      `*Measurements:*\n` +
      `Hip: ${formData.hipMeasurement || 'N/A'} ${unit}\n` +
      `Pallu (Shoulder to Calf): ${formData.shoulderToCalf || 'N/A'} ${unit}\n` +
      `L. Shoulder to Spine: ${formData.leftShoulderToSpine || 'N/A'} ${unit}\n` +
      `Spine to R. Thigh: ${formData.spineToRightThigh || 'N/A'} ${unit}\n` +
      `L. Shoulder to Bust: ${formData.leftShoulderToBust || 'N/A'} ${unit}\n` +
      `Full Bust: ${formData.fullBustCoverage || 'N/A'} ${unit}\n\n` +
      `Notes: ${formData.additionalNotes || 'N/A'}`;

    // URL Encode the WhatsApp text parameter
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Simulate load and then redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessUrl(whatsappUrl);
      if (onSuccess) {
        onSuccess();
      }
      // Attempt redirect but also provide the beautiful tactile button fallback
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  if (successUrl) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-emerald-200 text-center space-y-6 shadow-sm animate-fadeIn font-sans text-left">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2 text-center">
          <h3 className="font-serif text-2xl font-bold text-neutral-dark">
            Booking Form Ready!
          </h3>
          <p className="text-xs text-neutral-mid leading-relaxed max-w-md mx-auto">
            Click the button below to send your details directly to our studio team on WhatsApp.
          </p>
        </div>

        <div className="bg-neutral-warm/20 p-4 rounded-2xl text-left border border-neutral-warm text-xs space-y-2 max-w-md mx-auto">
          <div className="font-bold text-brand-plum flex items-center justify-between">
            <span>Booking Overview</span>
            <span className="text-[10px] bg-brand-rose text-white px-2 py-0.5 rounded-full uppercase">
              Draft
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-neutral-mid block text-[10px] uppercase">Client Name</span>
              <span className="font-bold text-neutral-dark">{formData.fullName}</span>
            </div>
            <div>
              <span className="text-neutral-mid block text-[10px] uppercase">Service Choice</span>
              <span className="font-bold text-brand-plum">{formData.serviceType}</span>
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
            Edit Booking Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="booking-form-header" className="space-y-7 pb-8 relative">
      
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

      {(initialServiceId || selectedPhotoUrl) && (
        <div className="bg-gradient-to-r from-brand-plum/10 via-brand-rose/10 to-brand-blush/20 border border-brand-plum/30 text-brand-plum rounded-2xl p-4 flex items-center justify-between gap-4 text-xs font-sans animate-fadeIn">
          <div className="flex items-center gap-3">
            {selectedPhotoUrl && (
              <img
                src={selectedPhotoUrl}
                alt="Selected Style Reference"
                className="w-14 h-18 object-cover rounded-xl shadow-xs border-2 border-white shrink-0"
              />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block text-brand-rose">
                Selected Gallery Reference Style & Photo
              </span>
              <span className="font-serif font-bold text-sm text-brand-plum block">
                "{initialServiceId || 'Selected Photo Style'}"
              </span>
              {fullPhotoUrl && (
                <span className="text-[11px] text-neutral-mid block mt-0.5 font-sans">
                  ✦ Direct photo link will be attached to your WhatsApp message for instant image preview!
                </span>
              )}
            </div>
          </div>
          <span className="bg-brand-plum text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shrink-0 hidden sm:inline-block shadow-xs">
            Photo Attached
          </span>
        </div>
      )}

      {/* Contact Details */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-4 border-b border-brand-blush/15 sm:border-b-0 pb-6 sm:pb-0">
        <h3 className="font-serif text-lg font-bold text-brand-plum border-b border-brand-blush/20 pb-2 mb-3">
          1. Basic Details
        </h3>

        <div>
          <label htmlFor="bookingFullName" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
            Full Name <span className="text-brand-rose">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
            <input
              id="bookingFullName"
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Priya Sundar"
              className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bookingPhone" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
            WhatsApp Phone Number <span className="text-brand-rose">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
            <input
              id="bookingPhone"
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
      </div>

      {/* Booking Parameters */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-4 border-b border-brand-blush/15 sm:border-b-0 pb-6 sm:pb-0">
        <h3 className="font-serif text-lg font-bold text-brand-plum border-b border-brand-blush/20 pb-2 mb-3">
          2. Saree & Service Choices
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bookingServiceType" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
              Service Type <span className="text-brand-rose">*</span>
            </label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400 pointer-events-none" />
              <select
                id="bookingServiceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark focus:bg-white appearance-none cursor-pointer"
              >
                <option value="Box Fold">Box Fold (₹600)</option>
                <option value="Hanger Fold">Hanger Fold (₹700)</option>
                <option value="Bridal Draping">Bridal Draping (₹2,000)</option>
                <option value="Celebrity Draping">Celebrity/Designer Drape (₹3,000)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="bookingSareeType" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
              Saree Fabric/Type <span className="text-brand-rose">*</span>
            </label>
            <input
              id="bookingSareeType"
              type="text"
              name="sareeType"
              required
              value={formData.sareeType}
              onChange={handleInputChange}
              placeholder="e.g. Kanjivaram Silk, Cotton, Georgette"
              className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 px-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bookingNumSarees" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
              Number of Sarees <span className="text-brand-rose">*</span>
            </label>
            <input
              id="bookingNumSarees"
              type="number"
              name="numberOfSarees"
              min="1"
              required
              value={formData.numberOfSarees}
              onChange={handleInputChange}
              className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 px-4 rounded-xl font-sans text-xs text-neutral-dark focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="bookingExpectedDelivery" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
              Expected Delivery Date <span className="text-brand-rose">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400 pointer-events-none" />
              <input
                id="bookingExpectedDelivery"
                type="date"
                name="expectedDeliveryDate"
                required
                value={formData.expectedDeliveryDate}
                onChange={handleInputChange}
                className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-neutral-dark focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Urgent Service Block Toggle */}
        <div className="pt-2 bg-brand-blush/20 rounded-xl p-4 border border-brand-blush/30">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span id="urgent-label" className="text-xs font-bold text-brand-plum uppercase tracking-wider block">
                Need Urgent 5-Hour Delivery?
              </span>
              <p id="urgent-desc" className="text-[10px] text-neutral-mid mt-0.5">
                Ready within 5 hours of receipt (travel time excluded). Adds small premium +₹150.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isUrgent}
              aria-labelledby="urgent-label"
              aria-describedby="urgent-desc"
              onClick={handleToggleUrgent}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer flex items-center shrink-0 ${
                formData.isUrgent ? 'bg-brand-plum' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  formData.isUrgent ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Pickup Method Radios */}
        <div role="radiogroup" aria-labelledby="pickupMethodLabel">
          <span id="pickupMethodLabel" className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-2">
            Saree Delivery & Pickup Method <span className="text-brand-rose">*</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'Drop at Location', label: 'Drop at Location', sub: 'Visit Studio' },
              { id: 'Courier', label: 'Courier', sub: 'Ship to us' },
              { id: 'Dunzo', label: 'Dunzo / Porter', sub: 'Local delivery' },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                role="radio"
                aria-checked={formData.pickupMethod === method.id}
                onClick={() => handleRadioChange(method.id as any)}
                className={`py-3 px-2 rounded-xl text-center border font-sans select-none flex flex-col items-center justify-center cursor-pointer transition-all ${
                  formData.pickupMethod === method.id
                    ? 'border-brand-plum bg-brand-blush/20 text-brand-plum'
                    : 'border-brand-blush/35 bg-neutral-warm/20 text-neutral-mid hover:bg-brand-blush/10'
                }`}
              >
                <span className="text-xs font-bold block">{method.label}</span>
                <span className="text-[9px] text-[#777] mt-0.5">{method.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saree Measurements Section */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-4 border-b border-brand-blush/15 sm:border-b-0 pb-6 sm:pb-0">
        <div className="flex items-center justify-between border-b border-brand-blush/20 pb-2 mb-3">
          <h3 className="font-serif text-lg font-bold text-brand-plum">
            3. Master Measurements
          </h3>

          {/* Unit Toggle */}
          <button
            type="button"
            onClick={handleToggleUnit}
            className="flex items-center gap-1.5 bg-brand-blush/35 py-1 px-3 rounded-full text-[10px] font-bold text-brand-plum uppercase tracking-wider select-none hover:bg-brand-blush/50 transition-colors cursor-pointer"
          >
            <span>Unit: {formData.useCm ? 'CM' : 'Inches'}</span>
          </button>
        </div>

        <p className="text-[11px] text-neutral-mid leading-relaxed mb-4">
          Provide your drape measurements for a perfect pre-pleated fit. Tap any box to see a measurements guide.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Fields (7 columns) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Dynamic Measurement Instruction Card */}
            {activeInstruction && (
              <div className="bg-brand-blush/15 border border-brand-blush/30 rounded-xl p-3.5 flex gap-3 text-xs leading-relaxed animate-fadeIn">
                <Info className="h-5 w-5 text-brand-rose shrink-0 mt-0.5" />
                <div>
                  <span className="font-serif font-bold text-brand-plum block">
                    {measurementGuides[activeInstruction as keyof typeof measurementGuides]?.title}
                  </span>
                  <p className="text-neutral-mid text-[11px] mt-0.5">
                    {measurementGuides[activeInstruction as keyof typeof measurementGuides]?.desc}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bookingHip" className="block text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 cursor-pointer">
                  Hip Measurement
                </label>
                <input
                  id="bookingHip"
                  type="text"
                  name="hipMeasurement"
                  value={formData.hipMeasurement}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInstruction('hip')}
                  placeholder={`e.g. ${formData.useCm ? '92' : '36'}`}
                  className="w-full bg-neutral-warm/20 border border-brand-blush/40 py-2.5 px-3 rounded-lg font-sans text-xs focus:bg-white text-neutral-dark"
                />
              </div>

              <div>
                <label htmlFor="bookingShoulderCalf" className="block text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 cursor-pointer">
                  Shoulder to Mid-Calf
                </label>
                <input
                  id="bookingShoulderCalf"
                  type="text"
                  name="shoulderToCalf"
                  value={formData.shoulderToCalf}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInstruction('pallu')}
                  placeholder={`e.g. ${formData.useCm ? '114' : '45'}`}
                  className="w-full bg-neutral-warm/20 border border-brand-blush/40 py-2.5 px-3 rounded-lg font-sans text-xs focus:bg-white text-neutral-dark"
                />
              </div>

              <div>
                <label htmlFor="bookingShoulderSpine" className="block text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 cursor-pointer">
                  L. Shoulder to Spine
                </label>
                <input
                  id="bookingShoulderSpine"
                  type="text"
                  name="leftShoulderToSpine"
                  value={formData.leftShoulderToSpine}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInstruction('lsSpine')}
                  placeholder={`e.g. ${formData.useCm ? '30' : '12'}`}
                  className="w-full bg-neutral-warm/20 border border-brand-blush/40 py-2.5 px-3 rounded-lg font-sans text-xs focus:bg-white text-neutral-dark"
                />
              </div>

              <div>
                <label htmlFor="bookingSpineThigh" className="block text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 cursor-pointer">
                  Spine to Mid-R. Thigh
                </label>
                <input
                  id="bookingSpineThigh"
                  type="text"
                  name="spineToRightThigh"
                  value={formData.spineToRightThigh}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInstruction('spineThigh')}
                  placeholder={`e.g. ${formData.useCm ? '40' : '16'}`}
                  className="w-full bg-neutral-warm/20 border border-brand-blush/40 py-2.5 px-3 rounded-lg font-sans text-xs focus:bg-white text-neutral-dark"
                />
              </div>

              <div>
                <label htmlFor="bookingShoulderBust" className="block text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 cursor-pointer">
                  L. Shoulder to Bust
                </label>
                <input
                  id="bookingShoulderBust"
                  type="text"
                  name="leftShoulderToBust"
                  value={formData.leftShoulderToBust}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInstruction('lsBust')}
                  placeholder={`e.g. ${formData.useCm ? '25' : '10'}`}
                  className="w-full bg-neutral-warm/20 border border-brand-blush/40 py-2.5 px-3 rounded-lg font-sans text-xs focus:bg-white text-neutral-dark"
                />
              </div>

              <div>
                <label htmlFor="bookingBustCoverage" className="block text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 cursor-pointer">
                  Full Bust Coverage
                </label>
                <input
                  id="bookingBustCoverage"
                  type="text"
                  name="fullBustCoverage"
                  value={formData.fullBustCoverage}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInstruction('bust')}
                  placeholder={`e.g. ${formData.useCm ? '86' : '34'}`}
                  className="w-full bg-neutral-warm/20 border border-brand-blush/40 py-2.5 px-3 rounded-lg font-sans text-xs focus:bg-white text-neutral-dark"
                />
              </div>
            </div>
          </div>

          {/* Right: Saree Measurement Guide image card (5 columns) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="block text-[10px] font-bold text-brand-rose uppercase tracking-wider">
              Visual Reference Guide (Click to Expand)
            </span>
            <div 
              onClick={() => setIsGuideOpen(true)}
              className="border border-brand-blush/30 rounded-2xl overflow-hidden shadow-2xs bg-white cursor-pointer hover:shadow-md hover:border-brand-blush/60 transition-all duration-300 relative group select-none"
            >
              <img 
                src="/reviews/saree_measurement_guide.jpg" 
                alt="Saree Measurement Reference Guide" 
                className="w-full h-auto object-cover max-h-[360px] md:max-h-none group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-plum/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/95 text-brand-plum font-sans font-bold text-[10px] uppercase tracking-wider py-2 px-4 rounded-full shadow-xs border border-brand-blush/20">
                  Click to Expand
                </span>
              </div>
            </div>
            <p className="text-[10px] text-neutral-mid leading-relaxed italic text-center">
              Please refer to the numbers on the diagram to locate where each measurement should be taken.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Measurement Guide Lightbox Modal */}
      {isGuideOpen && createPortal(
        <div 
          onClick={() => setIsGuideOpen(false)}
          className="fixed inset-0 bg-[#FAF7F9]/95 z-[10005] flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-brand-blush/25 cursor-default font-sans text-left"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#F2D6E4]/40 flex justify-between items-center bg-neutral-warm/5">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-plum">
                  Saree Measurement Guide
                </h3>
                <p className="text-[10px] text-neutral-mid uppercase tracking-wider font-semibold mt-0.5">
                  Visual Reference Chart for Perfect Fit
                </p>
              </div>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="bg-brand-plum/10 hover:bg-brand-plum/20 text-brand-plum rounded-full p-2 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable image content */}
            <div className="flex-1 overflow-y-auto p-4 bg-neutral-warm/10 flex items-center justify-center">
              <img
                src="/reviews/saree_measurement_guide.jpg"
                alt="Saree Measurement Reference Guide Fullscreen"
                className="w-auto h-auto max-w-full max-h-[65vh] object-contain rounded-xl shadow-xs"
              />
            </div>

            {/* Footer tips */}
            <div className="p-4 border-t border-[#F2D6E4]/40 bg-neutral-warm/5 text-center text-[10px] text-neutral-mid font-medium">
              Take measurements snugly but not tight. Wear a well-fitted blouse for the best outcome.
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Special Requests */}
      <div className="bg-transparent sm:bg-white rounded-none sm:rounded-2xl p-0 sm:p-5 border-0 sm:border border-brand-blush/20 shadow-none sm:shadow-xs space-y-4 pb-2 sm:pb-0">
        <h3 className="font-serif text-lg font-bold text-brand-plum border-b border-brand-blush/20 pb-2 mb-3">
          4. Additional Notes
        </h3>

        <div>
          <label htmlFor="bookingNotes" className="block text-[10px] font-bold text-[#444] uppercase tracking-wider mb-2 cursor-pointer">
            Special Requests or Custom Styles
          </label>
          <textarea
            id="bookingNotes"
            name="additionalNotes"
            rows={3}
            value={formData.additionalNotes}
            onChange={handleInputChange}
            placeholder="e.g. Need the pallu pleats to be exactly 2 inches width... please handle this delicate pure silk item gently with starch."
            className="w-full bg-neutral-warm/30 border border-brand-blush/40 py-3 px-4 rounded-xl font-sans text-xs text-neutral-dark placeholder:text-neutral-400 focus:bg-white resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
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
            <span>Formatting Form...</span>
          </>
        ) : (
          <>
            <span>Submit to WhatsApp</span>
            <ChevronRight className="h-4.5 w-4.5" />
          </>
        )}
      </button>

      <div className="flex items-center gap-2 justify-center text-[10px] text-neutral-mid text-center">
        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
        <span>No advance payment needed. Pay via UPI/Cash upon delivery!</span>
      </div>
    </form>
  );
}
