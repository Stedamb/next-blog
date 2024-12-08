import { client } from "@/sanity/lib/client";
import { BlogPostType, PostCardType } from "@/types/post";

interface GetAllPostsParams {
  category?: string;
  author?: string;
  sortBy?: 'latest' | 'oldest' | 'title';
}

export async function getAllPosts(params?: GetAllPostsParams): Promise<PostCardType[]> {
  let query = `*[_type == "post"`;
  const queryParams: Record<string, string> = {};

  // Add category filter
  if (params?.category) {
    query += ` && $category in categories[]->slug.current`;
    queryParams.category = params.category;
  }

  // Add author filter
  if (params?.author) {
    query += ` && author->slug.current == $author`;
    queryParams.author = params.author;
  }

  // Add sorting
  query += `] | order(`;
  switch (params?.sortBy) {
    case 'oldest':
      query += `_createdAt asc`;
      break;
    case 'title':
      query += `title asc`;
      break;
    default: // latest by default
      query += `_createdAt desc`;
  }
  query += `) {
    title,
    description,
    slug,
    _createdAt,
    image,
    author->{
      name,
      id,
      image,
      slug
    },
    categories[]->{
      title,
      slug
    }
  }`;

  const posts = await client.fetch<PostCardType[]>(
    query,
    queryParams
  );

  return posts;
}

export async function getPost(slug: string): Promise<BlogPostType> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    description,
    body,
    slug,
    _createdAt,
    image,
    author->{
      name,
      id,
      image,
      bio,
      slug
    },
    categories[]->{
      title,
      slug
    }
  }`;

  const post = await client.fetch(query, { slug });
  return post;
}
