import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostCardType } from "@/types/post";

export function PostCard({ post }: { post: PostCardType }) {
  return (
    <Card className="relative flex flex-col overflow-hidden z-10 transition-all duration-200 group hover:border-purple-500 hover:shadow-[0_0_200px_-5px_rgba(168,85,247,0.3)]">
        <Link href={`/blog/${post.slug?.current}`} className="absolute z-20 w-full h-full"/>
          <div className="relative z-10 aspect-video">
            <Image
              src={post.image || "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt={post.title || "Post title"}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            />
          </div>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-2xl">
            {post.title}
          </CardTitle>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge
                  key={category.title}
                  variant="secondary"
                  className="z-30 text-sm text-purple-700 bg-purple-500/10 dark:bg-purple-500/20 dark:text-purple-300"
                >
                  <Link href={`/blog/category/${category.slug?.current}`}>
                    {category.title}
                  </Link>
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow">
          {post.description && (
            <p className="text-muted-foreground font-geist line-clamp-3">
              {post.description}
            </p>
          )}

        </CardContent>
        <CardFooter className="flex justify-between">
          {post.author?.name && (
            <span className="z-30 font-mono text-sm text-muted-foreground">
              By
              <Link href={`/blog/author/${post.author?.slug?.current}`}>
                <span className="ml-2 font-medium text-primary hover:underline">
                  {post.author.name}
                </span>
              </Link>
            </span>
          )}
          <span className="z-30 font-mono text-sm font-medium hover:underline">
            <Link href={`/blog/${post.slug?.current}`}>
              Read more &rarr;
            </Link>
          </span>
        </CardFooter>
      </Card>
  );
}
