import { Hono } from 'hono';
import { renderer } from './renderer';
import type { BlogPost } from '../utils/rss';
import { fetchBlogPosts } from '../utils/rss';
import HomePage from '../client/pages/HomePage';
import BlogPage from '../client/pages/BlogPage';
import { handlePresence } from './api/presence';
import { DurableObjectNamespace } from '@cloudflare/workers-types';
import { PresenceDO } from './durable-object/presence';

// Environment bindings for Cloudflare Worker
type Env = {
  PRESENCE: DurableObjectNamespace<PresenceDO>;
};

const app = new Hono<Env>();

// Apply the React renderer to all requests
app.use('*', renderer);

// Add the presence API route
app.all('/api/presence', handlePresence);

// Blog route
app.get('/blog', async (c) => {
  const posts: BlogPost[] = await fetchBlogPosts();
  return c.render(<BlogPage posts={posts} />);
});

// Home and other route
app.get('/', async (c) => {
  const response = await fetch(
    'https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.html'
  );
  let readme = '';
  if (response.ok) {
    readme = (await response.text()).replace(/404:?\s*Not Found/gi, '').trim();
  }
  return c.render(<HomePage readme={readme} />);
});

export default app;

// Export the Durable Object class for Wrangler
export { PresenceDO };
