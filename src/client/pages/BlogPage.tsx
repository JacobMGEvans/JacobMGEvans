import { useEffect } from 'react';
import type { FC } from 'react';
import type { BlogPost } from '../../utils/rss';
import runBlogAnimations from '../hooks/runBlogAnimations';
import { BackgroundElements } from '../components/Background';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Blog } from '../components/Blog';

export interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: FC<BlogPageProps> = ({ posts }) => {
  useEffect(() => {
    runBlogAnimations();
  }, []);

  return (
    <>
      <BackgroundElements />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="py-24">
          <div className="mb-8 text-center">
            <a
              href="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Home
            </a>
          </div>
          {posts.length > 0 ? (
            <Blog posts={posts} />
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-4xl mb-4 text-cyan-400">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
              <p className="text-xl font-rajdhani">Loading blog posts...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
