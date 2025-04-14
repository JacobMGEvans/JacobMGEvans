import {
  type HTMLRewriter,
  type KVNamespace,
  type ExecutionContext,
  type ExportedHandler,
} from '@cloudflare/workers-types';

interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
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
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head></head>
      <body>
        ${markdown}
      </body>
      </html>
    `;

    // Prepare a set for gathering image URLs for preload hints
    const imageUrls = new Set<string>();

    const rewriter = new HTMLRewriter()
      .on('head', {
        element(element) {
          element.setInnerContent(
            `
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
                background-image: url('https://website-assets-dco.pages.dev/mountains-silhouette.webp');
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
              
              /* README content styling */
              #readme-content h1, 
              #readme-content h2, 
              #readme-content h3, 
              #readme-content h4, 
              #readme-content h5, 
              #readme-content h5, 
              #readme-content p,
              #readme-content ul,
              #readme-content ol,
              #readme-content blockquote,
              #readme-content pre,
              #readme-content details,
              #readme-content summary {
                color: inherit;
                margin: inherit;
              }
            </style>
            <title>Jacob M.G. Evans - Developer, Veteran & Outdoor Enthusiast</title>
          `,
            { html: true }
          );
        },
      })
      .on('body', {
        element(element) {
          element.prepend(
            `
            <div class="wolf-tracks"></div>
            <div class="parallax-mountains"></div>
            
            <header class="sticky top-0 z-50 w-full p-4 bg-gradient-to-r from-forest-dark via-wolf-dark to-forest-dark backdrop-blur-md border-b border-gray-800 text-gray-100 flex flex-col md:flex-row justify-between items-center">
              <div class="flex items-center space-x-4">
                <div class="wolf-icon">
                  <i class="fas fa-wolf-pack-battalion text-3xl text-mountain-purple"></i>
                </div>
                <h1 class="text-xl font-heading font-bold">Jacob M.G. Evans</h1>
                <div class="flex items-center space-x-2">
                  <a href="https://www.linkedin.com/in/jacob-m-g-evans" aria-label="LinkedIn" class="hover:text-mountain-blue transition-colors">
                    <i class="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href="https://twitter.com/JacobMGEvans" aria-label="Twitter" class="hover:text-mountain-blue transition-colors">
                    <i class="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="https://github.com/JacobMGEvans" aria-label="GitHub" class="hover:text-mountain-blue transition-colors">
                    <i class="fab fa-github text-xl"></i>
                  </a>
                </div>
              </div>
              <nav class="mt-4 md:mt-0">
                <ul class="flex space-x-6">
                  <li><a href="#about" class="nav-link font-medium">About</a></li>
                  <li><a href="#oss" class="nav-link font-medium">OSS & Community</a></li>
                  <li><a href="#blog" class="nav-link font-medium">Blog</a></li>
                  <li><a href="#outdoor" class="nav-link font-medium">Outdoor Life</a></li>
                </ul>
              </nav>
            </header>
            
            <div class="hero min-h-[60vh] flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 z-0">
                <div class="absolute inset-0 bg-gradient-to-b from-forest-dark/80 to-wolf-dark/80"></div>
                <div class="absolute inset-0 bg-[url('https://website-assets-dco.pages.dev/wolf-silhouette.webp')] bg-no-repeat bg-right-bottom bg-contain opacity-20"></div>
              </div>
              
              <div class="container mx-auto px-4 z-10 text-center">
                <h1 class="text-5xl md:text-6xl font-heading font-bold mb-4 text-white animate-fade-in" id="hero-title">Jacob M.G. Evans</h1>
                <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" id="hero-subtitle">FullStack Developer, OSS Contributor, Veteran & Outdoor Enthusiast</p>
                <div class="flex flex-wrap justify-center gap-3 animate-fade-in" id="hero-badges">
                  <span class="tech-badge px-4 py-2 rounded-full text-sm font-medium">JavaScript</span>
                  <span class="tech-badge px-4 py-2 rounded-full text-sm font-medium">TypeScript</span>
                  <span class="tech-badge px-4 py-2 rounded-full text-sm font-medium">React</span>
                  <span class="tech-badge px-4 py-2 rounded-full text-sm font-medium">Node.js</span>
                  <span class="tech-badge px-4 py-2 rounded-full text-sm font-medium">Open Source</span>
                </div>
              </div>
            </div>
            
            <main class="container mx-auto px-4 py-8">
              <div id="readme-content" class="content-section max-w-4xl mx-auto my-12 p-8 rounded-lg shadow-xl animate-fade-in">
                <!-- The README content will be moved here by JavaScript -->
              </div>
              
              <section id="outdoor" class="content-section max-w-4xl mx-auto my-12 p-8 rounded-lg shadow-xl animate-fade-in">
                <h2 class="text-3xl font-heading font-bold text-mountain-purple mb-6">Outdoor Life</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 class="text-xl font-heading font-semibold mb-4 text-mountain-blue">Hiking & Camping</h3>
                    <p class="text-gray-300 mb-4">As an avid outdoor enthusiast, I find peace and inspiration in nature. Hiking through forests and mountains connects me with the natural world and fuels my creativity.</p>
                    <ul class="list-disc list-inside text-gray-300 space-y-2">
                      <li>Experienced backpacker with multi-day trail experience</li>
                      <li>Camping in all seasons and weather conditions</li>
                      <li>Passionate about wildlife conservation</li>
                    </ul>
                  </div>
                  <div class="relative h-64 rounded-lg overflow-hidden shadow-lg">
                    <img src="https://website-assets-dco.pages.dev/forest-trail.webp" alt="Forest hiking trail" class="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110" />
                  </div>
                </div>
                
                <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative h-64 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                    <img src="https://website-assets-dco.pages.dev/wolf.webp" alt="Wolf in natural habitat" class="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110" />
                  </div>
                  <div class="order-1 md:order-2">
                    <h3 class="text-xl font-heading font-semibold mb-4 text-mountain-blue">Wolf Appreciation</h3>
                    <p class="text-gray-300 mb-4">Wolves represent the perfect balance of intelligence, strength, and community - values I strive to embody in both my personal and professional life.</p>
                    <p class="text-gray-300">Their adaptability and resilience in challenging environments mirrors the mindset needed in the ever-evolving tech landscape.</p>
                  </div>
                </div>
              </section>
            </main>
            
            <footer class="w-full p-8 bg-gradient-to-r from-forest-dark via-wolf-dark to-forest-dark text-gray-100 border-t border-gray-800">
              <div class="container mx-auto">
                <div class="flex flex-col md:flex-row justify-between items-center">
                  <div class="mb-6 md:mb-0">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-wolf-pack-battalion text-2xl text-mountain-purple"></i>
                      <span class="text-xl font-heading font-bold">Jacob M.G. Evans</span>
                    </div>
                    <p class="text-sm text-gray-400 mt-2">FullStack Developer, OSS Contributor, Veteran & Outdoor Enthusiast</p>
                  </div>
                  
                  <div class="flex space-x-6">
                    <a href="https://www.linkedin.com/in/jacob-m-g-evans" aria-label="LinkedIn" class="hover:text-mountain-blue transition-colors">
                      <i class="fab fa-linkedin text-2xl"></i>
                    </a>
                    <a href="https://twitter.com/JacobMGEvans" aria-label="Twitter" class="hover:text-mountain-blue transition-colors">
                      <i class="fab fa-twitter text-2xl"></i>
                    </a>
                    <a href="https://github.com/JacobMGEvans" aria-label="GitHub" class="hover:text-mountain-blue transition-colors">
                      <i class="fab fa-github text-2xl"></i>
                    </a>
                  </div>
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-800 text-center">
                  <p>&copy; ${new Date().getFullYear()} Jacob M.G. Evans. All rights reserved.</p>
                </div>
              </div>
            </footer>
            
            <script>
              // Initialize animations when the DOM is loaded
              document.addEventListener('DOMContentLoaded', () => {
                // Move the README content to the designated container
                const readmeContent = document.getElementById('readme-content');
                
                // Find all direct children of body that aren't our custom elements
                const bodyChildren = Array.from(document.body.children);
                const customElements = [
                  document.querySelector('header'),
                  document.querySelector('.hero'),
                  document.querySelector('main'),
                  document.querySelector('footer'),
                  document.querySelector('.wolf-tracks'),
                  document.querySelector('.parallax-mountains')
                ];
                
                // Filter out our custom elements to get only the README content
                const readmeElements = bodyChildren.filter(el => !customElements.includes(el));
                
                // Move each README element to the readme-content container
                readmeElements.forEach(el => {
                  if (el && readmeContent) {
                    readmeContent.appendChild(el);
                  }
                });
                
                // Add IDs to important sections for navigation
                const headers = document.querySelectorAll('h2');
                headers.forEach(header => {
                  if (header.textContent && header.textContent.includes('OSS & Community')) {
                    header.id = 'oss';
                  } else if (header.textContent && header.textContent.toLowerCase().includes('blog')) {
                    header.id = 'blog';
                  }
                });
                
                // Process images in the README content
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                  const src = img.getAttribute('src');
                  if (src && (src.includes('.png') || src.includes('.webp'))) {
                    const newSrc = src.replace(
                      'https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/',
                      'https://website-assets-dco.pages.dev/'
                    );
                    img.setAttribute('src', newSrc);
                    img.setAttribute('loading', 'lazy');
                    img.setAttribute('decoding', 'async');
                    img.classList.add('rounded-lg', 'shadow-lg', 'transition-all', 'duration-500', 'transform', 'hover:scale-105', 'hover:shadow-xl');
                  }
                });
                
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
                
                // Remove any unwrapped text nodes in body (fixes 404 display issues)
                const unwrappedNodes = Array.from(document.body.childNodes)
                  .filter(node => 
                    node.nodeType === Node.TEXT_NODE && 
                    node.textContent && 
                    node.textContent.trim().length > 0
                  );
                
                unwrappedNodes.forEach(node => {
                  node.parentNode.removeChild(node);
                });
                
                // Find and remove any 404 error text that might appear
                document.querySelectorAll('*').forEach(el => {
                  if (el.textContent && el.textContent.trim() === '404: Not Found') {
                    el.style.display = 'none';
                  }
                });
                
                // Add id to the about section if not already present
                const aboutSection = document.querySelector('section h2')?.closest('section');
                if (aboutSection && !aboutSection.id) {
                  aboutSection.id = 'about';
                }
              });
            </script>
          `,
            { html: true }
          );

          element.setAttribute('class', 'min-h-screen text-gray-100 relative');
        },
      })

      .on('h1', {
        element(element) {
          element.setAttribute(
            'class',
            'text-4xl md:text-5xl font-heading font-bold text-mountain-purple my-6'
          );
        },
      })
      .on('h2', {
        element(element) {
          element.setAttribute(
            'class',
            'text-3xl font-heading font-bold text-mountain-purple my-5'
          );
        },
      })
      .on('h3', {
        element(element) {
          element.setAttribute(
            'class',
            'text-2xl font-heading font-semibold text-mountain-blue my-4'
          );
        },
      })

      .on('p', {
        element(element) {
          element.setAttribute(
            'class',
            'text-lg text-gray-300 my-4 leading-relaxed'
          );
        },
      })

      .on('img', {
        element(element) {
          const src = element.getAttribute('src');
          if (src && (src.includes('.png') || src.includes('.webp'))) {
            const newSrc = src.replace(
              'https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/',
              'https://website-assets-dco.pages.dev/'
            );
            element.setAttribute('src', newSrc);
            imageUrls.add(newSrc);
          }
          element.setAttribute('loading', 'lazy');
          element.setAttribute('decoding', 'async');
          element.setAttribute(
            'class',
            'rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl'
          );
        },
      })

      .on('a', {
        element(element) {
          element.setAttribute(
            'class',
            'text-mountain-blue hover:text-mountain-purple transition-colors duration-300 hover:underline'
          );
        },
      })

      .on('section', {
        element(element) {
          element.setAttribute(
            'class',
            'content-section max-w-4xl mx-auto my-12 p-8 rounded-lg shadow-xl animate-fade-in'
          );
        },
      })

      .on('details', {
        element(element) {
          element.setAttribute(
            'class',
            'bg-forest-dark p-4 rounded-lg my-4 border border-gray-700 transition-all duration-300 hover:border-mountain-purple'
          );
        },
      })
      .on('summary', {
        element(element) {
          element.setAttribute(
            'class',
            'cursor-pointer font-semibold text-mountain-blue hover:text-mountain-purple transition-colors duration-300'
          );
        },
      })
      .on('ul', {
        element(element) {
          element.setAttribute('class', 'space-y-2 my-4');
        },
      })
      .on('li', {
        element(element) {
          element.setAttribute('class', 'text-gray-300');
        },
      })
      .on('blockquote', {
        element(element) {
          element.setAttribute(
            'class',
            'border-l-4 border-mountain-purple pl-4 my-4 italic text-gray-400'
          );
        },
      })
      .on('code', {
        element(element) {
          element.setAttribute(
            'class',
            'bg-gray-800 text-gray-300 px-1 py-0.5 rounded text-sm'
          );
        },
      })
      .on('pre', {
        element(element) {
          element.setAttribute(
            'class',
            'bg-gray-800 p-4 rounded-lg overflow-x-auto my-4'
          );
        },
      });

    const transformedResponse = rewriter.transform(new Response(html));
    const rewrittenHTML = await transformedResponse.text();

    const additionalImages = [
      'https://4kwallpapers.com/images/walls/thumbs_3t/8010.jpg',
      'https://website-assets-dco.pages.dev/wolf-silhouette.webp',
      'https://website-assets-dco.pages.dev/mountains-silhouette.webp',
      'https://website-assets-dco.pages.dev/forest-trail.webp',
      'https://website-assets-dco.pages.dev/wolf.webp',
    ];

    additionalImages.forEach((img) => imageUrls.add(img));

    const images = Array.from(imageUrls).filter(
      (src) =>
        src.includes('.png') ||
        src.includes('.webp') ||
        src.includes('.jpg') ||
        src.includes('.jpeg')
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
