import { Service, Stat } from '../types';
export { useProjects } from '../hooks/useProjects';

export const services: Service[] = [
  {
    id: 1,
    title: "Residential Interiors",
    subtitle: "Homes that feel like you — only better.",
    description: "We craft spaces that resonate with your personal style. Combining functionality, modern styling, and luxurious materials to design residences that are as comfortable as they are visually striking.",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
  },
  {
    id: 2,
    title: "Large Scale Retail",
    subtitle: "Stores that stop people in their tracks.",
    description: "Immersive retail environments designed to elevate branding, enhance customer flows, and maximize product displays. We build commercially robust spaces that invite and engage.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
  },
  {
    id: 3,
    title: "Corporate & Office",
    subtitle: "Workspaces that command respect.",
    description: "Inspiring workspaces that foster collaboration, enhance employee well-being, and communicate company values. Smart layouts integrated with cutting-edge functional elements.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200"
  }
];

export const stats: Stat[] = [
  { id: 1, value: "50+", numericValue: 50, suffix: "+", label: "Completed Projects" },
  { id: 2, value: "8+", numericValue: 8, suffix: "+", label: "Cities Reached" },
  { id: 3, value: "200+", numericValue: 200, suffix: "+", label: "Happy Clients" },
  { id: 4, value: "5", numericValue: 5, suffix: " Years", label: "Design Experience" }
];

export const immersionImages = [
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920", text: "From the outside..." },
  { url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920", text: "Step inside." },
  { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920", text: "Feel the difference." },
  { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920", text: "This is craftsmanship." },
  { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920", text: "This is Creatxia." }
];

export const cities = ["Chennai", "Mumbai", "Bangalore", "Hyderabad", "Delhi", "Pune", "Kochi", "Coimbatore"];
