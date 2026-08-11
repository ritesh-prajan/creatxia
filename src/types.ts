/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageView =
  | 'home'
  | 'services'
  | 'classes'
  | 'how-it-works'
  | 'reviews'
  | 'gallery'
  | 'book'
  | 'book-class'
  | 'contact'
  | 'faq'
  | 'about-developer';

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'pleating' | 'bridal' | 'celebrity';
  meta?: string;
  photoUrl?: string;
}

export interface PricingClass {
  tier: number;
  name: string;
  price: number;
  offerPrice?: number;
  details: string[];
  isPopular?: boolean;
  photoUrl?: string;
}

export interface TrustBadge {
  id: string;
  icon: string;
  number: string;
  label: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  type: 'pleating' | 'classes';
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  text: string;
  videoThumbnail?: string;
  photoUrl?: string;
  chatScreenshot?: string;
  sareeType?: string;
  date?: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  serviceType: string;
  sareeType: string;
  numberOfSarees: number;
  expectedDeliveryDate: string;
  isUrgent: boolean;
  pickupMethod: 'Drop at Location' | 'Courier' | 'Dunzo';
  hipMeasurement: string;
  useCm: boolean; // toggle between cm and inches
  shoulderToCalf: string;
  leftShoulderToSpine: string;
  spineToRightThigh: string;
  leftShoulderToBust: string;
  fullBustCoverage: string;
  additionalNotes: string;
}

export interface ClassFormData {
  fullName: string;
  phone: string;
  email: string;
  classTier: string;
  preferredDate: string;
  mode: 'Online' | 'In-Person';
  questions: string;
}

export interface FaqItemType {
  question: string;
  answer: string;
}
