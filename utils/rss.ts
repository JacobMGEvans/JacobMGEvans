export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  categories?: string[];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching blog posts from dev.to...');
    const response = await fetch('https://dev.to/feed/jacobmgevans', {
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'Mozilla/5.0 Cloudflare Worker',
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch RSS feed: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const xml = await response.text();
    console.log(`Received RSS feed (${xml.length} bytes)`);

    // Debug: Print a small portion of XML to verify format
    console.log('XML snippet:', xml.substring(0, 500) + '...');

    // Simple XML parsing without additional libraries
    const posts: BlogPost[] = [];

    // Extract items (posts) from the RSS feed
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    let count = 0;

    while ((match = itemRegex.exec(xml)) !== null) {
      count++;
      const itemContent = match[1];

      try {
        // Extract post details
        const title = decodeHtmlEntities(extractTag(itemContent, 'title'));
        const link = extractTag(itemContent, 'link');
        const pubDate = extractTag(itemContent, 'pubDate');
        const content = extractTag(itemContent, 'description');

        // Debug: Print item parsing
        console.log(`Parsing item ${count}:`, {
          title,
          link,
          pubDate: pubDate.substring(0, 20) + '...',
        });

        // Extract categories
        const categories: string[] = [];
        const categoryRegex = /<category>(.*?)<\/category>/g;
        let catMatch;
        while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
          categories.push(catMatch[1]);
        }

        if (title && link) {
          posts.push({
            title,
            link,
            pubDate,
            content: decodeHtmlEntities(content),
            categories,
          });
        }
      } catch (err) {
        console.error('Error parsing item:', err);
      }
    }

    console.log(`Extracted ${posts.length} posts from ${count} items`);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function extractTag(content: string, tag: string): string {
  // First try to match CDATA section
  const cdataRegex = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[(.*?)\\]\\]><\/${tag}>`,
    's'
  );
  const cdataMatch = content.match(cdataRegex);

  if (cdataMatch) {
    return cdataMatch[1].trim();
  }

  // Fall back to regular tag content
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 's');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function decodeHtmlEntities(html: string): string {
  if (!html) return '';

  // Simple entity replacements
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#?\w+;/g, (match) => {
      // Handle numeric entities
      if (match.startsWith('&#x')) {
        // Hex entity
        const hex = match.slice(3, -1);
        return String.fromCharCode(parseInt(hex, 16));
      } else if (match.startsWith('&#')) {
        // Decimal entity
        const decimal = match.slice(2, -1);
        return String.fromCharCode(parseInt(decimal, 10));
      }
      return match; // Return unhandled entities as is
    });
}
