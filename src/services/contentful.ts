
import { createClient } from 'contentful';
import { Post } from '@/types/post';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
    });
    
    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      author: item.fields.author,
      publishedDate: item.fields.publishedDate,
      category: item.fields.category,
      tags: item.fields.tags || [],
      imageUrl: item.fields.featuredImage?.fields?.file?.url,
    }));
  } catch (error) {
    console.error('Error fetching posts from Contentful:', error);
    throw error;
  }
};
