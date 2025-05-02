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
            )} relative cursor-pointer cyber-text`}
            id="hero-title"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Jacob M.G. Evans</span>
              <span className="cyber-glitch absolute inset-0 opacity-0 hover:opacity-100 text-cyber-pink"></span>
              <span className="cyber-scan absolute inset-0 opacity-0 hover:opacity-100">
                <span className="scan-line"></span>
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
          <a
            href="#about"
            className="py-2 px-6 inline-block bg-transparent border border-mountain-blue text-mountain-blue uppercase font-heading text-sm tracking-wider hover:bg-mountain-blue hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.5)]"
          >
            <span>Explore</span>
          </a>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-cyber-pink"></div>
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-cyber-pink"></div>
        </div>
      </div>

      <style>
        {`
          .cyber-text {
            transition: color 0.3s;
          }
          
          .cyber-text:hover {
            color: transparent;
            background-clip: text;
            background-image: linear-gradient(to right, #00F0FF, #FF003C);
            animation: gradient-shift 8s ease-in-out infinite;
          }
          
          .cyber-glitch {
            content: "Jacob M.G. Evans";
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s;
            animation: text-color-cycle 8s ease-in-out infinite;
            z-index: 15;
          }
          
          .cyber-glitch::before, .cyber-glitch::after {
            content: "Jacob M.G. Evans";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .cyber-glitch::before {
            animation: glitch-scan-with-calm 8s ease-in-out infinite;
            color: #00F0FF;
            clip-path: inset(0 0 0 0);
            z-index: 5;
          }
          
          .cyber-glitch::after {
            animation: glitch-scan-reverse-with-calm 8s ease-in-out infinite;
            color: #FF003C;
            clip-path: inset(0 0 0 0);
            z-index: 10;
            animation-delay: 0.2s;
          }
          
          .cyber-scan {
            transition: opacity 0.3s;
            z-index: 20;
          }
          
          .scan-line {
            position: absolute;
            height: 2px;
            width: 100%;
            background: rgba(0, 240, 255, 0.6);
            animation: scan-move-with-calm 8s ease-in-out infinite;
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-image: linear-gradient(to right, #00F0FF, #FF003C); }
            25%, 75% { background-image: linear-gradient(to right, #00F0FF, #FF003C); }
            45%, 55% { background-image: linear-gradient(to right, #00F0FF, #006BFF); opacity: 0.8; }
          }
          
          @keyframes text-color-cycle {
            0%, 15%, 85%, 100% { animation-timing-function: steps(1, end); }
            0%, 100% { color: #00F0FF; }
            25% { color: #FF003C; }
            45%, 55% { color: #006BFF; animation-timing-function: ease; }
            75% { color: #FF003C; }
          }
          
          @keyframes glitch-scan-with-calm {
            /* Intense glitch period */
            0%, 10% { clip-path: inset(0 0 0 0); transform: none; opacity: 0.7; }
            2% { clip-path: inset(15% 0 25% 0); transform: translate(-2px, 2px); opacity: 0.7; }
            4% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); opacity: 0.8; }
            6% { clip-path: inset(35% 0 15% 0); transform: translate(0, 2px); opacity: 0.6; }
            8% { clip-path: inset(58% 0 45% 0); transform: translate(-2px, -2px); opacity: 0.9; }
            
            /* Calmer period */
            40%, 60% { 
              clip-path: inset(0 0 0 0); 
              transform: translate(0, 0); 
              opacity: 0.5; 
              color: #006BFF;
            }
            45%, 55% { 
              clip-path: inset(0 0 95% 0); 
              transform: translate(0, 0); 
              opacity: 0.3;
              color: #006BFF;
            }
            50% { 
              clip-path: inset(95% 0 0 0); 
              transform: translate(0, 0); 
              opacity: 0.3;
              color: #00F0FF;
            }
            
            /* Intense glitch period */
            80%, 90% { clip-path: inset(0 0 0 0); transform: none; opacity: 0.7; }
            82% { clip-path: inset(58% 0 45% 0); transform: translate(-2px, -2px); opacity: 0.9; }
            84% { clip-path: inset(75% 0 5% 0); transform: translate(2px, 2px); opacity: 0.7; }
            86% { clip-path: inset(15% 0 95% 0); transform: translate(-2px, 0); opacity: 0.8; }
            88% { clip-path: inset(45% 0 65% 0); transform: translate(-2px, 2px); opacity: 0.7; }
            
            /* Loop smoothly */
            100% { clip-path: inset(0 0 0 0); transform: none; opacity: 0.7; }
          }
          
          @keyframes glitch-scan-reverse-with-calm {
            /* Intense glitch period */
            0%, 10% { clip-path: inset(0 0 0 0); transform: none; opacity: 0.7; }
            3% { clip-path: inset(25% 0 15% 0); transform: translate(2px, -2px); opacity: 0.8; }
            5% { clip-path: inset(35% 0 25% 0); transform: translate(-2px, 2px); opacity: 0.7; }
            7% { clip-path: inset(15% 0 35% 0); transform: translate(2px, 0); opacity: 0.9; }
            9% { clip-path: inset(45% 0 85% 0); transform: translate(0, -2px); opacity: 0.6; }
            
            /* Calmer period */
            40%, 60% { 
              clip-path: inset(0 0 0 0); 
              transform: translate(0, 0); 
              opacity: 0.5; 
              color: #006BFF;
            }
            47%, 53% { 
              clip-path: inset(90% 0 0 0); 
              transform: translate(0, 0); 
              opacity: 0.4;
              color: #00F0FF;
            }
            50% { 
              clip-path: inset(0 0 90% 0); 
              transform: translate(0, 0); 
              opacity: 0.4;
              color: #006BFF;
            }
            
            /* Intense glitch period */
            80%, 90% { clip-path: inset(0 0 0 0); transform: none; opacity: 0.7; }
            83% { clip-path: inset(85% 0 5% 0); transform: translate(-2px, 2px); opacity: 0.8; }
            85% { clip-path: inset(95% 0 15% 0); transform: translate(2px, -2px); opacity: 0.7; }
            87% { clip-path: inset(5% 0 95% 0); transform: translate(-2px, 0); opacity: 0.9; }
            89% { clip-path: inset(95% 0 5% 0); transform: translate(0, 2px); opacity: 0.6; }
            
            /* Loop smoothly */
            100% { clip-path: inset(0 0 0 0); transform: none; opacity: 0.7; }
          }
          
          @keyframes scan-move-with-calm {
            /* Normal scan */
            0%, 20% { top: -10%; opacity: 0.6; height: 2px; }
            20% { top: 110%; opacity: 0.6; height: 2px; }
            
            /* Calmer scan */
            40%, 60% { 
              top: 50%; 
              opacity: 0.3; 
              height: 1px;
              background: rgba(0, 107, 255, 0.4);
            }
            50% { 
              top: 50%; 
              opacity: 0.4; 
              height: 1px;
              box-shadow: 0 0 10px #00F0FF;
              background: rgba(0, 240, 255, 0.3);
            }
            
            /* Normal scan */
            70%, 90% { top: -10%; opacity: 0.6; height: 2px; background: rgba(0, 240, 255, 0.6); }
            90% { top: 110%; opacity: 0.6; }
            
            /* Loop smoothly */
            100% { top: -10%; opacity: 0.6; height: 2px; }
          }
        `}
      </style>
    </div>
  );
}
