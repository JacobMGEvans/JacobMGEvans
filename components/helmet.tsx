export function createHeadContent(tailwindScript: string | null) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Jacob M.G. Evans - FullStack Developer, OSS Contributor, Veteran, and Outdoor Enthusiast">
  <meta property="og:title" content="Jacob M.G. Evans Profile">
  <meta property="og:description" content="Discover Jacob's projects, contributions, and professional journey.">
  <meta property="og:url" content="https://jacobmgevans.com">
  <meta name="theme-color" content="#1F2937">
  <!-- Tailwind CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <script>${tailwindScript ?? ''}</script>
  <!-- Anime.js for animations -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            wolf: {
              gray: '#4B5563',
              dark: '#1F2937',
              light: '#9CA3AF'
            },
            forest: {
              green: '#2D3B36',
              light: '#3B5249',
              dark: '#1A2421'
            },
            mountain: {
              blue: '#3B82F6',
              purple: '#8B5CF6'
            }
          },
          fontFamily: {
            sans: ['Poppins', 'sans-serif'],
            heading: ['Montserrat', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #1F2937;
      background-image: url('https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg');
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      position: relative;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.8));
      z-index: -1;
    }
    
    .content-section {
      backdrop-filter: blur(5px);
      background-color: rgba(31, 41, 55, 0.8);
      border-left: 4px solid #8B5CF6;
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
    }
    
    .animate-fade-in {
      opacity: 0;
      transform: translateY(20px);
    }
    
    .nav-link {
      position: relative;
      overflow: hidden;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #8B5CF6;
      transition: width 0.3s ease;
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
    
    .tech-badge {
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .tech-badge:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    }
    
    .parallax-mountains {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 15vh;
      background-image: url('https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/mountains-silhouette.webp');
      background-size: cover;
      background-position: bottom;
      z-index: -2;
      opacity: 0.2;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .blog-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }
    
    .wolf-icon {
      filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.5));
    }
  </style>
  <title>Jacob M.G. Evans - Egnineer, Veteran & Outdoor Enthusiast</title>
`;
}
