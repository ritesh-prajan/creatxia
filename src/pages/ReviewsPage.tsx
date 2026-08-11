import React, { useState, useEffect } from 'react';
import { reviews as initialReviews } from '../data';
import { SectionTitle, ReviewCard } from '../components/UI';
import { Review } from '../types';
import { Camera, Image, MessageSquareHeart, Star, Upload, CheckCircle2, Plus, X } from 'lucide-react';

const PRESET_PHOTOS = [
  {
    name: 'Classic Silk Border',
    url: '/reviews/flawless_pleats_darshan.jpg',
  },
  {
    name: 'Golden Zari Heavy Silk',
    url: '/reviews/cream_saree_perfect.jpg',
  },
  {
    name: 'Soft Banarasi Georgette',
    url: '/reviews/two_minutes_maggi.jpg',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | 'chats'>('all');
  const [showForm, setShowForm] = useState(false);

  // Review Form States
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [sareeType, setSareeType] = useState('Kanchipuram Silk');
  const [photoOption, setPhotoOption] = useState<'none' | 'preset' | 'upload'>('none');
  const [selectedPreset, setSelectedPreset] = useState(PRESET_PHOTOS[0].url);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Load reviews from localStorage + initialReviews
  useEffect(() => {
    const saved = localStorage.getItem('tuckpin_reviews');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        // Clean up any old cached custom reviews from previous test runs using Unsplash
        parsed = parsed.map((r: any) => {
          if (r.photoUrl && r.photoUrl.includes('unsplash.com')) {
            r.photoUrl = '/reviews/flawless_pleats_darshan.jpg';
          }
          return r;
        });
        setReviews([...parsed, ...initialReviews]);
      } catch (e) {
        setReviews(initialReviews);
      }
    } else {
      setReviews(initialReviews);
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    let finalPhotoUrl = undefined;
    if (photoOption === 'preset') {
      finalPhotoUrl = selectedPreset;
    } else if (photoOption === 'upload' && uploadedPhotoUrl) {
      finalPhotoUrl = uploadedPhotoUrl;
    }

    const newReview: Review = {
      id: `r_custom_${Date.now()}`,
      name: name.trim(),
      stars: rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      photoUrl: finalPhotoUrl,
      sareeType: sareeType.trim() || undefined,
    };

    const updated = [newReview, ...reviews.filter(r => !r.id.startsWith('r_custom_'))];
    
    // Save only user submitted ones to localStorage to avoid duplicate initialReviews
    const customOnly = [newReview, ...reviews.filter(r => r.id.startsWith('r_custom_'))];
    localStorage.setItem('tuckpin_reviews', JSON.stringify(customOnly));

    setReviews([newReview, ...reviews]);
    setSuccessMsg(true);

    // Reset Form
    setName('');
    setRating(5);
    setText('');
    setSareeType('Kanchipuram Silk');
    setPhotoOption('none');
    setUploadedPhotoUrl('');

    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 2000);
  };

  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === 'photos') return !!review.photoUrl;
    if (activeFilter === 'chats') return !!review.chatScreenshot;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-10 animate-fadeIn text-left font-sans">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-brand-blush/20 pb-8">
        <div className="flex-1 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest text-brand-rose bg-brand-blush/30 px-3.5 py-1.5 rounded-full uppercase inline-block mb-3">
            Real Proof
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-plum tracking-tight">
            Customer Transformations & Reviews
          </h1>
          <p className="text-xs sm:text-sm text-neutral-mid leading-relaxed mt-2 max-w-xl">
            See the actual results of our premium box pleating and styling service. Verified feedback from real Chennai clients, brides, and students.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-brand-plum hover:bg-[#521337] text-white font-medium text-xs py-3 px-6 rounded-full cursor-pointer shadow-md select-none transition-all active:scale-[0.98]"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel Form' : 'Write a Review'}
        </button>
      </div>

      {/* Review Submission Form Segment */}
      {showForm && (
        <div className="bg-white border border-[#F2D6E4] rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto animate-fadeIn">
          {successMsg ? (
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 rounded-full">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-plum">Thank You!</h3>
              <p className="text-xs text-neutral-mid">Your review and saree drape photo have been submitted successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-plum flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-brand-rose" />
                Share Your Draping Experience
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-dark uppercase block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF7F9] border border-[#F2D6E4]/70 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-plum focus:border-brand-plum outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-dark uppercase block">Saree Type / Fabric</label>
                  <input
                    type="text"
                    placeholder="e.g. Kanchipuram Silk Saree"
                    value={sareeType}
                    onChange={(e) => setSareeType(e.target.value)}
                    className="w-full bg-[#FAF7F9] border border-[#F2D6E4]/70 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-plum focus:border-brand-plum outline-none"
                  />
                </div>
              </div>

              {/* Star Rating Select */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-dark uppercase block">Rating</label>
                <div className="flex gap-1.5 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating ?? rating)
                            ? 'fill-brand-rose text-brand-rose'
                            : 'text-neutral-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-neutral-mid font-medium ml-2">
                    {rating} Star{rating > 1 ? 's' : ''} Selected
                  </span>
                </div>
              </div>

              {/* Review Text Area */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-dark uppercase block">Your Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How was the pleating quality? Did it fit comfortably? How many compliments did you get?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#FAF7F9] border border-[#F2D6E4]/70 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-plum focus:border-brand-plum outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Add Photo/Attachment Selection */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-neutral-dark uppercase block">Add Saree photo</label>
                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-dark">
                    <input
                      type="radio"
                      name="photoOption"
                      checked={photoOption === 'none'}
                      onChange={() => setPhotoOption('none')}
                      className="text-brand-plum focus:ring-brand-plum"
                    />
                    No Photo
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-dark">
                    <input
                      type="radio"
                      name="photoOption"
                      checked={photoOption === 'preset'}
                      onChange={() => setPhotoOption('preset')}
                      className="text-brand-plum focus:ring-brand-plum"
                    />
                    Choose from Beautiful Presets
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-dark">
                    <input
                      type="radio"
                      name="photoOption"
                      checked={photoOption === 'upload'}
                      onChange={() => setPhotoOption('upload')}
                      className="text-brand-plum focus:ring-brand-plum"
                    />
                    Upload Screenshot/Photo
                  </label>
                </div>

                {/* Preset Options Roll */}
                {photoOption === 'preset' && (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {PRESET_PHOTOS.map((photo) => (
                      <div
                        key={photo.url}
                        onClick={() => setSelectedPreset(photo.url)}
                        className={`relative rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-all ${
                          selectedPreset === photo.url ? 'border-brand-plum shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-sm truncate max-w-full">
                          {photo.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Simulated File Upload Input */}
                {photoOption === 'upload' && (
                  <div className="pt-2">
                    <label className="relative border-2 border-dashed border-[#F2D6E4] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-blush/5 transition-colors gap-2 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      {uploadedPhotoUrl ? (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-brand-blush/30">
                          <img src={uploadedPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadedPhotoUrl('');
                            }}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="bg-brand-blush/30 text-brand-plum p-3 rounded-full">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-neutral-dark">Choose Photo/Screenshot</p>
                            <p className="text-[9px] text-neutral-mid mt-0.5">JPG, PNG, WebP up to 5MB</p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-plum hover:bg-[#521337] text-white font-medium text-xs py-3.5 rounded-xl cursor-pointer shadow-md select-none transition-all active:scale-[0.99]"
              >
                Publish Review
              </button>
            </form>
          )}
        </div>
      )}

      {/* Filter Tabs & Quick Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-[#F2D6E4]/30 rounded-3xl p-4 shadow-3xs">
        
        {/* Active Filter Tabs */}
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'all'
                ? 'bg-brand-plum text-white border-brand-plum shadow-3xs'
                : 'bg-white text-neutral-dark border-[#F2D6E4] hover:bg-brand-blush/10'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveFilter('photos')}
            className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border ${
              activeFilter === 'photos'
                ? 'bg-brand-plum text-white border-brand-plum shadow-3xs'
                : 'bg-white text-neutral-dark border-[#F2D6E4] hover:bg-brand-blush/10'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Client Photos ({reviews.filter(r => !!r.photoUrl).length})
          </button>
          <button
            onClick={() => setActiveFilter('chats')}
            className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border ${
              activeFilter === 'chats'
                ? 'bg-brand-plum text-white border-brand-plum shadow-3xs'
                : 'bg-white text-neutral-dark border-[#F2D6E4] hover:bg-brand-blush/10'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            Verified Chat Proofs ({reviews.filter(r => !!r.chatScreenshot).length})
          </button>
        </div>

        {/* Counter Statement */}
        <div className="text-[10px] text-neutral-mid font-medium font-sans">
          Showing {filteredReviews.length} verified review{filteredReviews.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Testimonials Grid Stack */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-white border border-brand-blush/20 rounded-[32px] max-w-md mx-auto space-y-3">
          <div className="p-3 bg-brand-blush/20 text-brand-rose rounded-full inline-block">
            <Camera className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-base font-bold text-brand-plum">No photos found</h4>
          <p className="text-xs text-neutral-mid max-w-xs mx-auto">No reviews in this category yet. Be the first to add one with a beautiful photo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {filteredReviews.map((review) => (
            <div key={review.id} className="flex h-full">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
