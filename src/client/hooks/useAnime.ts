import { useEffect, useRef } from 'react';
import { createScope } from 'animejs';

/**
 * A hook that uses anime.js v4's scope functionality
 * @param rootRef - Reference to the root element
 * @param setupFn - Function to set up animations within the scope
 * @param dependencies - Dependencies array to control when animation runs
 */
export function useAnimeScope(
  rootRef: React.RefObject<HTMLElement>,
  setupFn: (scope: any) => void,
  dependencies: any[] = []
) {
  const scopeRef = useRef<any>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || !rootRef.current) return;

    // Create new scope
    scopeRef.current = createScope({ root: rootRef }).add(setupFn);

    // Cleanup function
    return () => {
      if (scopeRef.current && scopeRef.current.revert) {
        scopeRef.current.revert();
      }
    };
  }, dependencies);

  return scopeRef;
}
