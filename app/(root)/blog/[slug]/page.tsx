import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import markdownit from "markdown-it";
import { generateBlogPostMetadata } from "@/lib/metadata";
import { getPost } from "@/lib/sanity";
import { AuthorBio } from "@/components/AuthorBio";
import { Skeleton } from "@/components/ui/skeleton";

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

export const dynamicParams = true;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  return generateBlogPostMetadata(post);
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Add 2 second delay
  if (!post) {
    return notFound();
  }
  const mdBody = post.body ? md.render(post.body) : null;

  return (
    <article className="relative max-w-[1920px] mx-auto py-4">
      <div className={`h-[calc(50vh-2rem)] relative ${post.image ? 'mb-44' : ''}`}>
        <Skeleton className="absolute inset-0 rounded-lg" />
        <Image
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Header Image"
          fill
          className="object-cover rounded-md"
          priority
          sizes="100vw"
        />

        {/* Hero Section */}
        {post.image ? (
          <div className="relative w-full max-w-3xl h-[calc(50vh-2rem)] top-32 lg:aspect-video mx-auto">
            <Image
              src={post.image}
              alt="Header Image"
              fill
              className="object-cover rounded-lg skeleton-loading"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg border-2 border-purple-500" />

            <header className="absolute bottom-0 left-1/2 px-4 mb-8 w-full text-center transform -translate-x-1/2">
              <h1 className="mb-4 text-4xl font-medium text-purple-200 md:text-6xl lg:text-8xl font-clash">
                {post.title}
              </h1>
              <div className="flex flex-col justify-center items-center font-mono text-base text-purple-200 md:flex-row md:gap-4 md:text-lg">
                {post.author?.name && (
                  <div className="flex gap-2">
                    By
                    <Link
                      href={`/blog/author/${post.author.id}`}
                      className="transition-colors hover:text-purple-400"
                    >
                      {post.author.name}
                    </Link>
                  </div>
                )}
                <span className="hidden md:block">•</span>
                <time dateTime={post._createdAt} className="text-purple-200/90">
                  {format(new Date(post._createdAt), "MMMM d, yyyy")}
                </time>
              </div>
            </header>
          </div>
        ) : (
          <header className="absolute bottom-0 left-1/2 z-10 mb-8 text-center transform -translate-x-1/2">
            <h1 className="mb-4 text-4xl font-medium text-purple-200 md:text-6xl lg:text-8xl font-clash">
              {post.title}
            </h1>
            <div className="flex flex-col justify-center items-center font-mono text-base text-purple-200 md:flex-row lg:gap-4 md:text-lg">
              {post.author?.name && (
                <div className="flex gap-2">
                  By
                  <Link
                    href={`/blog/author/${post.author.id}`}
                    className="transition-colors hover:text-purple-400"
                  >
                    {post.author.name}
                  </Link>
                </div>
              )}
              <span className="hidden md:block">•</span>
              <time dateTime={post._createdAt} className="text-purple-200/90">
                {format(new Date(post._createdAt), "MMMM d, yyyy")}
              </time>
            </div>
          </header>
        )}
      </div>

      {/* Main Content */}
      <div className="px-4 mx-auto max-w-2xl">
        <div className="prose prose-xl dark:prose-invert font-geist prose-a:text-purple-500 hover:prose-a:text-purple-600 dark:hover:prose-a:text-purple-400 prose-a:transition-colors">
          {mdBody && <div dangerouslySetInnerHTML={{ __html: mdBody }} />}
        </div>
      </div>

      {/* Author Bio */}
      {post.author?.bio && <AuthorBio author={post.author} />}
    </article>
  );
}
