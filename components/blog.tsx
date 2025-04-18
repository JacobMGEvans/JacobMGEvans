import type { FC } from 'hono/jsx';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
}

interface BlogComponentProps {
  posts: BlogPost[];
}

// Simple function to strip HTML and limit content length
function stripHtmlAndLimitLength(
  html: string,
  maxLength: number = 250
): string {
  // First remove HTML tags
  const text = html
    .replace(/<\/?[^>]+(>|$)/g, ' ')
    // Then collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Limit length and add ellipsis if needed
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export const BlogComponent: FC<BlogComponentProps> = ({ posts }) => {
  return (
    <section
      id="blog"
      className="content-section max-w-6xl mx-auto my-12 p-8 rounded-lg shadow-xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold pt-8 mb-8 text-center font-orbitron cyber-glitch drop-shadow-glow">
          Latest <span className="text-cyan-400">Blog</span> Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-900/30 transition-all duration-300 border border-gray-700 hover:border-cyan-700 glow-animate"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-rajdhani text-cyan-300">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <div className="mb-4 text-gray-300 text-sm line-clamp-4 leading-relaxed">
                  {stripHtmlAndLimitLength(post.content)}
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-700 to-blue-900 text-white rounded hover:from-cyan-600 hover:to-blue-800 transition-all duration-300 font-rajdhani"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No blog posts found.</p>
          </div>
        )}
      </div>
    </section>
  );
};
