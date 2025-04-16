import { Header } from './header';

export function Hero() {
  return (
    <>
      <Header />
      <div className="hero min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 to-wolf-dark/80"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <h1
            className="text-5xl md:text-6xl font-heading font-bold mb-4 text-white animate-fade-in"
            id="hero-title"
          >
            Jacob M.G. Evans
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in"
            id="hero-subtitle"
          >
            FullStack Engineer, OSS Contributor, Veteran & Outdoor Enthusiast
          </p>
          <div
            className="flex flex-wrap justify-center gap-3 animate-fade-in"
            id="hero-badges"
          >
            <span className="tech-badge px-4 py-2 rounded-full text-sm font-medium">
              JavaScript
            </span>
            <span className="tech-badge px-4 py-2 rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="tech-badge px-4 py-2 rounded-full text-sm font-medium">
              React
            </span>
            <span className="tech-badge px-4 py-2 rounded-full text-sm font-medium">
              Node.js
            </span>
            <span className="tech-badge px-4 py-2 rounded-full text-sm font-medium">
              Open Source
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
