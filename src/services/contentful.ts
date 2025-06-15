
import { createClient } from 'contentful';

// Create Contentful client
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Define interfaces for your content types
export interface BlogPost {
  fields: {
    title: string;
    slug: string;
    content: any;
    publishDate: string;
    tags?: string[];
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

// Function to get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishDate',
    });
    
    return response.items as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Function to get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (response.items.length > 0) {
      return response.items[0] as BlogPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};
