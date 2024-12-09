import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Twitter } from "lucide-react";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="col-span-1 md:col-span-2 bg-card rounded-3xl p-8 flex flex-col justify-between gap-4 min-h-[320px] border shadow-sm">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
            <p className="text-muted-foreground">Exploring ideas, sharing knowledge, and documenting my journey in tech and beyond.</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline w-fit"
          >
            Read the blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-8 flex flex-col justify-between border shadow-sm">
          <div className="space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Image
                src="/avatar.jpg"
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold">Stefan</h2>
            <p className="text-sm text-muted-foreground">Full-stack developer passionate about building great user experiences.</p>
          </div>
          <div className="flex gap-4 mt-4">
            <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Featured Post */}
        <div className="bg-primary rounded-3xl p-8 text-primary-foreground flex flex-col justify-between min-h-[250px]">
          <div className="space-y-2">
            <p className="text-sm font-medium">Featured Post</p>
            <h3 className="text-xl font-semibold">Building a Modern Blog with Next.js</h3>
            <p className="text-sm opacity-90">Learn how to create a full-featured blog using Next.js 13, Sanity.io, and TailwindCSS.</p>
          </div>
          <Link
            href="/blog/featured-post"
            className="inline-flex items-center gap-2 hover:underline w-fit mt-4"
          >
            Read more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories */}
        <div className="bg-card rounded-3xl p-8 border shadow-sm">
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'React', 'TypeScript', 'TailwindCSS'].map((category) => (
              <Link
                key={category}
                href={`/blog?category=${category}`}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className="bg-card rounded-3xl border shadow-sm hover:shadow-md transition-all">
          <Map
            center={[12.5683, 44.0574]}
            zoom={10}
            marker={{
              coordinates: [12.5683, 44.0574]
            }}
          />
        </div>
      </div>
    </main>
  );
}
