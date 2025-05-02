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
          >
            <span className="relative inline-block">
              {/* <span className="relative z-10">Jacob M.G. Evans</span> */}
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
          
          /* Digital Rain Effect */
          .digital-rain {
            z-index: 5;
            transition: opacity 0.3s;
          }
          
          .digital-rain::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, 
              transparent 0%, 
              rgba(0, 240, 255, 0.2) 80%, 
              #00F0FF 100%);
            mask-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='matrix' width='15' height='15' patternUnits='userSpaceOnUse'%3E%3Ctext x='0' y='15' fill='%2300F0FF' font-family='monospace'%3E0%3C/text%3E%3Ctext x='7' y='9' fill='%2300F0FF' font-family='monospace'%3E1%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='200%25' fill='url(%23matrix)' /%3E%3C/svg%3E");
            animation: digital-rain-fall 2s linear infinite;
            opacity: 0.7;
          }
          
          .digital-rain::after {
            content: "";
            position: absolute;
            top: -100%;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, 
              transparent 0%,
              rgba(0, 107, 255, 0.2) 80%,
              #006BFF 100%);
            mask-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='matrix2' width='13' height='13' patternUnits='userSpaceOnUse'%3E%3Ctext x='0' y='13' fill='%23006BFF' font-family='monospace'%3E1%3C/text%3E%3Ctext x='7' y='7' fill='%23006BFF' font-family='monospace'%3E0%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='200%25' fill='url(%23matrix2)' /%3E%3C/svg%3E");
            animation: digital-rain-fall 1.7s linear infinite;
            animation-delay: 0.3s;
            opacity: 0.6;
          }
          
          /* Cyberpunk 2077 Glitch Effect */
          .cp2077-glitch {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 30;
            overflow: hidden;
          }
          
          .cp2077-text {
            position: relative;
            color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-family: var(--font-heading);
            font-weight: bold;
            letter-spacing: 1px;
            text-shadow: 
              0.03em 0 0 rgba(0, 240, 255, 0.9),
              -0.03em -0.015em 0 rgba(255, 0, 60, 0.9),
              0 0.015em 0 rgba(252, 40, 251, 0.9);
            animation: cp2077-text-glitch 0.42s infinite steps(1);
            transform-origin: center;
          }
          
          .cp2077-text::before, .cp2077-text::after {
            content: "Jacob M.G. Evans";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          
          .cp2077-text::before {
            text-shadow: 
              -0.02em -0.025em 0 rgba(0, 240, 255, 1),
              0.01em 0.005em 0 rgba(255, 0, 60, 0.5);
            animation: cp2077-channel-offset-1 3.14s infinite steps(1);
            clip-path: polygon(
              0% 0%, 100% 0%, 100% 35%, 35% 35%, 35% 40%, 100% 40%, 
              100% 65%, 55% 65%, 55% 70%, 100% 70%, 100% 100%, 0% 100%
            );
          }
          
          .cp2077-text::after {
            text-shadow: 
              0.02em 0.025em 0 rgba(252, 40, 251, 1),
              -0.015em -0.01em 0 rgba(0, 240, 255, 0.5);
            animation: cp2077-channel-offset-2 2.71s infinite steps(1);
            clip-path: polygon(
              0% 0%, 100% 0%, 100% 25%, 45% 25%, 45% 30%, 100% 30%, 
              100% 55%, 25% 55%, 25% 60%, 100% 60%, 100% 100%, 0% 100%
            );
          }
          
          .cp2077-blocks {
            position: absolute;
            inset: 0;
            z-index: 10;
          }
          
          .cp2077-blocks::before, .cp2077-blocks::after {
            content: "";
            position: absolute;
            background: rgba(0, 240, 255, 0.2);
            mix-blend-mode: screen;
          }
          
          .cp2077-blocks::before {
            width: 25%;
            height: 6px;
            top: 45%;
            left: 10%;
            animation: cp2077-block-move-1 2s infinite steps(2);
            box-shadow: 0 0 1px rgba(0, 240, 255, 0.5);
          }
          
          .cp2077-blocks::after {
            width: 15%;
            height: 4px;
            bottom: 35%;
            right: 15%;
            animation: cp2077-block-move-2 1.5s infinite steps(3);
            box-shadow: 0 0 1px rgba(252, 40, 251, 0.5);
            background: rgba(252, 40, 251, 0.2);
          }
          
          .cp2077-scan-data {
            position: absolute;
            inset: 0;
            z-index: 5;
            overflow: hidden;
          }
          
          .cp2077-scan-data::before, .cp2077-scan-data::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
          }
          
          .cp2077-scan-data::before {
            top: 0;
            height: 100%;
            background: repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 2px,
              rgba(0, 240, 255, 0.05) 2px,
              rgba(0, 240, 255, 0.05) 4px
            );
            animation: cp2077-scanlines 10s linear infinite;
          }
          
          .cp2077-scan-data::after {
            top: 0;
            height: 5px;
            background: rgba(252, 40, 251, 0.5);
            animation: cp2077-data-scan 3s cubic-bezier(0.77, 0, 0.18, 1) infinite;
            box-shadow: 0 0 5px rgba(252, 40, 251, 0.7);
          }
          
          @keyframes cp2077-text-glitch {
            0%, 100% { 
              transform: none; 
              opacity: 1;
              text-shadow: 
                0.03em 0 0 rgba(0, 240, 255, 0.9),
                -0.03em -0.015em 0 rgba(255, 0, 60, 0.9),
                0 0.015em 0 rgba(252, 40, 251, 0.9);
            }
            10%, 15% { 
              transform: translate(-2px, 1px); 
              opacity: 0.9;
              text-shadow: 
                0.05em 0 0 rgba(0, 240, 255, 0.9),
                -0.05em -0.025em 0 rgba(255, 0, 60, 0.9),
                0 0.025em 0 rgba(252, 40, 251, 0.9);
            }
            20%, 25% { 
              transform: translate(2px, -2px); 
              opacity: 1;
              text-shadow: 
                -0.05em 0 0 rgba(0, 240, 255, 0.9),
                0.05em 0.025em 0 rgba(255, 0, 60, 0.9),
                0 -0.025em 0 rgba(252, 40, 251, 0.9);
            }
            30%, 35% { 
              transform: translate(0, 0) skewX(5deg); 
              opacity: 0.8;
              text-shadow: 
                0.03em 0 0 rgba(0, 240, 255, 0.9),
                -0.03em -0.015em 0 rgba(255, 0, 60, 0.9),
                0 0.015em 0 rgba(252, 40, 251, 0.9);
            }
            40%, 45% { 
              transform: translate(0, 0) skewX(-5deg); 
              opacity: 1;
              letter-spacing: -1px;
              text-shadow: 
                0.03em 0 0 rgba(0, 240, 255, 0.9),
                -0.03em -0.015em 0 rgba(255, 0, 60, 0.9),
                0 0.015em 0 rgba(252, 40, 251, 0.9);
            }
            50%, 55% { 
              transform: translate(-2px, 1px); 
              opacity: 0.9;
              letter-spacing: 2px;
              text-shadow: 
                0.05em 0 0 rgba(0, 240, 255, 0.9),
                -0.05em -0.025em 0 rgba(255, 0, 60, 0.9),
                0 0.025em 0 rgba(252, 40, 251, 0.9);
            }
            60%, 65% { 
              transform: translate(2px, -1px); 
              opacity: 1;
              letter-spacing: normal;
              text-shadow: 
                -0.05em 0 0 rgba(0, 240, 255, 0.9),
                0.05em 0.025em 0 rgba(255, 0, 60, 0.9),
                0 -0.025em 0 rgba(252, 40, 251, 0.9);
            }
            70%, 75% { 
              transform: translate(0, 0) skewX(-2deg); 
              opacity: 0.8;
              text-shadow: 
                0.03em 0 0 rgba(0, 240, 255, 0.9),
                -0.03em -0.015em 0 rgba(255, 0, 60, 0.9),
                0 0.015em 0 rgba(252, 40, 251, 0.9);
            }
            80%, 85% { 
              transform: translate(0, 0) skewX(2deg); 
              opacity: 1;
              letter-spacing: -1px;
              text-shadow: 
                0.03em 0 0 rgba(0, 240, 255, 0.9),
                -0.03em -0.015em 0 rgba(255, 0, 60, 0.9),
                0 0.015em 0 rgba(252, 40, 251, 0.9);
            }
            90%, 95% { 
              transform: translate(0, 0); 
              opacity: 0.9;
              letter-spacing: normal;
              text-shadow: 
                0.05em 0 0 rgba(0, 240, 255, 0.9),
                -0.05em -0.025em 0 rgba(255, 0, 60, 0.9),
                0 0.025em 0 rgba(252, 40, 251, 0.9);
            }
          }
          
          @keyframes cp2077-channel-offset-1 {
            0%, 100% { 
              opacity: 0.9;
              transform: translate(0, 0);
            }
            10%, 20% { 
              opacity: 1;
              transform: translate(0.15em, 0);
            }
            30%, 40% { 
              opacity: 0.9;
              transform: translate(-0.15em, 0);
            }
            50%, 60% { 
              opacity: 1;
              transform: translate(0, 0.1em);
            }
            70%, 80% { 
              opacity: 0.9;
              transform: translate(0, -0.1em);
            }
            90% { 
              opacity: 1;
              transform: translate(0, 0);
            }
          }
          
          @keyframes cp2077-channel-offset-2 {
            0%, 100% { 
              opacity: 0.9;
              transform: translate(0, 0);
            }
            15%, 25% { 
              opacity: 1;
              transform: translate(-0.1em, 0);
            }
            35%, 45% { 
              opacity: 0.9;
              transform: translate(0.1em, 0);
            }
            55%, 65% { 
              opacity: 1;
              transform: translate(0, -0.08em);
            }
            75%, 85% { 
              opacity: 0.9;
              transform: translate(0, 0.08em);
            }
            95% { 
              opacity: 1;
              transform: translate(0, 0);
            }
          }
          
          @keyframes cp2077-block-move-1 {
            0%, 100% { transform: translateX(0); opacity: 0.6; }
            25% { transform: translateX(40%); opacity: 0.9; }
            50% { transform: translateX(30%); opacity: 0.7; }
            75% { transform: translateX(60%); opacity: 0.8; }
          }
          
          @keyframes cp2077-block-move-2 {
            0%, 100% { transform: translateX(0); opacity: 0.6; }
            20% { transform: translateX(-30%); opacity: 0.8; }
            40% { transform: translateX(-20%); opacity: 0.7; }
            60% { transform: translateX(-50%); opacity: 0.9; }
            80% { transform: translateX(-40%); opacity: 0.8; }
          }
          
          @keyframes cp2077-scanlines {
            0% { background-position: 0 0; }
            100% { background-position: 0 1000px; }
          }
          
          @keyframes cp2077-data-scan {
            0%, 100% { top: -5px; opacity: 0; }
            10% { top: 5%; opacity: 1; }
            90% { top: 95%; opacity: 1; }
          }
          
          @keyframes digital-rain-fall {
            0% {
              transform: translateY(-15%);
            }
            100% {
              transform: translateY(15%);
            }
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
