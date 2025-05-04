import { badge, flex, heading } from '../../../css-utilities';

export function HeroComponent() {
  return (
    <div className="hero min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/90 to-wolf-dark/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.05]"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.07]"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="relative mb-6">
          <h1
            className={`${heading(
              'h1',
              'mb-1'
            )} relative cursor-pointer cyber-text group`}
            id="hero-title"
            data-text="Jacob M.G. Evans"
          >
            <span className="relative inline-block">
              <span className="cyber-glitch absolute inset-0 opacity-0 group-hover:opacity-100 text-cyber-pink pointer-events-none"></span>
              <span className="cyber-scan absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <span className="scan-line"></span>
              </span>
              <span className="digital-rain absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden pointer-events-none"></span>
              <span className="cp2077-glitch absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <span className="cp2077-text">Jacob M.G. Evans</span>
                <span className="cp2077-blocks"></span>
                <span className="cp2077-scan-data"></span>
              </span>
            </span>
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-mountain-blue via-cyber-pink to-mountain-blue"></div>
        </div>

        <p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-sans tracking-wide"
          id="hero-subtitle"
        >
          FullStack Engineer, OSS Contributor, Veteran & Outdoor Enthusiast
        </p>

        <div
          className={flex(
            'row',
            'flex-wrap justify-center gap-3 animate-fade-in'
          )}
          id="hero-badges"
        >
          <span className={badge()}>TypeScript</span>
          <span className={badge()}>Cloudflare</span>
          <span className={badge()}>React</span>
          <span className={badge()}>Node.js</span>
          <span className={badge()}>UX/DX</span>
          <span className={badge()}>Open Source</span>
        </div>

        <div className="mt-10 animate-fade-in relative inline-block cyber-element">
          <button
            id="explore-button"
            type="button"
            className="py-2 px-6 inline-block bg-transparent border border-mountain-blue text-mountain-blue uppercase font-heading text-sm tracking-wider hover:bg-mountain-blue hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.5)]"
          >
            <span>Explore</span>
          </button>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-cyber-pink"></div>
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-cyber-pink"></div>
        </div>
      </div>
    </div>
  );
}
