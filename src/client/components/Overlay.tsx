import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import MapWindow, { type UserLocation } from './MapWindow';
import DetailsPanel from './DetailsPanel';
import { animate, stagger } from 'animejs';

const Overlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Real-time list of locations
  const [locations, setLocations] = useState<UserLocation[]>([]);
  // Track which user dot is hovered
  const [selectedUser, setSelectedUser] = useState<UserLocation | null>(null);
  // Current time for HUD header
  const [currentTime, setCurrentTime] = useState(() => new Date());
  // Refs for animation elements
  const overlayRef = useRef<HTMLDivElement>(null);
  const scanLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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
    if (isOpen && overlayRef.current) {
      // Initial glitch effect
      animate(overlayRef.current, {
        opacity: [0, 0.3, 0.1, 0.7, 0.2, 1],
        translateX: ['-5px', '5px', '0px', '-3px', '3px', '0px'],
        translateY: ['3px', '-3px', '0px', '2px', '-2px', '0px'],
        duration: 800,
        easing: 'steps(6)',
      });

      // Scan line animation
      if (scanLinesRef.current) {
        animate(scanLinesRef.current, {
          opacity: [0, 0.3],
          duration: 400,
          easing: 'easeOutQuad',
        });
      }

      // Animate panels with delay
      animate(overlayRef.current, {
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: stagger(150),
        duration: 600,
        easing: 'easeOutExpo',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    // Animate closing with glitch effect
    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [1, 0.7, 0.3, 0.5, 0.1, 0],
        translateX: ['0px', '3px', '-3px', '5px', '-2px'],
        translateY: ['0px', '-2px', '2px', '-4px', '1px'],
        duration: 500,
        easing: 'steps(5)',
        complete: () => {
          setIsOpen(false);
        },
      });
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
      }}
    >
      {/* Cyberpunk HUD grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#F6FF0033_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>

      {/* Scanlines effect */}
      <div
        ref={scanLinesRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.05) 51%, transparent 51%)',
          backgroundSize: '100% 4px',
          opacity: 0.2,
        }}
      ></div>

      {/* Digital noise effect */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

      {/* HUD header */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 text-cyber-yellow font-mono text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 border border-cyber-yellow mr-2"></div>
          <span>SYSTEM: ACTIVE</span>
        </div>
        <div className="text-center uppercase tracking-wider">
          <span className="text-cyber-pink">CYBER</span>
          <span className="text-cyber-blue">SCAN</span>
          <span> v2.77</span>
        </div>
        <div className="flex items-center">
          <span>
            {currentTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
          <div className="w-4 h-4 border border-cyber-yellow ml-2"></div>
        </div>
      </div>

      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-40 h-40">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyber-yellow opacity-60"></div>
          {/* Vertical line */}
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyber-yellow opacity-60"></div>
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-cyber-yellow opacity-60"></div>
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyber-yellow opacity-80"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyber-yellow opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyber-yellow opacity-80"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyber-yellow opacity-80"></div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 text-cyber-pink hover:text-cyber-yellow transition-colors duration-300"
        aria-label="Close Overlay"
      >
        <div className="absolute inset-0 border border-cyber-pink hover:border-cyber-yellow transition-colors duration-300"></div>
        <span className="text-lg font-mono">X</span>
      </button>

      {/* Main content panels */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 h-[80vh]">
          {/* Map panel */}
          <div className="cp-panel relative w-full md:w-2/3 h-1/2 md:h-full bg-black/30 backdrop-blur-sm rounded-none border border-cyber-yellow/60">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyber-yellow"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyber-yellow"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyber-yellow"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyber-yellow"></div>

            {/* Panel header */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-2 border-b border-cyber-yellow/60 bg-black/50 text-cyber-yellow font-mono text-xs uppercase">
              <span>Global Positioning System</span>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyber-yellow animate-pulse"></span>
                <span>Active Users: {locations.length}</span>
              </div>
            </div>

            {/* Moving scan line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-yellow/50 animate-[scan_3s_linear_infinite]"></div>

            {/* Map content */}
            <div className="absolute inset-0 pt-8">
              <MapWindow
                onUserHover={setSelectedUser}
                onLocationsChange={setLocations}
              />
            </div>
          </div>

          {/* Details panel */}
          <div className="cp-panel relative w-full md:w-1/3 h-1/2 md:h-full bg-black/30 backdrop-blur-sm rounded-none border border-cyber-red/60">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyber-red"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyber-red"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyber-red"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyber-red"></div>

            {/* Panel header */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-2 border-b border-cyber-red/60 bg-black/50 text-cyber-red font-mono text-xs uppercase">
              <span>Scan Results</span>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyber-red animate-pulse"></span>
                <span>
                  Status: {selectedUser ? 'Target Acquired' : 'Standby'}
                </span>
              </div>
            </div>

            {/* Moving scan line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-red/50 animate-[scan_4s_linear_infinite]"></div>

            {/* Details content */}
            <div className="absolute inset-0 pt-8">
              <DetailsPanel user={selectedUser} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer status */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 text-cyber-yellow font-mono text-xs">
        <div>SYSTEM: OPERATIONAL</div>
        <div className="text-center">
          <span className="text-cyber-blue">CLOUDFLARE</span> DURABLE OBJECTS:{' '}
          <span className="text-cyber-green">CONNECTED</span>
        </div>
        <div>PING: {Math.floor(Math.random() * 30) + 10}ms</div>
      </div>

      {/* Add keyframe animations */}
      <style>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Overlay;
