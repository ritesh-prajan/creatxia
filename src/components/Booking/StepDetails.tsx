import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BookingForm } from '../../types';
import { cities } from '../../data';
import { Button } from '../ui/Button';

interface StepDetailsProps {
  formData: BookingForm;
  setFormData: React.Dispatch<React.SetStateAction<BookingForm>>;
  onNext: () => void;
  onBack: () => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({
  formData,
  setFormData,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10+ digit contact number';
    }
    if (!formData.city) newErrors.city = 'Please select a city';
    if (!formData.projectType) newErrors.projectType = 'Please select a project category';
    if (!formData.approxSize) newErrors.approxSize = 'Please specify estimated size range';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof BookingForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between" id="booking-step-details">
      <div className="overflow-y-auto pr-2 max-h-[55vh] space-y-5">
        <div>
          <h3 className="font-display text-2xl text-navy mb-2 font-medium">
            Step 2: Project Architecture details
          </h3>
          <p className="text-sm text-navy/60 font-sans">
            Tell us about your target property. We configure design-teams specialized for your exact category.
          </p>
        </div>

        {/* 2x2 Grid for Personal details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
              Your Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-warm-grey border rounded-none font-sans text-sm text-navy placeholder-navy/40 focus:outline-none focus:border-orange-accent transition-colors duration-300 ${
                errors.name ? 'border-red-500' : 'border-navy/10'
              }`}
              placeholder="e.g. Ramesh Kumar"
              id="input-form-name"
            />
            {errors.name && <p className="text-[11px] text-red-500 font-sans mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-warm-grey border rounded-none font-sans text-sm text-navy placeholder-navy/40 focus:outline-none focus:border-orange-accent transition-colors duration-300 ${
                errors.email ? 'border-red-500' : 'border-navy/10'
              }`}
              placeholder="e.g. hello@domain.com"
              id="input-form-email"
            />
            {errors.email && <p className="text-[11px] text-red-500 font-sans mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-warm-grey border rounded-none font-sans text-sm text-navy placeholder-navy/40 focus:outline-none focus:border-orange-accent transition-colors duration-300 ${
                errors.phone ? 'border-red-500' : 'border-navy/10'
              }`}
              placeholder="e.g. +91 98765 43210"
              id="input-form-phone"
            />
            {errors.phone && <p className="text-[11px] text-red-500 font-sans mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
              Select Location City *
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-warm-grey border rounded-none font-sans text-sm text-navy focus:outline-none focus:border-orange-accent transition-colors duration-300 ${
                errors.city ? 'border-red-500' : 'border-navy/10'
              }`}
              id="input-form-city"
            >
              <option value="">-- Choose City --</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-[11px] text-red-500 font-sans mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Project Specifics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
              Project Type *
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-warm-grey border rounded-none font-sans text-sm text-navy focus:outline-none focus:border-orange-accent transition-colors duration-300 ${
                errors.projectType ? 'border-red-500' : 'border-navy/10'
              }`}
              id="input-form-projectType"
            >
              <option value="">-- Select Category --</option>
              <option value="Residential">Residential Interiors</option>
              <option value="Retail">Large Scale Retail / Commercial</option>
              <option value="Corporate">Corporate & Office Headquarters</option>
            </select>
            {errors.projectType && (
              <p className="text-[11px] text-red-500 font-sans mt-1">{errors.projectType}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
              Estimated Built Size *
            </label>
            <select
              name="approxSize"
              value={formData.approxSize}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-warm-grey border rounded-none font-sans text-sm text-navy focus:outline-none focus:border-orange-accent transition-colors duration-300 ${
                errors.approxSize ? 'border-red-500' : 'border-navy/10'
              }`}
              id="input-form-approxSize"
            >
              <option value="">-- Select Carpet Range --</option>
              <option value="Under 500 sqft">Under 500 sqft</option>
              <option value="500-2000 sqft">500 - 2,000 sqft</option>
              <option value="2000-5000 sqft">2,000 - 5,000 sqft</option>
              <option value="5000+ sqft">5,000+ sqft</option>
            </select>
            {errors.approxSize && (
              <p className="text-[11px] text-red-500 font-sans mt-1">{errors.approxSize}</p>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-navy/70 font-sans mb-1.5">
            Brief Description / Key Requirements
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-warm-grey border border-navy/10 rounded-none font-sans text-sm text-navy placeholder-navy/40 focus:outline-none focus:border-orange-accent transition-colors duration-300 resize-none"
            placeholder="e.g. Minimalist layout, smart storage solutions, custom brass accents, warm wood finishes..."
            id="input-form-description"
          />
        </div>
      </div>

      <div className="border-t border-navy/10 pt-6 mt-6 flex justify-between gap-4 bg-white">
        <Button variant="ghost" type="button" onClick={onBack} className="text-navy hover:text-orange-accent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button variant="primary" type="submit" className="w-full sm:w-auto">
          Review & Connect
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
};
