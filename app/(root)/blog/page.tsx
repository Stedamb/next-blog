import Image from "next/image";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/sanity";
import { FilterControls } from "@/components/FilterControls";

export default async function BlogPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { category, author, sort } = searchParams;

  const posts = await getAllPosts({
    category,
    author,
    sortBy: sort as 'latest' | 'oldest' | 'title',
  });

  return (
    <div className="max-w-[1920px] mx-auto py-4">
      <div className="h-[calc(50vh-2rem)] relative">
        <Image
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blog Header Image"
          fill
          className="object-cover rounded-lg"
          priority
          sizes="100vw"
        />
        <div className="absolute left-1/2 top-[45%] sm:top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-purple-300 text-8xl sm:text-9xl font-clash font-medium">
            BLOG
          </h1>
        </div>
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full">
          <FilterControls
            currentCategory={category}
            currentAuthor={author}
            currentSort={sort}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 lg:mt-8">
          {posts.map((post) => (
            <PostCard key={post.slug?.current} post={post} />
          ))}
          {posts.length === 0 && (
            <p className="col-span-2 text-center text-muted-foreground">
              No posts found with the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}