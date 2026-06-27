import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Mail, MessageSquare, PhoneCall, Calendar, Clock, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { BookingForm } from '../../types';
import { useMoodboard } from '../../hooks/useMoodboard';
import { Button } from '../ui/Button';
import { submitBooking } from '../../services/api';

interface StepConnectProps {
  formData: BookingForm;
  onBack: () => void;
  onClose: () => void;
}

export const StepConnect: React.FC<StepConnectProps> = ({ formData, onBack, onClose }) => {
  const { moodboard, clearMoodboard } = useMoodboard();
  const [activeView, setActiveView] = useState<'channels' | 'book-call' | 'call-success'>('channels');
  
  // Call booking state
  const [callDate, setCallDate] = useState<string>('');
  const [timePreference, setTimePreference] = useState<'Morning (9am-12pm)' | 'Afternoon (12-4pm)' | 'Evening (4-7pm)' | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [callSuccessMessage, setCallSuccessMessage] = useState<string | null>(null);

  // Create message text
  const buildMessageText = (callDateInfo?: string) => {
    let msg = `Hello CREATXIA,
 
I would like to request a professional interior architecture consultation.
 
━━━ CUSTOMER PROFILE ━━━
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}
 
━━━ PROJECT ARCHITECTURE ━━━
Category: ${formData.projectType} Interiors
Est. Size: ${formData.approxSize}
Brief: ${formData.description || 'N/A'}\n`;

    if (callDateInfo) {
      msg += `━━━ PHONE CONSULTATION SLOT ━━━\n`;
      msg += `Scheduled: ${callDateInfo}\n`;
    }

    msg += `\n`;

    if (moodboard.length > 0) {
      msg += `━━━ MOODBOARD DESIGN REFERENCES ━━━\n`;
      moodboard.forEach((item, index) => {
        msg += `${index + 1}. ${item.name} (${item.category}) - ${item.imageUrl}\n`;
      });
    }

    return msg;
  };

  const messageText = buildMessageText(
    activeView === 'call-success' && callDate ? `${callDate} - ${timePreference}` : undefined
  );

  const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(messageText)}`;
  const mailToUrl = `mailto:hello@creatxia.com?subject=${encodeURIComponent(
    `Consultation Request: ${formData.name} - ${formData.projectType}`
  )}&body=${encodeURIComponent(messageText)}`;

  const mapFormDataToPayload = (
    form: BookingForm,
    preferredContact: 'whatsapp' | 'email' | 'call',
    preferredTime: string | null = null,
    moodboardUrls: string[] = []
  ) => {
    return {
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      project_type: (form.projectType || 'Residential') as 'Residential' | 'Retail' | 'Corporate',
      approx_size: form.approxSize || 'Under 500 sqft',
      message: form.description || null,
      moodboard_urls: moodboardUrls,
      preferred_contact: preferredContact,
      preferred_time: preferredTime,
    };
  };

  const handleContactAction = async (type: 'whatsapp' | 'email') => {
    setSubmitting(true);
    setApiError(null);
    const urls = moodboard.map((item) => item.imageUrl);
    const payload = mapFormDataToPayload(formData, type, null, urls);
    
    try {
      await submitBooking(payload);
    } catch (err: any) {
      console.error(`API booking submission failed:`, err);
      setApiError('Unable to connect to server. Opening communication channel directly.');
      // Show error toast for 4 seconds
      setTimeout(() => setApiError(null), 4000);
    } finally {
      setSubmitting(false);
      const targetUrl = type === 'whatsapp' ? waUrl : mailToUrl;
      if (type === 'whatsapp') {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = targetUrl;
      }
    }
  };

  const handleBookCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callDate || !timePreference) return;
    
    setSubmitting(true);
    setApiError(null);
    const urls = moodboard.map((item) => item.imageUrl);
    const preferredTime = `${callDate} (${timePreference})`;
    const payload = mapFormDataToPayload(formData, 'call', preferredTime, urls);

    try {
      await submitBooking(payload);
      setCallSuccessMessage("Perfect! Expect a call within 2 hours.");
      setActiveView('call-success');
    } catch (err: any) {
      console.error('Call booking failed:', err);
      setApiError(err.message || 'Failed to submit call request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    clearMoodboard();
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col h-full justify-between font-sans text-left" id="booking-step-connect">
      {/* Toast Error Alert */}
      {apiError && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 text-xs rounded transition-all duration-300">
          <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <div className="overflow-y-auto pr-1 max-h-[58vh] space-y-6">
        
        {/* VIEW 1: SELECT CHANNEL */}
        {activeView === 'channels' && (
          <>
            <div className="text-center py-2">
              <CheckCircle2 className="w-12 h-12 text-orange-accent mx-auto mb-3 animate-pulse" />
              <h3 className="font-display text-2xl text-navy font-semibold">
                Design Details Compiled!
              </h3>
              <p className="text-sm text-navy/60 font-sans mt-2 max-w-lg mx-auto">
                How would you prefer to coordinate your luxury design walkthrough with our lead architect?
              </p>
            </div>

            {/* Action Cards (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="connect-channels-grid">
              {/* Option 1: WhatsApp */}
              <button
                onClick={() => handleContactAction('whatsapp')}
                disabled={submitting}
                className="flex flex-col items-center p-6 text-center bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-all duration-300 group cursor-pointer h-full disabled:opacity-50"
                id="cta-connect-whatsapp"
              >
                <div className="p-3 bg-emerald-600 text-white rounded-none mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg text-navy font-bold mb-1">
                  Instant WhatsApp
                </h4>
                <p className="text-xs text-navy/60 font-sans leading-relaxed">
                  Send details instantly, chat with our support team, and coordinate via WhatsApp.
                </p>
                <div className="mt-4 text-xs font-semibold text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">
                  {submitting ? 'Connecting...' : 'Open Chat'} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>

              {/* Option 2: Email */}
              <button
                onClick={() => handleContactAction('email')}
                disabled={submitting}
                className="flex flex-col items-center p-6 text-center bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all duration-300 group cursor-pointer h-full disabled:opacity-50"
                id="cta-connect-email"
              >
                <div className="p-3 bg-navy text-white rounded-none mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg text-navy font-bold mb-1">
                  Send Official Email
                </h4>
                <p className="text-xs text-navy/60 font-sans leading-relaxed">
                  Submit a structured design brief directly to hello@creatxia.com to receive a formal estimation.
                </p>
                <div className="mt-4 text-xs font-semibold text-navy flex items-center group-hover:translate-x-1 transition-transform">
                  {submitting ? 'Connecting...' : 'Open Mail'} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>

              {/* Option 3: Book a Call */}
              <button
                onClick={() => setActiveView('book-call')}
                disabled={submitting}
                className="flex flex-col items-center p-6 text-center bg-orange-accent/5 hover:bg-orange-accent/10 border border-orange-accent/20 transition-all duration-300 group cursor-pointer h-full disabled:opacity-50"
                id="cta-connect-call"
              >
                <div className="p-3 bg-orange-accent text-white rounded-none mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg text-navy font-bold mb-1">
                  Book a Call
                </h4>
                <p className="text-xs text-navy/60 font-sans leading-relaxed">
                  Provide your preferred date and time, and our representative will reach out directly.
                </p>
                <div className="mt-4 text-xs font-semibold text-orange-accent flex items-center group-hover:translate-x-1 transition-transform">
                  Request Call <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>
            </div>

            {/* Preview Box */}
            <div className="p-4 bg-warm-grey border border-navy/5 text-left text-xs font-mono text-navy/70 space-y-1">
              <p className="font-bold text-[10px] text-navy/40 uppercase mb-2">Compiled Architecture Payload</p>
              <pre className="whitespace-pre-wrap font-sans text-[11px] leading-relaxed max-h-36 overflow-y-auto pr-1">
                {messageText}
              </pre>
            </div>
          </>
        )}

        {/* VIEW 2: BOOK A CALL */}
        {activeView === 'book-call' && (
          <form onSubmit={handleBookCallSubmit} className="space-y-6" id="booking-calendar-view">
            <div className="flex items-center gap-2 text-left">
              <button
                type="button"
                onClick={() => setActiveView('channels')}
                className="text-navy/60 hover:text-navy px-1 py-1 flex items-center text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
              <h3 className="font-display text-xl text-navy font-bold">
                Schedule Telephone Consultation
              </h3>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/50 flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-orange-accent" /> Select Call Date
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={callDate}
                onChange={(e) => setCallDate(e.target.value)}
                className="w-full px-4 py-3 border border-navy/10 bg-white focus:outline-none focus:border-orange-accent text-sm"
              />
            </div>

            {/* Time Preference buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/50 flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-orange-accent" /> Select Preferred Time Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: 'Morning (9am-12pm)', label: 'Morning (9am - 12pm)' },
                  { value: 'Afternoon (12-4pm)', label: 'Afternoon (12pm - 4pm)' },
                  { value: 'Evening (4-7pm)', label: 'Evening (4pm - 7pm)' }
                ].map((pref) => (
                  <button
                    key={pref.value}
                    type="button"
                    onClick={() => setTimePreference(pref.value as any)}
                    className={`px-4 py-3.5 text-xs font-semibold border transition-all duration-300 rounded-none ${
                      timePreference === pref.value
                        ? 'bg-orange-accent text-white border-orange-accent'
                        : 'bg-white text-navy/80 hover:bg-orange-accent/5 border-navy/10'
                    }`}
                  >
                    {pref.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit call booking */}
            <Button
              type="submit"
              variant="primary"
              disabled={submitting || !callDate || !timePreference}
              className="w-full justify-center text-sm py-3 bg-orange-accent hover:bg-orange-accent/90 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...
                </>
              ) : (
                'Request Consultation Call'
              )}
            </Button>
          </form>
        )}

        {/* VIEW 3: CALL BOOKED SUCCESS */}
        {activeView === 'call-success' && (
          <div className="space-y-6 text-center py-4 animate-fadeIn" id="booking-success-view">
            <div className="w-16 h-16 bg-orange-accent/10 text-orange-accent flex items-center justify-center mx-auto mb-2 rounded-full">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-2xl text-navy font-bold">
                Request Submitted!
              </h3>
              <p className="text-sm text-orange-600 font-semibold mt-2 px-4 py-2 bg-orange-50 border-l-4 border-orange-500 rounded inline-block">
                {callSuccessMessage}
              </p>
              <p className="text-xs text-navy/60 font-sans mt-4 max-w-md mx-auto">
                Thank you for selecting CREATXIA. Our lead designer will call you back during your preferred window ({timePreference}) on {callDate}.
              </p>
            </div>

            {/* Appointment Details Card */}
            <div className="max-w-md mx-auto p-5 bg-warm-grey border border-navy/5 text-left space-y-3">
              <div className="border-b border-navy/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-accent text-left block">Callback Details</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-navy/40 uppercase block">Selected Date</span>
                  <span className="text-sm font-semibold text-navy block mt-0.5">{callDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-navy/40 uppercase block">Time Window</span>
                  <span className="text-sm font-semibold text-navy block mt-0.5 text-xs">{timePreference}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-navy/40 uppercase block">Customer Details</span>
                <span className="text-sm font-semibold text-navy block mt-0.5">{formData.name} - {formData.phone}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="border-t border-navy/10 pt-4 mt-4 flex justify-between gap-4 bg-white">
        {activeView !== 'call-success' ? (
          <>
            <Button variant="ghost" onClick={onBack} className="text-navy hover:text-orange-accent px-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
            {activeView === 'channels' ? (
              <Button variant="primary" onClick={handleFinish} className="bg-navy hover:bg-navy/90 text-white">
                Finish & Exit
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setActiveView('channels')} className="text-navy/60">
                Cancel
              </Button>
            )}
          </>
        ) : (
          <>
            <div className="w-1"></div>
            <Button variant="primary" onClick={handleFinish} className="bg-orange-accent hover:bg-orange-accent/95 text-white">
              Done & Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
