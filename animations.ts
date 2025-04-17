// Hero animations
function setupHeroAnimations() {
  anime({
    targets: '#hero-title',
    opacity: [0, 1],
    translateY: [50, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 300,
  });

  anime({
    targets: '#hero-subtitle',
    opacity: [0, 1],
    translateY: [30, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 600,
  });

  anime({
    targets: '#hero-badges .tech-badge',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100, { start: 900 }),
    easing: 'easeOutExpo',
    duration: 800,
  });
}

// Fade-in animations with intersection observer
function setupFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.animate-fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// Parallax scrolling effect
function setupParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const mountains = document.querySelector('.parallax-mountains');
    if (mountains) {
      mountains.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  });
}

// Wolf tracks animation
function setupWolfTracksAnimation() {
  const tracks = document.querySelector('.wolf-tracks');
  if (tracks) {
    anime({
      targets: tracks,
      opacity: [0, 0.1],
      easing: 'easeInOutQuad',
      duration: 3000,
    });
  }
}

// Glow effects animations
function setupGlowAnimations() {
  anime({
    targets: '.glow-animate',
    boxShadow: [
      '0 0 0px #8B5CF6, 0 0 0px #3B82F6',
      '0 0 24px #8B5CF6, 0 0 48px #3B82F6',
    ],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 1600,
  });

  anime({
    targets: '.drop-shadow-glow',
    textShadow: [
      '0 0 12px #8B5CF6, 0 0 24px #3B82F6',
      '0 0 32px #8B5CF6, 0 0 64px #3B82F6',
    ],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 1800,
  });
}

function setupNavigation() {
  const headers = document.querySelectorAll('h2');
  headers.forEach((header) => {
    if (header.textContent) {
      if (
        header.textContent.includes('OSS & Community') ||
        header.textContent.includes('OSS Contributions')
      ) {
        header.id = 'oss';
      } else if (header.textContent.toLowerCase().includes('blog')) {
        header.id = 'blog';
      }
    }
  });
}

function initializeAnimations() {
  setupHeroAnimations();
  setupFadeInAnimations();
  setupParallaxEffects();
  setupWolfTracksAnimation();
  setupGlowAnimations();
  setupNavigation();
}

export function animate() {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
}
