import React, { useState, useEffect } from 'react';
import { useProjects } from '../data';
import { ImageCard } from './ui/ImageCard';
import { SectionHeading } from './ui/SectionHeading';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'retail' | 'corporate'>('all');
  const { projects, loading, error } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      if (activeFilter === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter((item) => item.category === activeFilter));
      }
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeFilter, projects]);

  const filterTabs = [
    { label: 'All Projects', value: 'all' as const },
    { label: 'Residential', value: 'residential' as const },
    { label: 'Retail & Commercial', value: 'retail' as const },
    { label: 'Corporate & Offices', value: 'corporate' as const },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-warm-grey px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Our Portfolio"
          title="Curated Work Showcase"
          subtitle="A selection of our award-winning residential, commercial retail, and workspace architectures across major cities in India."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-20" id="portfolio-filters">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-6 py-3.5 text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-300 rounded-none border ${
                activeFilter === tab.value
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-navy/60 hover:text-navy hover:bg-white/80 border-navy/10'
              }`}
              id={`filter-tab-${tab.value}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12 px-4 border border-red-200 bg-red-50 text-red-700 max-w-lg mx-auto rounded mb-8" id="portfolio-error">
            <p className="font-sans font-medium text-sm mb-2">Couldn't load projects. Please try again.</p>
            <p className="text-xs text-red-500/80">{error}</p>
          </div>
        )}

        {/* Loading State - Skeleton Cards */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="portfolio-skeleton">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-neutral-200 animate-pulse aspect-[3/4] relative overflow-hidden flex flex-col justify-end p-6 border border-neutral-300">
                <div className="h-4 bg-neutral-300 w-2/3 mb-3 rounded"></div>
                <div className="h-3 bg-neutral-300 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16 text-navy/60 font-sans" id="portfolio-empty">
            No projects found in this category.
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div
            className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 transition-all duration-300 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
            id="portfolio-masonry-grid"
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className="break-inside-avoid overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <ImageCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
