export interface ApiMedia {
  id: number;
  url: string;
  collection_name: string;
}

export interface ApiProject {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  gallery_images: string[];
  media?: ApiMedia[];
  created_at: string;
  updated_at: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  project_type: 'Residential' | 'Retail' | 'Corporate';
  approx_size: string;
  message?: string | null;
  moodboard_urls?: string[] | null;
  preferred_contact: 'whatsapp' | 'email' | 'call';
  preferred_time?: string | null;
}

export interface BookingResponse {
  id: number;
  message: string;
  success: boolean;
}
