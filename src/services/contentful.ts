
import { createClient } from 'contentful';

// Create Contentful client
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Define interfaces for Contentful content types
export interface ContentfulBlogPost {
  fields: {
    title: string;
    slug: string;
    content: any;
    publishDate: string;
    tags?: string[];
    category?: string;
    author?: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
  sys: {
    id: string;
  };
}

// Define the interface that matches what Art.tsx expects
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  month?: string;
  year?: string;
}

// Function to transform Contentful data to our BlogPost format
const transformContentfulPost = (contentfulPost: any): BlogPost => {
  return {
    id: contentfulPost.sys.id,
    title: contentfulPost.fields.title || '',
    content: contentfulPost.fields.content || '',
    date: contentfulPost.fields.publishDate || new Date().toISOString(),
    author: contentfulPost.fields.author || 'Unknown Author',
    image: contentfulPost.fields.featuredImage?.fields?.file?.url ? 
           `https:${contentfulPost.fields.featuredImage.fields.file.url}` : '',
    category: contentfulPost.fields.category || 'General',
  };
};

// Function to get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
    });
    
    return response.items.map(transformContentfulPost);
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
      return transformContentfulPost(response.items[0]);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};
