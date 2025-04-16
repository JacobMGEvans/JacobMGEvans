import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { cache } from 'hono/cache';
import { Layout } from './components/layout';
import { Hero } from './components/hero';
import { About } from './components/about';
import { OpenSource } from './components/open-source';
import { Outdoor } from './components/outdoor';
import { Footer } from './components/footer';

// Define environment interface
interface Env {
  KV_TAILWIND: KVNamespace;
  TAILWIND_URL: string;
  KV_KEY: string;
}

// Create Hono app
const app = new Hono<{ Bindings: Env }>();

// Set up JSX renderer
app.use(
  '*',
  jsxRenderer(({ children }) => {
    return <>{children}</>;
  })
);

// Cache static assets
app.use(
  '/static/*',
  cache({ cacheName: 'assets', cacheControl: 'max-age=3600' })
);
// app.use('/static/*', serveStatic({ root: './' }));

// Handle webhook endpoint
app.post('/webhook', async (c) => {
  const body = await c.req.json();
  if (body.challenge) {
    return c.text(body.challenge);
  }
  return c.json(body);
});

// Main route
app.get('/', async (c) => {
  const { KV_TAILWIND, TAILWIND_URL, KV_KEY } = c.env;

  // KV caching for Tailwind from CDN
  let tailwindScript: string | null = await KV_TAILWIND.get(KV_KEY);
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

  return c.render(
    <Layout tailwindScript={tailwindScript || undefined}>
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <About />
        <OpenSource markdown={cleanedMarkdown} />
        <Outdoor />
      </main>
      <Footer />
    </Layout>
  );
});

export default app;
