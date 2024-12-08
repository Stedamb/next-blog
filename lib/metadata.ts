import { Metadata } from "next";
import { BlogPostType } from "@/types/post";

export function generateBlogPostMetadata(post: BlogPostType): Metadata {
  return {
    title: `${post.title} | Next Blog`,
    description: post.description || post.body?.slice(0, 160),
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.title,
      description: post.description || post.body?.slice(0, 160),
      type: 'article',
      publishedTime: post._createdAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      ...(post.image && {
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.body?.slice(0, 160),
      ...(post.image && {
        images: [post.image],
      }),
    },
  };
}
