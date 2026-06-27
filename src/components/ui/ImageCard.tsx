import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useMoodboard } from '../../hooks/useMoodboard';
import { Project } from '../../types';

interface ImageCardProps {
  project: Project;
}

export const ImageCard: React.FC<ImageCardProps> = ({ project }) => {
  const { moodboard, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const isSaved = moodboard.some((item) => item.id === project.id);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);

    if (isSaved) {
      removeFromMoodboard(project.id);
    } else {
      addToMoodboard({
        id: project.id,
        name: project.name,
        category: project.category,
        imageUrl: project.imageUrl
      });
    }
  };

  return (
    <div className="group relative overflow-hidden bg-warm-grey aspect-[4/5] cursor-pointer">
      {/* Image */}
      <img
        src={project.imageUrl}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Dark Overlay on Hover */}
      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" id={`overlay-${project.id}`}>
        <span className="text-orange-accent text-xs uppercase tracking-wider font-sans font-semibold mb-1">
          {project.category}
        </span>
        <h3 className="text-white font-display text-xl leading-snug mb-1">
          {project.name}
        </h3>
      </div>

      {/* Absolute heart icon button */}
      <button
        onClick={handleSaveClick}
        className={`absolute top-4 right-4 z-10 p-3 rounded-full bg-white/95 text-navy shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 ${
          isBouncing ? 'animate-bounce' : ''
        }`}
        id={`heart-btn-${project.id}`}
        aria-label="Add to Moodboard"
      >
        <Heart
          className={`w-4 h-4 transition-colors duration-300 ${
            isSaved ? 'fill-orange-accent text-orange-accent' : 'text-navy/60 hover:text-navy'
          }`}
        />
      </button>
    </div>
  );
};
