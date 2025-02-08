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

    // Fetch README HTML content from GitHub - I need to add this to assets at some point
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
            <meta name="description" content="Jacob M.G. Evans - FullStack Developer, OSS Contributor, Veteran, and more.">
            <meta property="og:title" content="Jacob M.G. Evans Profile">
            <meta property="og:description" content="Discover Jacob's projects, contributions, and professional journey.">
            <meta property="og:url" content="https://jacobmgevans.com">
            <meta name="theme-color" content="#000000">
            <!-- You can either link to Tailwind from a CDN or use the cached script -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
            <script>${tailwindScript ?? ''}</script>
            <script>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      primary: '#6366F1',
                      accent: '#D97706'
                    }
                  }
                }
              }
            </script>
            <title>Jacob M.G. Evans - Profile</title>
          `,
            { html: true }
          );
        },
      })
      .on('body', {
        element(element) {
          element.prepend(
            `
            <header class="w-full p-4 bg-gray-900 text-gray-100 flex flex-col md:flex-row justify-between items-center">
              <div class="flex items-center space-x-4">
                <a href="https://www.linkedin.com/in/jacob-m-g-evans" aria-label="LinkedIn">
                  <img src="https://website-assets-dco.pages.dev/linkedin.webp" alt="LinkedIn" class="h-10 w-10 rounded-full"/>
                </a>
                <a href="https://twitter.com/JacobMGEvans" aria-label="Twitter">
                  <img src="https://img.shields.io/twitter/follow/JacobMGEvans?style=social" alt="Twitter Follow" class="h-10"/>
                </a>
              </div>
              <nav class="mt-4 md:mt-0">
                <ul class="flex space-x-6">
                  <li><a href="#about" class="hover:underline">About</a></li>
                  <li><a href="#oss" class="hover:underline">OSS & Community</a></li>
                  <li><a href="#blog" class="hover:underline">Blog</a></li>
                </ul>
              </nav>
            </header>
          `,
            { html: true }
          );

          element.append(
            `
            <footer class="w-full p-4 bg-gray-900 text-gray-100 text-center mt-8">
              <p>&copy; ${new Date().getFullYear()} Jacob M.G. Evans. All rights reserved.</p>
            </footer>
          `,
            { html: true }
          );

          element.setAttribute(
            'class',
            'min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100'
          );
        },
      })

      .on('h1', {
        element(element) {
          element.setAttribute(
            'class',
            'text-5xl font-bold text-primary my-6 text-center'
          );
        },
      })
      .on('h2', {
        element(element) {
          element.setAttribute(
            'class',
            'text-3xl font-bold text-primary my-4 text-center'
          );
        },
      })

      .on('p', {
        element(element) {
          element.setAttribute('class', 'text-lg my-4 leading-relaxed');
        },
      })

      .on('img', {
        element(element) {
          let src = element.getAttribute('src');
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
            'rounded shadow-lg transition transform hover:scale-105'
          );
        },
      })

      .on('a', {
        element(element) {
          element.setAttribute('class', 'text-blue-400 hover:underline');
        },
      })

      .on('section', {
        element(element) {
          element.setAttribute(
            'class',
            'max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded shadow'
          );
        },
      })

      .on('details', {
        element(element) {
          element.setAttribute('class', 'bg-gray-700 p-4 rounded my-4');
        },
      })
      .on('summary', {
        element(element) {
          element.setAttribute(
            'class',
            'cursor-pointer font-semibold text-accent'
          );
        },
      });

    const transformedResponse = rewriter.transform(new Response(html));
    const rewrittenHTML = await transformedResponse.text();

    const images = Array.from(imageUrls).filter(
      (src) => src.includes('.png') || src.includes('.webp')
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
