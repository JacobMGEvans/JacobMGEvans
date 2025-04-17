import {
  type KVNamespace,
  type ExportedHandler,
} from '@cloudflare/workers-types';
import { heading, link } from './css-utilities';
import { HeaderComponent } from './components/header';
import { HeroComponent } from './components/hero';
import { AboutSectionComponent } from './components/about';
import { createHeadContent } from './components/helmet';
import { FooterComponent } from './components/footer';
import { OutdoorSectionComponent } from './components/outdoor';
import { OssSectionComponent } from './components/open-source';

interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

const BackgroundElements = () => `
  <div class="wolf-tracks"></div>
  <div class="parallax-mountains"></div>
`;

const initializeAnimations = () => `
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
    
    // Find all direct children of body that aren't our custom elements
    const bodyChildren = Array.from(document.body.children);
    const customElements = [
      document.querySelector('header'),
      document.querySelector('.hero'),
      document.querySelector('main'),
      document.querySelector('footer'),
      document.querySelector('.wolf-tracks'),
      document.querySelector('.parallax-mountains'),
      document.querySelector('script'),  // Exclude script tags
      document.querySelector('style')    // Exclude style tags
    ];
    
    // Filter out our custom elements and any error messages to get only the README content
    const readmeElements = bodyChildren.filter(el => {
      // Skip null elements and our custom elements
      if (!el || customElements.includes(el)) return false;
      // Skip any error messages (like 404)
      if (el.textContent && el.textContent.includes('404')) return false;
      return true;
    });
  });
`;

/**
 *  Element transformer factory
 */
const createElementTransformers = (
  imageUrls: Set<string>,
  tailwindScript: string | null = null
) => {
  return {
    headTransformer: {
      element(element: any) {
        element.setInnerContent(createHeadContent(tailwindScript), {
          html: true,
        });
      },
    },
    bodyTransformer: {
      element(element: any) {
        element.prepend(createBodyContent(), { html: true });
        element.setAttribute('class', 'min-h-screen text-gray-100 relative');
      },
    },
    h1Transformer: {
      element(element: any) {
        element.setAttribute('class', heading('h1', 'my-6'));
      },
    },
    h2Transformer: {
      element(element: any) {
        element.setAttribute('class', heading('h2', 'my-5'));
      },
    },
    h3Transformer: {
      element(element: any) {
        element.setAttribute('class', heading('h3', 'my-4'));
      },
    },
    pTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'text-lg text-gray-300 my-4 leading-relaxed'
        );
      },
    },
    imgTransformer: {
      element(element: any) {
        const src = element.getAttribute('src');
        if (src) {
          if (
            src.startsWith(
              'https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/'
            )
          ) {
            imageUrls.add(src);
          }
          element.setAttribute('loading', 'lazy');
          element.setAttribute('decoding', 'async');
          element.setAttribute(
            'class',
            'rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl'
          );
        }
      },
    },
    linkTransformer: {
      element(element: any) {
        element.setAttribute('class', link());
      },
    },
    sectionTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'content-section max-w-4xl mx-auto my-12 p-8 rounded-lg shadow-xl animate-fade-in'
        );
      },
    },
    detailsTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'bg-forest-dark p-4 rounded-lg my-4 border border-gray-700 transition-all duration-300 hover:border-mountain-purple'
        );
      },
    },
    summaryTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'cursor-pointer font-semibold text-mountain-blue hover:text-mountain-purple transition-colors duration-300'
        );
      },
    },
    ulTransformer: {
      element(element: any) {
        element.setAttribute('class', 'space-y-2 my-4');
      },
    },
    liTransformer: {
      element(element: any) {
        element.setAttribute('class', 'text-gray-300');
      },
    },
    blockquoteTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'border-l-4 border-mountain-purple pl-4 my-4 italic text-gray-400'
        );
      },
    },
    codeTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'bg-gray-800 text-gray-300 px-1 py-0.5 rounded text-sm'
        );
      },
    },
    preTransformer: {
      element(element: any) {
        element.setAttribute(
          'class',
          'bg-gray-800 p-4 rounded-lg overflow-x-auto my-4'
        );
      },
    },
    textTransformer: {
      text(text: any) {
        const content = text.text;
        if (content && content.includes('404')) {
          text.replace('', { html: true });
        }
      },
    },
  };
};

