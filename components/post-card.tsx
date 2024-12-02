import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/sanity/types";

export type PostCardType = Omit<Post, "author" | "categories"> & {
  author?: { name?: string };
  categories?: Array<{ _key: string; title: string }>;
};

export function PostCard({ post }: { post: PostCardType }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      {post.image && (
        <div className="aspect-video relative">
          <Image
            src={post.image}
            alt={post.title || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {post.body && (
          <p className="text-muted-foreground line-clamp-3">{post.body}</p>
        )}
        {post.categories && post.categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category._key}
                className="rounded-full bg-muted px-2 py-1 text-xs"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={`/blog/${post.slug?.current}`}
          className="text-sm font-medium hover:underline"
        >
          Read more →
        </Link>
        {post.author?.name && (
          <span className="text-sm text-muted-foreground">
            By {post.author.name}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
