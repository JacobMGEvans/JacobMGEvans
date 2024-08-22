interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

export default {
  async fetch(request: Request, env, ctx: ExecutionContext): Promise<Response> {
    const imageUrls = new Set<string>();
    const TAILWIND_URL = env.TAILWIND_URL;
    const KV_KEY = env.KV_KEY;
    const KV_TAILWIND = env.KV_TAILWIND;

    let tailwindScript = await KV_TAILWIND.get(KV_KEY);
    if (!tailwindScript) {
      const response = await fetch(TAILWIND_URL);
      if (response.ok) {
        tailwindScript = await response.text();
        await KV_TAILWIND.put(KV_KEY, tailwindScript);
      }
    }

    // Fetch the HTML content from the GitHub README's raw endpoint -> because I cant get the relative fetch from the repo working... Yet
    const response = await fetch(
      'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md'
      //** Should I cache this on the CF CDN? */
    );
    // Cloudflare Pages fetch assets from `https://website-assets-dco.pages.dev/`

    const markdown = await response.text();
    // The markdown HTML from GitHub doesnt have Head tags
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head></head>
    <body>
      ${markdown}
    </body>
    </html>
    `;

    const rewriter = new HTMLRewriter()
      .on('head', {
        element(element) {
          // Inject the cached Tailwind CSS Play CDN script with custom configuration
          element.append(
            `
            <meta charset="UTF-8">
            <meta property="og:url" content="https://dev.to/jacobmgevans" />
            <meta name="description" content="Jacob MG Evans GitHub profile. Describing personal passions and accomplishments." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="robots" content="index, follow" />
            <script>${tailwindScript ? tailwindScript : ''}</script>
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
      .on('img', {
        element(element) {
          const src = element.getAttribute('src');
          if (src) {
            imageUrls.add(src);
          }
          if (src?.includes('.png') || src?.includes('.webp')) {
            const newSrc = src.replace(
              'https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/',
              ''
            );
            //! Now retrieving the images from Cloudflare Pages assets, eventually going to put the Pages on the same domain on /public route
            element.setAttribute(
              'src',
              `https://website-assets-dco.pages.dev/${newSrc}`
            );
          }
          element.setAttribute('loading', 'lazy');
          element.setAttribute('decoding', 'async');
        },
      })
      .on('a', {
        element(element) {
          element.setAttribute('class', 'text-blue-500 underline');
        },
      })
      .on('a img', {
        element(element) {
          element.setAttribute(
            'class',
            'h-16 filter drop-shadow-lg transition-transform transform hover:scale-150'
          );
        },
      })
      .on('div a img', {
        element(element) {
          element.setAttribute(
            'class',
            'h-6 filter drop-shadow-lg transition-transform transform hover:scale-110'
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
      })
      .on('p', {
        element(element) {
          element.setAttribute('class', 'text-lg text-center');
        },
      });

    const transformedResponse = rewriter.transform(new Response(html));
    const rewrittenHTML = await transformedResponse.text();

    const images = Array.from(imageUrls).filter(
      (image) => image.includes('.png') || image.includes('.webp')
    );
    const assets = await fetch(
      `https://website-assets-dco.pages.dev/hacktober2019.webp`
    ).then((res) => res.blob());
    console.log(assets);

    return new Response(rewrittenHTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        ETag: request.cf?.country as string,
        'Cache-Control': 'public: max-age=60, stale-while-revalidate=30',
        Link: images
          .map((image) => `<${image}>; rel="preload"; as="image"`)
          .join(', '),
      },
    });
  },
} satisfies ExportedHandler<Env>;
