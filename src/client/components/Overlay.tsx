import React, { useState, useEffect } from 'react';
import { animate } from 'animejs';
import MapWindow, { UserLocation } from './MapWindow';
import DetailsPanel from './DetailsPanel';

const Overlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Track which user dot is hovered
  const [selectedUser, setSelectedUser] = useState<UserLocation | null>(null);
  // Current time for HUD header
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

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
    <div className="hud-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] animate-fade-in">
      {/* Global scanlines effect */}
      <div className="scanlines"></div>
      {/* Digital rain effect */}
      <div className="digital-rain"></div>
      {/* Center crosshair */}
      <div className="hud-crosshair" />
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-cyber-pink text-2xl font-bold"
        aria-label="Close Overlay"
      >
        ✕
      </button>
      <div className="flex flex-col md:flex-row justify-center items-center h-full px-8 py-16 gap-8">
        {/* Mini-map panel */}
        <div className="hud-panel hud-mini-map-panel relative animate-panel overflow-hidden">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-blue"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-blue"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-blue"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-blue"></div>
          {/* Placeholder background inspired by hud-mini-map-example.webp */}
          <div className="absolute inset-0 bg-[url('/hud-mini-map-example.webp')] bg-cover bg-center opacity-20 pointer-events-none"></div>
          {/* moving scanline bar */}
          <div className="panel-scanline"></div>
          {/* HUD Mini-map Header */}
          <div className="hud-mini-map-header absolute top-2 left-2 right-2 flex justify-between text-xs font-mono text-cyber-yellow z-10">
            <span>MINI-MAP</span>
            <span>
              {currentTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="panel-content relative z-10 w-full h-full">
            <MapWindow onUserHover={setSelectedUser} />
          </div>
        </div>
        {/* Details scan panel */}
        <div className="hud-panel hud-details-panel relative animate-panel overflow-hidden">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-red"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-red"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-red"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-red"></div>
          {/* Placeholder background inspired by hud-scan-example.jpg */}
          <div className="absolute inset-0 bg-[url('/hud-scan-example.jpg')] bg-cover bg-center opacity-10 pointer-events-none filter hue-rotate(-30deg)"></div>
          {/* moving scanline bar */}
          <div className="panel-scanline"></div>
          {/* HUD Details Header */}
          <div className="hud-details-header px-2 py-1 text-xs font-mono text-cyber-red uppercase tracking-wider border-b border-cyber-red/60 z-10">
            DATA
          </div>
          <div className="panel-content relative z-10 overflow-auto h-full">
            <DetailsPanel user={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
