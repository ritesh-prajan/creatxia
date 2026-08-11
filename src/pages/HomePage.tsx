import React from 'react';
import { PageView } from '../types';
import HeroSection from '../components/home/HeroSection';
import TrustBadgesMarquee from '../components/home/TrustBadgesMarquee';
import IntroSection from '../components/home/IntroSection';
import ServicesSnapshot from '../components/home/ServicesSnapshot';
import BeforeAfterGallery from '../components/BeforeAfterGallery';

interface HomePageProps {
  navigateTo: (page: PageView) => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
  return (
    <div className="animate-fadeIn">
      <HeroSection navigateTo={navigateTo} />
      <TrustBadgesMarquee />
      <IntroSection />
      <ServicesSnapshot navigateTo={navigateTo} />
      
      {/* Immersive Interactive Before-After Transformation Slider */}
      <div className="max-w-5xl mx-auto px-6">
        <BeforeAfterGallery />
      </div>
    </div>
  );
}
