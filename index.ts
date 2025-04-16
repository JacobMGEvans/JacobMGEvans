import {
  type KVNamespace,
  type ExportedHandler,
} from '@cloudflare/workers-types';
import {
  sectionContainer,
  heading,
  paragraph,
  list,
  link,
  imageContainer,
  responsiveImage,
  grid,
  socialIcon,
  badge,
  flex,
  ossPreviewImage,
  previewContainer,
  footerStyle,
} from './css-utilities';
import { HeaderComponent } from './components/header';
import { HeroComponent } from './components/hero';
import { AboutSectionComponent } from './components/about';

interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

const OssSectionComponent = () => `
  <section id="oss" class="${sectionContainer('content-section')}">
    <h2 class="${heading('h2')}">OSS Contributions & Community Involvement</h2>
    <div class="${flex('row', 'flex-wrap justify-center gap-6 mb-6')}">
      <a href="https://dev.to/jacobmgevans" class="${previewContainer()}">
        <img src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2019.webp" alt="2019 Hacktoberfest Contributor" class="${ossPreviewImage()}" />
      </a>
      <a href="https://dev.to/jacobmgevans" class="${previewContainer()}">
        <img src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2020.webp" alt="2020 Hacktoberfest Contributor" class="${ossPreviewImage()}" />
      </a>
      <a href="https://dev.to/jacobmgevans" class="${previewContainer()}">
        <img src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2021.webp" alt="2021 Hacktoberfest Contributor" class="${ossPreviewImage()}" />
      </a>
      <a href="https://osrg.t3.gg/" class="${previewContainer()}">
        <img src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/osrg.webp" alt="Open Source Raid Guild Member" class="${ossPreviewImage()}" />
      </a>
    </div>
    <p class="${paragraph('light')}">
      Part of my open-source work and learning in public involves writing technical (and sometimes less technical) blog posts. My goal is for others, and my future self, to benefit from them.
    </p>
    <details open class="w-full bg-forest-dark/80 p-6 rounded-xl my-4 border border-mountain-purple/30 transition-all duration-300 hover:border-mountain-purple shadow-lg">
      <summary class="cursor-pointer font-semibold text-mountain-blue hover:text-mountain-purple transition-colors duration-300 text-xl flex items-center gap-2">
        <span>📚</span> <span>Some of My Blog Articles & Other Content</span>
      </summary>
      <ul class="space-y-3 my-4 px-2">
        <li>
          <a href="https://podrocket.logrocket.com/cloudflare-workers" class="${link(
            'underline'
          )}">
            Guest on LogRocket - Cloudflare Workers
          </a>
        </li>
        <li>
          <a href="https://dev.to/jacobmgevans/javascript-resources-podcasts-books-videos-and-tutorials-4a6e" class="${link(
            'underline'
          )}">
            JavaScript Resources: Podcasts, Books, Videos, and Tutorials
          </a>
        </li>
        <li>
          <a href="https://dev.to/jacobmgevans/more-podcasts-and-video-programming-resources-5a8k" class="${link(
            'underline'
          )}">
            More Podcasts and Video Programming Resources
          </a>
        </li>
        <li>
          <a href="https://dev.to/jacobmgevans/should-you-listen-to-podcasts-4m5j" class="${link(
            'underline'
          )}">
            Should You Listen to Podcasts?
          </a>
        </li>
        <li>
          <a href="https://dev.to/jacobmgevans/writing-immutable-javascript-why-how-3if6" class="${link(
            'underline'
          )}">
            Writing Immutable and Functional JavaScript
          </a>
        </li>
      </ul>
    </details>
    <style>
      .drop-shadow-glow {
        text-shadow: 0 0 12px #8B5CF6, 0 0 24px #3B82F6;
      }
      .glow-animate {
        box-shadow: 0 0 0px #8B5CF6, 0 0 0px #3B82F6;
        transition: box-shadow 0.4s;
      }
    </style>
  </section>
`;

const OutdoorSectionComponent = () => `
  <section id="outdoor" class="${sectionContainer()}">
    <h2 class="${heading('h2')}">Outdoor Life</h2>
    <div class="${grid()}">
      <div>
        <h3 class="${heading('h3')}">Hiking & Camping</h3>
        <p class="${paragraph()}">As an avid outdoor enthusiast, I find peace and inspiration in nature. Hiking through forests and mountains connects me with the natural world and fuels my creativity.</p>
        <ul class="${list()}">
          <li>Experienced backpacker with multi-day trail experience</li>
          <li>Camping in all seasons and weather conditions</li>
          <li>Passionate about wildlife conservation</li>
        </ul>
      </div>
      <div class="${imageContainer()}">
        <img src="https://pbs.twimg.com/media/GTnMCppa4AEqRtH?format=jpg&name=large" alt="Forest hiking trail" class="${responsiveImage()}" />
      </div>
    </div>
    
    <div class="mt-12 ${grid()}">
      <div class="${imageContainer(true)}">
        <img src="https://img.freepik.com/premium-photo/wolf-wolf-silhouette-dark-fantasy-forest-wolf_1168123-40178.jpg" alt="Wolf in natural habitat" class="${responsiveImage()}" />
      </div>
      <div class="order-1 md:order-2">
        <h3 class="${heading('h3')}">Wolf Appreciation</h3>
        <p class="${paragraph()}">Wolves represent the perfect balance of intelligence, strength, and community - values I strive to embody in both my personal and professional life.</p>
        <p class="${paragraph()}">Their adaptability and resilience in challenging environments mirrors the mindset needed in the ever-evolving tech landscape.</p>
      </div>
    </div>
  </section>
`;

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="${footerStyle()}">
      <div class="container mx-auto">
        <div class="${flex('col', 'md:flex-row justify-between items-center')}">
          <div class="mb-6 md:mb-0">
            <div class="${flex('row', 'items-center space-x-2')}">
              <span class="text-xl font-heading font-bold">Jacob M.G. Evans</span>
            </div>
            <p class="${paragraph(
              'small'
            )}">FullStack Developer, OSS Contributor, Veteran & Outdoor Enthusiast</p>
          </div>
          
          <div class="${flex('row', 'space-x-6')}">
            <a href="https://www.linkedin.com/in/jacob-m-g-evans" aria-label="LinkedIn" class="${socialIcon()}">
              <i class="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://twitter.com/JacobMGEvans" aria-label="Twitter" class="${socialIcon()}">
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://github.com/JacobMGEvans" aria-label="GitHub" class="${socialIcon()}">
              <i class="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; ${currentYear} Jacob M.G. Evans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
};

const BackgroundElements = () => `
  <div class="wolf-tracks"></div>
  <div class="parallax-mountains"></div>
`;

const initializeAnimations = () => `
  document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations
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
    
    // Animate all fade-in elements as they enter viewport
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

const createHeadContent = (tailwindScript: string | null) => `
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
