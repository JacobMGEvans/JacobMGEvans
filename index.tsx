import { Hono } from 'hono';
import { jsx, Fragment } from 'hono/jsx';
import { cache } from 'hono/cache';
import type { KVNamespace } from '@cloudflare/workers-types';
import type { FC, PropsWithChildren } from 'hono/jsx';

// Import components
import { HeaderComponent } from './components/header';
import { HeroComponent } from './components/hero';
import { AboutSectionComponent } from './components/about';
import { FooterComponent } from './components/footer';
import { OutdoorSectionComponent } from './components/outdoor';
import { OssSectionComponent } from './components/open-source';
import { createHeadContent } from './components/helmet';

// Define environment interface
interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

// Create Hono app
const app = new Hono<{ Bindings: Env }>();

// Handle webhook endpoint
app.post('/webhook', async (c) => {
  const body = await c.req.json();
  if (body.challenge) {
    return c.text(body.challenge);
  }
  return c.json(body);
});

// We'll just comment out serveStatic since it's causing type issues
// app.use('/public/*', serveStatic());

// Cache static assets
app.use(
  '/static/*',
  cache({ cacheName: 'assets', cacheControl: 'max-age=3600' })
);

// Background Elements Component
const BackgroundElements: FC = () => (
  <>
    <div class="wolf-tracks"></div>
    <div class="parallax-mountains"></div>
  </>
);

// Client-side animation script
const animeScript = `
  document.addEventListener('DOMContentLoaded', () => {
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
    
    // Parallax effect for mountains
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const mountains = document.querySelector('.parallax-mountains');
      if (mountains) {
        mountains.style.transform = \`translateY(\${scrollY * 0.1}px)\`;
      }
    });
    
    // Wolf tracks animation
    const tracks = document.querySelector('.wolf-tracks');
    if (tracks) {
      anime({
        targets: tracks,
        opacity: [0, 0.1],
        easing: 'easeInOutQuad',
        duration: 3000
      });
    }
    
    // Glow animations
    anime({
      targets: '.glow-animate',
      boxShadow: [
        '0 0 0px #8B5CF6, 0 0 0px #3B82F6',
        '0 0 24px #8B5CF6, 0 0 48px #3B82F6'
      ],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 1600
    });
    
    anime({
      targets: '.drop-shadow-glow',
      textShadow: [
        '0 0 12px #8B5CF6, 0 0 24px #3B82F6',
        '0 0 32px #8B5CF6, 0 0 64px #3B82F6'
      ],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 1800
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

// Layout Component types
interface LayoutProps extends PropsWithChildren {
  tailwindScript: string | null;
  imageLinks: string[];
}

// Layout Component
const Layout: FC<LayoutProps> = ({ children, tailwindScript, imageLinks }) => {
  const headContent = createHeadContent(tailwindScript);

  return (
    <html lang="en">
      <head>
        <div dangerouslySetInnerHTML={{ __html: headContent }} />
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

// App Component types
interface AppProps {
  readme: string;
  tailwindScript: string | null;
}

const App: FC<AppProps> = ({ readme, tailwindScript }) => {
  const additionalImages = [
    'https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg',
    'https://img.freepik.com/premium-photo/wolf-wolf-silhouette-dark-fantasy-forest-wolf_1168123-40178.jpg',
    'https://pbs.twimg.com/media/GTnMCppa4AEqRtH?format=jpg&name=large',
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

// Main route
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

    // Fetched README HTML content from GitHub
    const githubResponse = await fetch(
      'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.html'
    );
    const markdown = await githubResponse.text();
    const cleanedMarkdown = markdown.replace(/404:?\s*Not Found/gi, '').trim();

    // Use Hono's jsx rendering
    return c.html(
      <App readme={cleanedMarkdown} tailwindScript={tailwindScript} />
    );
  }
);

// Hono recommended way for Workers
const handler = {
  fetch: app.fetch,
};

export default handler;
