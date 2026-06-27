export interface Project {
  id: number;
  name: string;
  category: 'residential' | 'retail' | 'corporate';
  imageUrl: string;
}

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export interface Stat {
  id: number;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: 'Residential' | 'Retail' | 'Corporate' | '';
  approxSize: 'Under 500 sqft' | '500-2000 sqft' | '2000-5000 sqft' | '5000+ sqft' | '';
  description: string;
}

export interface MoodboardItem {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}
