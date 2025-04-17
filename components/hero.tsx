import { badge, flex, heading } from '../css-utilities';

export function HeroComponent() {
  return (
    <div class="hero min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-forest-dark/90 to-wolf-dark/90"></div>
        {/* Cyberpunk grid overlay */}
        <div class="absolute inset-0 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.05]"></div>
        {/* Digital noise */}
        <div class="absolute inset-0 bg-noise opacity-[0.07]"></div>
      </div>

      <div class="container mx-auto px-4 z-10 text-center">
        <div class="relative mb-6">
          <h1 class={heading('h1', 'mb-1')} id="hero-title">
            Jacob M.G. Evans
          </h1>
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-mountain-blue via-cyber-pink to-mountain-blue"></div>
        </div>

        <p
          class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-sans tracking-wide"
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

        <div class="mt-10 animate-fade-in relative inline-block cyber-element">
          <a
            href="#about"
            class="py-2 px-6 inline-block bg-transparent border border-mountain-blue text-mountain-blue uppercase font-heading text-sm tracking-wider hover:bg-mountain-blue hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.5)]"
          >
            <span>Explore</span>
          </a>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-cyber-pink"></div>
          <div class="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-cyber-pink"></div>
        </div>
      </div>
    </div>
  );
}
