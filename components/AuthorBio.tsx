import Image from "next/image";
import Link from "next/link";
import { BlogPostType } from "@/types/post";

interface AuthorBioProps {
  author: NonNullable<BlogPostType['author']>;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-muted rounded-lg">
      <div className="flex items-center gap-8">
        {author.image && (
          <Image
            src={author.image}
            alt={`${author.name}'s profile picture`}
            width={200}
            height={200}
            className="w-30 rounded-full object-cover aspect-square"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">
            About{' '}
            <Link href={`/blog/author/${author.id}`} className="hover:text-purple-500 transition-colors">
              {author.name}
            </Link>
          </h2>
          {author.bio && (
            <div className="prose dark:prose-invert mt-2 font-geist">
              {author.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}