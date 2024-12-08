import { Post } from "@/sanity/types";

export type PostCardType = Omit<Post, "author" | "categories"> & {
  author?: { 
    name?: string;
    slug?: {
      current?: string;
    };
   };
  categories?: Array<{ title: string, slug?: { current?: string } }>;
};

export type BlogPostType = Omit<Post, "author" | "categories"> & {
  author?: {
    name?: string;
    bio?: string;
    image?: string;
    id?: string;
  };
  categories?: Array<{ title: string; slug?: { current?: string } }>;
};