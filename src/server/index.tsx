import { Hono } from 'hono';
import { renderer } from './renderer';
import type { BlogPost } from '../utils/rss';
import { fetchBlogPosts } from '../utils/rss';
import HomePage from '../client/pages/HomePage';
import BlogPage from '../client/pages/BlogPage';
import { website } from '../../alchemy.run';

const app = new Hono<{ Bindings: typeof website.bindings }>();

app.use('*', renderer);

app.get('/blog', async (c) => {
  const posts: BlogPost[] = await fetchBlogPosts();
  return c.render(<BlogPage posts={posts} />);
});

app.get('/', async (c) => {
  return c.render(<HomePage readme={''} />);
});

export default app;
