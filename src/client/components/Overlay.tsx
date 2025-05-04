import React, { useState, useEffect } from 'react';
import { animate } from 'animejs';
import MapWindow from './MapWindow';
import DetailsPanel from './DetailsPanel';

const Overlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for Explore button clicks to open the overlay
  useEffect(() => {
    const exploreButton = document.getElementById('explore-button');
    if (!exploreButton) return;
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);
    };
    exploreButton.addEventListener('click', handleClick);
    return () => {
      exploreButton.removeEventListener('click', handleClick);
    };
  }, []);

  // Animate overlay when it opens
  useEffect(() => {
    if (isOpen) {
      animate('.hud-overlay', {
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 500,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    // Animate closing before hiding
    animate('.hud-overlay', {
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 300,
      complete: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="hud-overlay fixed inset-0 bg-black/80 backdrop-blur-lg z-[9999] opacity-0">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-cyber-pink text-2xl font-bold"
        aria-label="Close Overlay"
      >
        ✕
      </button>
      <div className="flex flex-col md:flex-row justify-between items-start h-full p-8 space-y-4 md:space-y-0 md:space-x-4">
        <MapWindow />
        <DetailsPanel />
      </div>
    </div>
  );
};

export default Overlay;
