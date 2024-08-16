const handler = {
  async fetch(): Promise<Response> {
    const TAILWIND_URL = 'https://cdn.tailwindcss.com';
    const CACHE_KEY = new Request(TAILWIND_URL);
    const cache = await caches.open('tailwind-cache');

    let tailwindScript = await cache.match(CACHE_KEY);
    if (!tailwindScript) {
      tailwindScript = await fetch(TAILWIND_URL);
      if (tailwindScript.ok) {
        await cache.put(CACHE_KEY, tailwindScript.clone());
      }
    }
    const tailwind = tailwindScript ? await tailwindScript.text() : '';

    const headers = new Headers();
    headers.set('Content-Type', 'text/html;charset=UTF-8');

    // Fetch the HTML content from the GitHub README -> its Raw endpoint because grabbing it relative to the repo isnt working... Yet.
    const response = await fetch(
      'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md',
      {
        cf: {
          cacheEverything: true,
          cacheTtl: 600, // 10 minute
        },
      }
    );

    const html = await response.text();

    const rewriter = new HTMLRewriter()
      .on('head', {
        element(element) {
          // Add the TailwindCSS Play CDN script
          element.append(
            `
            <meta property="og:url" content="https://dev.to/jacobmgevans" />
            <meta name="description" content="Jacob MG Evans GitHub profile. Describing personal passions and accomplishments." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <script>${tailwind}</script>
            <script defer>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      slate: '#1f2937',
                      primary: '#6366F1', 
                      accent: '#D97706',
                    }
                  }
                }
              }
            </script>
            <style type="text/tailwindcss">
              @layer utilities {
                .content-auto {
                  content-visibility: auto;
                }
              }
            </style>
            <title>JacobMGEvans profile</title>
          `,
            { html: true }
          );
        },
      })
      .on('div:first-of-type', {
        element(element) {
          element.setAttribute('class', 'flex justify-center space-x-4 my-4');
        },
      })
      .on('body', {
        element(element) {
          element.setAttribute(
            'class',
            'min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 p-4'
          );
        },
      })
      .on('h1', {
        element(element) {
          element.setAttribute(
            'class',
            'text-4xl font-extrabold text-primary mt-8 mb-4 tracking-tight'
          );
        },
      })
      .on('h2', {
        element(element) {
          element.setAttribute(
            'class',
            'text-2xl font-extrabold text-primary mt-8 mb-4 tracking-tight'
          );
        },
      })
      .on('p[align="center"]', {
        element(element) {
          element.setAttribute('class', 'flex justify-center space-x-4 my-8');
        },
      })
      .on('a img', {
        element(element) {
          // Style the images inside <a> tags
          element.setAttribute(
            'class',
            'h-8 filter drop-shadow-lg transition-transform transform hover:scale-110'
          );
        },
      })
      .on('section', {
        element(element) {
          element.setAttribute('class', 'text-center text-lg my-6');
          element.tagName = 'div';
        },
      })
      .on('span', {
        element(element) {
          element.setAttribute('class', 'flex justify-center space-x-6 my-6');
        },
      })
      .on('details', {
        element(element) {
          element.setAttribute(
            'class',
            'bg-gray-800 shadow-lg rounded-lg p-6 my-8 w-full max-w-3xl border border-gray-700'
          );
        },
      })
      .on('summary', {
        element(element) {
          element.setAttribute(
            'class',
            'font-semibold cursor-pointer text-accent hover:text-accent-light'
          );
        },
      })
      .on('hr', {
        element(element) {
          element.setAttribute('class', 'border-gray-600 my-6');
        },
      });

    const transformedResponse = rewriter.transform(
      new Response(html, {
        headers: {
          'content-type': 'text/html',
        },
      })
    );

    return new Response(await transformedResponse.text(), {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=3600',
      },
    });
  },
} satisfies ExportedHandler;

export default handler;
