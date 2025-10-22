import { reactRenderer } from '@hono/react-renderer';

export const renderer = reactRenderer(({ children }) => {
  // TODO: There is probably something better for this, need to research more
  const isProd = import.meta.env.PROD ?? import.meta.env.MODE === 'production';

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {isProd ? (
          <>
            <link rel="stylesheet" href="/assets/index.css" />
          </>
        ) : (
          <>
            <script type="module" src="/@vite/client"></script>
            <link rel="stylesheet" href="/src/style.css" />
          </>
        )}
      </head>
      <body>
        <div id="root">{children}</div>
        <div id="client-root"></div>

        {isProd ? (
          <script type="module" src="/assets/index.js"></script>
        ) : (
          <script type="module" src="/src/client/index.tsx"></script>
        )}
      </body>
    </html>
  );
});
