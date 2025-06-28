
import { createClient } from 'contentful';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'demo-space-id',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'demo-access-token',
});

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-sys.createdAt']
    });

    return entries.items.map((entry: any) => ({
      id: entry.sys.id,
      title: entry.fields.title || 'Untitled',
      content: entry.fields.content || '',
      date: new Date(entry.fields.publishDate || entry.sys.createdAt).toLocaleDateString(),
      author: entry.fields.author || 'Anonymous',
      image: entry.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      category: entry.fields.category || 'General'
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return mock data for development
    return [
      {
        id: '1',
        title: 'The Magic of Storytelling',
        content: 'Discover the enchanting world of magical narratives...',
        date: '2024-01-15',
        author: 'Luna Lovegood',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        category: 'Brushes and Broomsticks'
      },
      {
        id: '2',
        title: 'Potion Making for Beginners',
        content: 'Learn the basics of magical potion brewing...',
        date: '2024-01-10',
        author: 'Severus Snape',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
        category: 'Brushes and Broomsticks'
      }
    ];
  }
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      id: entry.sys.id,
      title: entry.fields.title || 'Untitled',
      content: entry.fields.content || '',
      date: new Date(entry.fields.publishDate || entry.sys.createdAt).toLocaleDateString(),
      author: entry.fields.author || 'Anonymous',
      image: entry.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      category: entry.fields.category || 'General'
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};
