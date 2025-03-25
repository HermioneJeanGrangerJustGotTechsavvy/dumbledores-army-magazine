
import { createClient } from 'contentful';
import { BlogPost } from '@/pages/Writing';

const client = createClient({
  space: 'YOUR_SPACE_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
});

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      author: item.fields.author,
      date: new Date(item.fields.date).toLocaleDateString(),
      image: item.fields.image?.fields?.file?.url || 'https://images.unsplash.com/photo-1456513080867-f24f120351fc',
      content: item.fields.content,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};
