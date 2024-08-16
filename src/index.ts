const handler = {
  async fetch(): Promise<Response> {
    const headers = new Headers();
    headers.set('Content-Type', 'text/html;charset=UTF-8');

    // Fetch the HTML content from the GitHub README
    const response = await fetch(
      'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/readme.html'
    );
    const html = await response.text();

    // HTMLRewriter to add the TailwindCSS Play CDN script and modify the content
    const rewriter = new HTMLRewriter()
      .on('head', {
        element(element) {
          // Add the TailwindCSS Play CDN script and meta tags
          element.append(
            `
            <meta property="og:url" content="https://dev.to/jacobmgevans" />
            <meta name="description" content="Jacob MG Evans GitHub profile. Describing personal passions and accomplishments." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      clifford: '#da373d',
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
      .on('body', {
        element(element) {
          // Apply Tailwind styles to the body
          element.setAttribute(
            'class',
            'flex flex-col items-center bg-gray-100 text-gray-900 p-4'
          );
        },
      })
      .on('h1', {
        element(element) {
          // Apply Tailwind styles to the <h1> tags
          element.setAttribute(
            'class',
            'text-3xl font-bold underline text-clifford mt-4'
          );
        },
      })
      .on('p[align="center"]', {
        element(element) {
          // Style the paragraph with Tailwind classes
          element.setAttribute('class', 'flex justify-center space-x-4 my-4');
        },
      })
      .on('a img', {
        element(element) {
          // Style the images inside <a> tags
          element.setAttribute('class', 'h-6');
        },
      })
      .on('center', {
        element(element) {
          // Center-align content with Tailwind classes and remove the deprecated <center> tag
          element.setAttribute('class', 'text-center my-4');
          element.tagName = 'div'; // Replace <center> with <div>
        },
      })
      .on('span', {
        element(element) {
          // Style the span containing the OSS logos
          element.setAttribute('class', 'flex justify-center space-x-4 my-4');
        },
      })
      .on('details', {
        element(element) {
          // Style the <details> element
          element.setAttribute(
            'class',
            'bg-white shadow-md rounded p-4 my-4 w-full max-w-2xl'
          );
        },
      })
      .on('summary', {
        element(element) {
          // Style the <summary> element
          element.setAttribute('class', 'font-semibold cursor-pointer');
        },
      })
      .on('hr', {
        element(element) {
          // Style the <hr> elements
          element.setAttribute('class', 'border-gray-300 my-4');
        },
      });

    // Transform the fetched HTML using HTMLRewriter
    const transformedResponse = rewriter.transform(
      new Response(html, {
        headers: {
          'content-type': 'text/html',
        },
      })
    );

    // Return the transformed HTML response
    return new Response(await transformedResponse.text(), {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
} satisfies ExportedHandler;

export default handler;
