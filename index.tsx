import { Hono } from 'hono';
import { cache } from 'hono/cache';
import type { KVNamespace } from '@cloudflare/workers-types';
import type { FC, PropsWithChildren } from 'hono/jsx';

import { HeaderComponent } from './components/header';
import { HeroComponent } from './components/hero';
import { AboutSectionComponent } from './components/about';
import { FooterComponent } from './components/footer';
import { OutdoorSectionComponent } from './components/outdoor';
import { OssSectionComponent } from './components/open-source';
import { TailwindComponent } from './components/tailwind';

interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

app.post('/webhook', async (c) => {
  const body = await c.req.json();
  if (body.challenge) {
    return c.text(body.challenge);
  }
  return c.json(body);
});

app.use(
  '/static/*',
  cache({ cacheName: 'assets', cacheControl: 'max-age=3600' })
);

app.get('/robots.txt', (c) => {
  return c.text(
    `User-agent: *
  Allow: /
  Disallow: /webhook

  Sitemap: https://jacobmgevans.com/sitemap.xml`,
    200,
    { 'Content-Type': 'text/plain' }
  );
});

const BackgroundElements: FC = () => (
  <>
    <div class="wolf-tracks"></div>
    <div class="parallax-mountains"></div>
    <div class="scanlines"></div>
  </>
);

const animeScript = `
  document.addEventListener('DOMContentLoaded', () => {
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
    
    // Hero animations
    anime({
      targets: '#hero-title',
      opacity: [0, 1],
      translateY: [50, 0],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: 300
    });
    
    anime({
      targets: '#hero-subtitle',
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: 600
    });
    
    anime({
      targets: '#hero-badges .tech-badge',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, {start: 900}),
      easing: 'easeOutExpo',
      duration: 800
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
    
    // Animated fade-in elements
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
    
    // Enhanced parallax effect for mountains
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
    
    // Wolf tracks animation with enhanced effect
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
    
    // Enhanced glow animations
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
    
    anime({
      targets: '.drop-shadow-glow',
      textShadow: [
        '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(223, 0, 254, 0.3)',
        '0 0 20px rgba(0, 240, 255, 0.8), 0 0 30px rgba(223, 0, 254, 0.5)'
      ],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000
    });
    
    // Random "digital noise" flicker effect for tech elements
    const flickerElements = document.querySelectorAll('.tech-badge, .cyber-element');
    flickerElements.forEach(el => {
      setInterval(() => {
        if (Math.random() > 0.9) {
          el.style.opacity = '0.7';
          setTimeout(() => {
            el.style.opacity = '1';
          }, 100);
        }
      }, 2000);
    });
    
    // Add IDs to important sections for navigation
    const headers = document.querySelectorAll('h2');
    headers.forEach(header => {
      if (header.textContent) {
        if (header.textContent.includes('OSS & Community') || header.textContent.includes('OSS Contributions')) {
          header.id = 'oss';
        } else if (header.textContent.toLowerCase().includes('blog')) {
          header.id = 'blog';
        }
      }
    });
  });
`;

interface LayoutProps extends PropsWithChildren {
  tailwindScript: string | null;
  imageLinks: string[];
}

const Layout: FC<LayoutProps> = ({ children, tailwindScript, imageLinks }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Jacob M.G. Evans - FullStack Developer, OSS Contributor, Veteran, and Outdoor Enthusiast"
        />
        <meta property="og:title" content="Jacob M.G. Evans Profile" />
        <meta
          property="og:description"
          content="Discover Jacob's projects, contributions, and professional journey."
        />
        <meta property="og:url" content="https://jacobmgevans.com" />
        <meta name="theme-color" content="#0F172A" />
        <title>Jacob M.G. Evans - Engineer, Veteran & Outdoor Enthusiast</title>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
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
        {imageLinks.map((src, i) => (
          <link key={i} rel="preload" as="image" href={src} />
        ))}
      </head>
      <body class="min-h-screen text-gray-100 relative">
        {children}
        <script dangerouslySetInnerHTML={{ __html: animeScript }} />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" />
      </body>
    </html>
  );
};

interface AppProps {
  readme: string;
  tailwindScript: string | null;
}

const App: FC<AppProps> = ({ readme, tailwindScript }) => {
  const additionalImages = [
    'https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg',
    'https://img.freepik.com/premium-photo/wolf-wolf-silhouette-dark-fantasy-forest-wolf_1168123-40178.jpg',
    'https://pbs.twimg.com/media/GTnMCppa4AEqRtH?format=jpg&name=large',
    '', // Cyberpunk city
    'https://images.pexels.com/photos/4394104/pexels-photo-4394104.jpeg', // mountain waterfall
  ];

  return (
    <Layout tailwindScript={tailwindScript} imageLinks={additionalImages}>
      <BackgroundElements />
      <HeaderComponent />
      <HeroComponent />

      <main class="container mx-auto px-4 py-8">
        <AboutSectionComponent />
        <OssSectionComponent />
        <OutdoorSectionComponent />

        {/* Render the README content if needed */}
        {readme && (
          <section
            class="content-section max-w-4xl mx-auto my-12 p-8 rounded-lg shadow-xl animate-fade-in"
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        )}
      </main>

      <FooterComponent />
    </Layout>
  );
};

app.get(
  '*',
  cache({
    cacheName: 'site-cache',
    cacheControl: 'public, max-age=60, stale-while-revalidate=30',
  }),
  async (c) => {
    const { KV_TAILWIND, TAILWIND_URL, KV_KEY } = c.env;

    // KV caching for Tailwind from CDN
    let tailwindScript = await KV_TAILWIND.get(KV_KEY);
    if (!tailwindScript) {
      const response = await fetch(TAILWIND_URL);
      if (response.ok) {
        tailwindScript = await response.text();
        await KV_TAILWIND.put(KV_KEY, tailwindScript);
      }
    }

    const githubResponse = await fetch(
      'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.html'
    );
    const markdown = await githubResponse.text();
    const cleanedMarkdown = markdown.replace(/404:?\s*Not Found/gi, '').trim();

    return c.html(
      `<!DOCTYPE html>
      ${(<App readme={cleanedMarkdown} tailwindScript={tailwindScript} />)}`,
      200,
      { 'Content-Type': 'text/html' }
    );
  }
);

const handler = {
  fetch: app.fetch,
};

export default handler;