const createBodyContent = () => `
  ${BackgroundElements()}
  ${HeaderComponent()}
  ${HeroComponent()}
  
  <main class="container mx-auto px-4 py-8">
    ${AboutSectionComponent()}
    ${OssSectionComponent()}
    ${OutdoorSectionComponent()}
  </main>
  
  ${FooterComponent()}
  
  <script>
    ${initializeAnimations()}
  </script>
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === 'webhook.jacobmgevans.com') {
      const body = (await request.json()) as { challenge?: string };
      if (body.challenge) {
        return new Response(body.challenge, { status: 200 });
      }
      return new Response(JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // KV caching for Tailwind from CDN
    const { KV_TAILWIND, TAILWIND_URL, KV_KEY } = env;
    let tailwindScript = await KV_TAILWIND.get(KV_KEY);
    if (!tailwindScript) {
      const response = await fetch(TAILWIND_URL);
      if (response.ok) {
        tailwindScript = await response.text();
        await KV_TAILWIND.put(KV_KEY, tailwindScript);
      }
    }

    // Fetch README HTML content from GitHub
    const githubResponse = await fetch(
      'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.html'
    );
    const markdown = await githubResponse.text();

    // Remove any potential 404 text from the markdown
    const cleanedMarkdown = markdown.replace(/404:?\s*Not Found/gi, '').trim();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head></head>
      <body class="min-h-screen text-gray-100 relative">
        ${cleanedMarkdown}
      </body>
      </html>
    `;

    // Prepare a Set for gathering image URLs for preload hints
    const imageUrls = new Set<string>();

    // Create element transformers
    const transformers = createElementTransformers(imageUrls, tailwindScript);

    // Apply transformations
    const rewriter = new HTMLRewriter()
      .on('head', transformers.headTransformer)
      .on('body', transformers.bodyTransformer)
      .on('h1', transformers.h1Transformer)
      .on('h2', transformers.h2Transformer)
      .on('h3', transformers.h3Transformer)
      .on('p', transformers.pTransformer)
      .on('img', transformers.imgTransformer)
      .on('a', transformers.linkTransformer)
      .on('section', transformers.sectionTransformer)
      .on('details', transformers.detailsTransformer)
      .on('summary', transformers.summaryTransformer)
      .on('ul', transformers.ulTransformer)
      .on('li', transformers.liTransformer)
      .on('blockquote', transformers.blockquoteTransformer)
      .on('code', transformers.codeTransformer)
      .on('pre', transformers.preTransformer)
      .on('*', transformers.textTransformer);

    const transformedResponse = rewriter.transform(new Response(html));
    const rewrittenHTML = await transformedResponse.text();

    const additionalImages = [
      'https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg',
      'https://img.freepik.com/premium-photo/wolf-wolf-silhouette-dark-fantasy-forest-wolf_1168123-40178.jpg',
      'https://pbs.twimg.com/media/GTnMCppa4AEqRtH?format=jpg&name=large',
      // 'https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/mountains-silhouette.webp',
    ];

    additionalImages.forEach((img) => imageUrls.add(img));

    const images = Array.from(imageUrls).filter(
      (src) =>
        src.includes('png') ||
        src.includes('webp') ||
        src.includes('jpg') ||
        src.includes('jpeg')
    );
    const linkHeader = images
      .map((src) => `<${src}>; rel="preload"; as="image"`)
      .join(', ');

    return new Response(rewrittenHTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
        ...(linkHeader && { Link: linkHeader }),
      },
    });
  },
} satisfies ExportedHandler<Env>;
