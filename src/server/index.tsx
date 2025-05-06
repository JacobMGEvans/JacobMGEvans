import { Hono } from 'hono';
import { renderer } from './renderer';
import type { BlogPost } from '../utils/rss';
import { fetchBlogPosts } from '../utils/rss';
import HomePage from '../client/pages/HomePage';
import BlogPage from '../client/pages/BlogPage';
// import { handlePresence } from './api/presence';
// import { DurableObjectNamespace } from '@cloudflare/workers-types';
// import type { PresenceDO } from './durable-objects/presence';

// type Env = {
//  Bindings: {
//    PRESENCE: DurableObjectNamespace<PresenceDO>;
//  };
//};

const app = new Hono();

app.use('*', renderer);

// app.all('/api/presence', handlePresence);

app.get('/blog', async (c) => {
  const posts: BlogPost[] = await fetchBlogPosts();
  return c.render(<BlogPage posts={posts} />);
});

app.get('/', async (c) => {
  return c.render(<HomePage readme={''} />);
});

export default app;
