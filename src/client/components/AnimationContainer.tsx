import React, { RefObject, useRef, useState } from 'react';
import { animate, createSpring, createDraggable } from 'animejs';
import { useAnimeScope } from '../hooks/useAnime';

interface AnimationContainerProps {
  className?: string;
}

const AnimationContainer: React.FC<AnimationContainerProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotations, setRotations] = useState(0);

  // Use our anime.js scope hook
  const scopeRef = useAnimeScope(
    containerRef as RefObject<HTMLElement>,
    (self) => {
      // Create a bounce animation loop
      animate('.logo-element', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) },
        ],
        loop: true,
        loopDelay: 250,
      });

      // Make the logo draggable around its center
      createDraggable('.logo-element', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 }),
      });

      // Register function methods to be used outside the useEffect
      self.add('rotateLogo', (i: number) => {
        animate('.logo-element', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });
    },
    []
  );

  const handleClick = () => {
    setRotations((prev) => {
      const newRotations = prev + 1;
      // Animate logo rotation on click using the method declared inside the scope
      if (scopeRef.current && scopeRef.current.methods) {
        scopeRef.current.methods.rotateLogo(newRotations);
      }
      return newRotations;
    });
  };

  return (
    <div ref={containerRef} className={`animation-container ${className}`}>
      <div className="controls">
        <button onClick={handleClick} className="rotate-btn">
          Rotate Logo
        </button>
        <div className="counter">Rotations: {rotations}</div>
      </div>

      <div className="animation-stage">
        <div className="logo-element" />
      </div>
    </div>
  );
};

export default AnimationContainer;
