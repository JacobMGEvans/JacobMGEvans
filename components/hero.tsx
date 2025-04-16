import { badge, flex, heading } from '../css-utilities';

export function HeroComponent() {
  return (
    <div class="hero min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-forest-dark/80 to-wolf-dark/80"></div>
      </div>

      <div class="container mx-auto px-4 z-10 text-center">
        <h1 class={heading('h1', 'mb-4 animate-fade-in')} id="hero-title">
          Jacob M.G. Evans
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in"
          id="hero-subtitle"
        >
          FullStack Egnineer, OSS Contributor, Veteran & Outdoor Enthusiast
        </p>
        <div
          class={flex('row', 'flex-wrap justify-center gap-3 animate-fade-in')}
          id="hero-badges"
        >
          <span class={badge()}>TypeScript</span>
          <span class={badge()}>React</span>
          <span class={badge()}>Node.js</span>
          <span class={badge()}>UX/DX</span>
          <span class={badge()}>Open Source</span>
        </div>
      </div>
    </div>
  );
}
