import { client } from "@/sanity/lib/client";
import { PostCard, PostCardType } from "@/components/post-card";
import { Post } from "@/types/post";
import Image from 'next/image';

export default async function BlogPage() {
    const posts: Post[] = [
      {
        _id: '12345',
        title: 'My Awesome Blog Post',
        description: 'This is a description of my post.',
        _createdAt: '2023-12-20T10:00:00Z',
        views: 100,
        author: 'John Doe',
        image: 'https://picsum.photos/1920/1080',
        category: 'Technology',
      },
      {
        _id: '123452',
        title: 'My Awesome Blog Post',
        description: 'This is a description of my post.',
        _createdAt: '2023-12-20T10:00:00Z',
        views: 100,
        author: 'John Doe',
        image: 'https://picsum.photos/1920/1080',
        category: 'Technology',
      },
      {
        _id: '123451',
        title: 'My Awesome Blog Post',
        description: 'This is a description of my post.',
        _createdAt: '2023-12-20T10:00:00Z',
        views: 100,
        author: 'John Doe',
        image: 'https://picsum.photos/1920/1080',
        category: 'Technology',
      },
    ];

    // const posts: PostCardType[] = await clien t.fetch(`*[_type == 'post']{
    //     ...,
    // author->{
    //   name
    // },
    // categories[]->{
    //     _key,
    //     title
    //   }
    // }`);



  return (
    <div className="max-w-[1920px] mx-auto py-4">
      <div className="aspect-square md:aspect-video relative">
          <Image
            src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Header Image"
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
      </div>

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