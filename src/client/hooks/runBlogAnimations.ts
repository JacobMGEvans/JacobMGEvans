import { animate } from 'animejs';

// TODO: A lot of Blog animation is redundant to the homepage animations, refactor later
export default function runBlogAnimations() {
  console.log('Blog page loaded, initializing animations...');

  document.querySelectorAll('.content-section').forEach((section) => {
    const gridOverlay = document.createElement('div');
    gridOverlay.classList.add('grid-overlay');
    section.appendChild(gridOverlay);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800,
          });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll<HTMLElement>('.animate-fade-in')
    .forEach((el) => observer.observe(el));

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const mountains = document.querySelector('.parallax-mountains');
    if (mountains instanceof HTMLElement) {
      mountains.style.transform = `translateY(${scrollY * 0.1}px)`;
      mountains.style.opacity = String(
        Math.max(0.1, Math.min(0.4, 0.1 + scrollY * 0.0005))
      );
    }
    const scanlines = document.querySelector('.scanlines');
    if (scanlines instanceof HTMLElement) {
      scanlines.style.opacity = String(
        Math.max(0.05, Math.min(0.2, 0.05 + scrollY * 0.0002))
      );
    }
  });

  const tracks = document.querySelector('.wolf-tracks');
  if (tracks instanceof HTMLElement) {
    animate(tracks, {
      opacity: [0, 0.15],
      easing: 'easeInOutQuad',
      duration: 3000,
      complete: () => {
        animate(tracks, {
          opacity: [0.15, 0.05, 0.15],
          easing: 'easeInOutSine',
          duration: 8000,
          loop: true,
        });
      },
    });
  }

  animate('.glow-animate', {
    boxShadow: [
      '0 0 0px rgba(0, 240, 255, 0.3), 0 0 0px rgba(223, 0, 254, 0.3)',
      '0 0 20px rgba(0, 240, 255, 0.7), 0 0 40px rgba(223, 0, 254, 0.4)',
    ],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 2000,
  });

  document.querySelectorAll<HTMLElement>('.cyber-glitch').forEach((el) => {
    el.addEventListener('mouseover', () => {
      animate(el, {
        skewX: [0, -5, 5, 0],
        translateX: [0, -5, 5, 0],
        color: [
          { value: '#00F0FF', duration: 100, delay: 0 },
          { value: '#DF00FE', duration: 100, delay: 100 },
          { value: '#39FF14', duration: 100, delay: 200 },
          { value: '#FFFFFF', duration: 100, delay: 300 },
        ],
        easing: 'steps(1)',
        duration: 500,
        loop: 2,
      });
    });
  });
}
