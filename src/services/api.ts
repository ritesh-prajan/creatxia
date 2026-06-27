import { Project } from '../types';
import { ApiProject, BookingPayload, BookingResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getCategoryFromProject = (project: ApiProject): 'residential' | 'retail' | 'corporate' => {
  const content = (project.title + ' ' + project.description).toLowerCase();
  if (content.includes('retail') || content.includes('commercial') || content.includes('shop') || content.includes('store')) {
    return 'retail';
  }
  if (content.includes('corporate') || content.includes('office') || content.includes('workspace') || content.includes('work')) {
    return 'corporate';
  }
  return 'residential';
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/api/projects`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }
  const json = await response.json();
  const apiProjects: ApiProject[] = Array.isArray(json) ? json : json.data;
  
  return apiProjects.map((p) => {
    let imageUrl = p.cover_image;
    if (!imageUrl && p.media && p.media.length > 0) {
      const coverMedia = p.media.find(m => m.collection_name === 'cover_image');
      imageUrl = coverMedia ? coverMedia.url : p.media[0].url;
    }
    return {
      id: p.id,
      name: p.title,
      category: getCategoryFromProject(p),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    };
  });
};

export const fetchProject = async (id: number | string): Promise<Project> => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch project: ${response.statusText}`);
  }
  const json = await response.json();
  const p: ApiProject = json.data || json;
  
  let imageUrl = p.cover_image;
  if (!imageUrl && p.media && p.media.length > 0) {
    const coverMedia = p.media.find(m => m.collection_name === 'cover_image');
    imageUrl = coverMedia ? coverMedia.url : p.media[0].url;
  }
  return {
    id: p.id,
    name: p.title,
    category: getCategoryFromProject(p),
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  };
};

export const submitBooking = async (data: BookingPayload): Promise<BookingResponse> => {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || `Failed to submit booking: ${response.statusText}`);
  }
  return json;
};
