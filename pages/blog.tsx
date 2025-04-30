import type { FC } from 'hono/jsx';
import { BackgroundElements } from '../components/background';
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import { BlogComponent } from '../components/blog';
import type { BlogPost } from '../utils/rss';
import { TailwindComponent } from '../components/tailwind';

interface BlogPageProps {
  posts: BlogPost[];
  tailwindScript: string | null;
}

const blogAnimeScript = `
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Blog page loaded, initializing animations...');
    
    // Add cyberpunk grid overlay to certain elements
    const addCyberElements = () => {
      const sections = document.querySelectorAll('.content-section');
      sections.forEach(section => {
        const gridOverlay = document.createElement('div');
        gridOverlay.classList.add('cyber-grid-overlay');
        gridOverlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(#00F0FF 1px, transparent 1px); background-size: 20px 20px; opacity: 0.05; pointer-events: none; z-index: 1;';
        section.appendChild(gridOverlay);
      });
    };
    
    addCyberElements();
    
    // Animate fade-in elements
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    // Parallax effect for mountains/forests
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const mountains = document.querySelector('.parallax-mountains');
      if (mountains) {
        mountains.style.transform = \`translateY(\${scrollY * 0.1}px)\`;
        mountains.style.opacity = Math.max(0.1, Math.min(0.4, 0.1 + (scrollY * 0.0005)));
      }
      
      // Dynamic scanline effect
      const scanlines = document.querySelector('.scanlines');
      if (scanlines) {
        scanlines.style.opacity = Math.max(0.05, Math.min(0.2, 0.05 + (scrollY * 0.0002)));
      }
    });
    
    // Dark forest animation with enhanced effect
    const tracks = document.querySelector('.wolf-tracks');
    if (tracks) {
      anime({
        targets: tracks,
        opacity: [0, 0.15],
        easing: 'easeInOutQuad',
        duration: 3000,
        complete: () => {
          anime({
            targets: tracks,
            opacity: [0.15, 0.05, 0.15],
            easing: 'easeInOutSine',
            duration: 8000,
            loop: true
          });
        }
      });
    }
    
    // glow animations
    anime({
      targets: '.glow-animate',
      boxShadow: [
        '0 0 0px rgba(0, 240, 255, 0.3), 0 0 0px rgba(223, 0, 254, 0.3)',
        '0 0 20px rgba(0, 240, 255, 0.7), 0 0 40px rgba(223, 0, 254, 0.4)'
      ],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000
    });
    
    // Cyberpunk glitch effect for headings
    const glitchElements = document.querySelectorAll('.cyber-glitch');
    glitchElements.forEach(el => {
      el.addEventListener('mouseover', () => {
        anime({
          targets: el,
          skewX: [0, -5, 5, 0],
          translateX: [0, -5, 5, 0],
          color: [
            {value: '#00F0FF', duration: 100, delay: 0},
            {value: '#DF00FE', duration: 100, delay: 100},
            {value: '#39FF14', duration: 100, delay: 200},
            {value: '#FFFFFF', duration: 100, delay: 300}
          ],
          easing: 'steps(1)',
          duration: 500,
          loop: 2
        });
      });
    });
  });
`;

export const BlogPage: FC<BlogPageProps> = ({ posts, tailwindScript }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Jacob M.G. Evans - Blog posts about programming, tech, and more"
        />
        <meta property="og:title" content="Jacob M.G. Evans - Blog" />
        <meta
          property="og:description"
          content="Read Jacob's latest thoughts on programming, open source, and technology."
        />
        <meta property="og:url" content="https://jacobmgevans.com/blog" />
        <meta name="theme-color" content="#0F172A" />
        <title>Jacob M.G. Evans - Blog</title>

        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        <div
          dangerouslySetInnerHTML={{
            __html: TailwindComponent(tailwindScript),
          }}
        />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
      </head>
      <body class="min-h-screen text-gray-100 relative bg-gray-900">
        <BackgroundElements />
        <HeaderComponent />

        <main class="container mx-auto px-4 py-8">
          <div class="py-24">
            <div class="mb-8 text-center">
              <a
                href="/"
                class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                <i class="fas fa-arrow-left mr-2"></i> Back to Home
              </a>
            </div>
            {posts.length > 0 ? (
              <BlogComponent posts={posts} />
            ) : (
              <div class="text-center py-16 animate-fade-in">
                <div class="text-4xl mb-4 text-cyan-400">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p class="text-xl font-rajdhani">Loading blog posts...</p>
              </div>
            )}
          </div>
        </main>

        <FooterComponent />
        <script dangerouslySetInnerHTML={{ __html: blogAnimeScript }} />
      </body>
    </html>
  );
};
