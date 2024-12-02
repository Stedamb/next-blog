import { client } from "@/sanity/lib/client";
import { PostCard, PostCardType } from "@/components/post-card";

export default async function BlogPage() {
  const posts: PostCardType[] = await client.fetch(`*[_type == 'post']{
    ...,
    author->{
      name
    },
    categories[]->{
      _key,
      title
    }
  }`);

  return (
    <div className="max-w-4xl mx-auto py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-mono text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, stories, and ideas.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}