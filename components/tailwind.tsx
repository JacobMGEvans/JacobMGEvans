export function TailwindComponent(tailwindScript: string | null) {
  return `
  <script>${tailwindScript ?? ''}</script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            wolf: {
              gray: '#4B5563',
              dark: '#1E1E2F',
              light: '#9CA3AF'
            },
            forest: {
              green: '#182428',
              light: '#293D36',
              dark: '#0C1A15'
            },
            mountain: {
              blue: '#00F0FF',
              purple: '#DF00FE'
            },
            cyber: {
              pink: '#FC28FB',
              blue: '#03EDF9',
              yellow: '#FEF851',
              green: '#39FF14',
              red: '#FF003C'
            }
          },
          fontFamily: {
            sans: ['Rajdhani', 'sans-serif'],
            heading: ['Orbitron', 'sans-serif'],
            body: ['Poppins', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Rajdhani', sans-serif;
      background-color: #0F172A;
      background-image: url('https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg');
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      position: relative;
      overflow-x: hidden;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(7, 10, 25, 0.85));
      z-index: -1;
    }
    
    .content-section {
      backdrop-filter: blur(10px);
      background-color: rgba(30, 30, 47, 0.7);
      border-left: 4px solid #DF00FE;
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
      position: relative;
      overflow: hidden;
    }
    
    .content-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 2px,
        rgba(0, 240, 255, 0.05) 2px,
        rgba(0, 240, 255, 0.05) 4px
      );
      pointer-events: none;
    }
    
    .wolf-tracks {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.1;
      background-image: url('https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg');
      background-repeat: repeat;
      filter: brightness(1.2) contrast(1.2);
    }
    
    .animate-fade-in {
      opacity: 0;
      transform: translateY(20px);
    }
    
    .nav-link {
      position: relative;
      overflow: hidden;
      font-family: 'Orbitron', sans-serif;
      letter-spacing: 1px;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00F0FF, #DF00FE);
      transition: width 0.3s ease;
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
    
    .tech-badge {
      background: linear-gradient(135deg, #00F0FF, #DF00FE);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }
    
    .tech-badge::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }
    
    .tech-badge:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.7);
    }
    
    .parallax-mountains {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 25vh;
      background-image: url('https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/mountains-silhouette.webp');
      background-size: cover;
      background-position: bottom;
      z-index: -2;
      opacity: 0.4;
      filter: hue-rotate(220deg) saturate(1.5);
    }
    
    .parallax-mountains::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 240, 255, 0.2), transparent);
      pointer-events: none;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .blog-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid rgba(0, 240, 255, 0.2);
      background: rgba(30, 30, 47, 0.7);
      backdrop-filter: blur(10px);
    }
    
    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
      border-color: rgba(223, 0, 254, 0.4);
    }
    
    .wolf-icon {
      filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.7));
    }
    
    .cyberpunk-heading {
      position: relative;
      text-transform: uppercase;
      font-family: 'Orbitron', sans-serif;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.7);
    }
    
    .cyber-glitch {
      position: relative;
      animation: glitch 2s infinite;
      top: -40px;
    }
    
    @keyframes glitch {
      0% { text-shadow: 0.05em 0 0 rgba(255, 0, 60, 0.75), -0.05em -0.025em 0 rgba(0, 240, 255, 0.75); }
      14% { text-shadow: 0.05em 0 0 rgba(255, 0, 60, 0.75), -0.05em -0.025em 0 rgba(0, 240, 255, 0.75); }
      15% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 60, 0.75), 0.025em 0.025em 0 rgba(0, 240, 255, 0.75); }
      49% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 60, 0.75), 0.025em 0.025em 0 rgba(0, 240, 255, 0.75); }
      50% { text-shadow: 0.025em 0.05em 0 rgba(255, 0, 60, 0.75), 0.05em 0 0 rgba(0, 240, 255, 0.75); }
      99% { text-shadow: 0.025em 0.05em 0 rgba(255, 0, 60, 0.75), 0.05em 0 0 rgba(0, 240, 255, 0.75); }
      100% { text-shadow: -0.025em 0 0 rgba(255, 0, 60, 0.75), -0.025em -0.025em 0 rgba(0, 240, 255, 0.75); }
    }
    
    .scanlines {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.02) 51%,
        transparent 51%
      );
      background-size: 100% 4px;
      z-index: 9999;
      pointer-events: none;
      opacity: 0.15;
    }
    
    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 200px;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Orbitron', sans-serif;
      letter-spacing: 1px;
    }
    
    /* Enhance tech badge appearance */
    .tech-badge {
      font-family: 'Rajdhani', sans-serif;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    /* Scanlines effect */
    .scanlines {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.02) 51%,
        transparent 51%
      );
      background-size: 100% 4px;
      z-index: 9999;
      pointer-events: none;
      opacity: 0.15;
    }
    
    /* Glitch effect for hover states */
    .hover-glitch:hover {
      animation: glitch 0.5s infinite;
    }
  </style>
  <title>Jacob M.G. Evans - Egnineer, Veteran & Outdoor Enthusiast</title>
`;
}
