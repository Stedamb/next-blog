import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Map from "@/components/Map";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const techColors = [
    { tech: "Next.js", color: "bg-gray-500/20 text-gray-600 dark:text-gray-200" },
    { tech: "Astro", color: "bg-red-500/30 text-red-600 dark:text-gray-200" },
    { tech: "MongoDB", color: "bg-green-500/30 text-green-600 dark:text-green-400" },
    { tech: "React", color: "bg-blue-500/30 text-blue-600 dark:text-blue-400" },
    { tech: "TypeScript", color: "bg-blue-500/40 text-white dark:text-gray-300" },
    { tech: "Sanity", color: "bg-red-500/30 text-red-600 dark:text-red-400" },
    { tech: "Three.js", color: "bg-gray-500/20 text-gray-600 dark:text-gray-200" },
    { tech: "Motion", color: "bg-yellow-500/30 text-yellow-600 dark:text-gray-200" },
  ];

  return (
    <main className="min-h-screen">
      <AnimatedGridPattern></AnimatedGridPattern>
      <div className="relative top-36 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto z-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-blur col-span-1 md:col-span-2 rounded-3xl p-8 flex flex-col justify-between gap-4 min-h-[320px] border card-hover">
          <div className="flex flex-col justify-center h-full gap-4">
            <GradualSpacing className="text-4xl md:text-7xl font-clash font-medium" text={"Welcome"} />
            <GradualSpacing className="text-xl md:text-2xl font-clash text-muted-foreground font-medium" text={"to my"} />
            <GradualSpacing className="text-xl md:text-2xl font-clash text-muted-foreground font-medium" text={"personal website"} />
          </div>
          {/* <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline w-fit"
          >
            Read the blog <ArrowRight className="w-4 h-4" />
          </Link> */}
          <Image
            src="/coder.svg"
            alt="Profile"
            width={48}
            height={48}
            className="absolute right-0 bottom-0 sm:right-[-100px] w-[500px]"
          />
        </div>

        {/* Profile Card */}
        <div className="bg-blur card-hover rounded-3xl p-4 grid grid-cols-1 md:grid-cols-2 border gap-4">
          <Link href={"https://video-journal.vercel.app/"} className="border card-hover rounded-3xl overflow-hidden">
            <Image
              src="/videoJournal.png"
              alt="Project Image"
              width={640}
              height={640}
              className="size-full object-cover"
            />
          </Link>
          <Link href={"https://my-personal-journal.vercel.app/"} className="border card-hover rounded-3xl overflow-hidden">
            <Image
              src="/personalJournal.png"
              alt="Project Image"
              width={640}
              height={640}
              className="size-full object-cover"
            />
          </Link>
            <Link href={"https://videojournal.vercel.app/"} className="w-full flex justify-center items-center col-span-2 bg-muted rounded-3xl hover:bg-purple-500/20 hover:text-primary-foreground border card-hover transition-colors">
              <h3 className="text-xl font-semibold">All Projects</h3>
            </Link>
        </div>

        {/* Featured Post */}
        <div className="bg-blur card-hover border rounded-3xl p-8 flex flex-col justify-between min-h-[250px]">
          <div className="space-y-2">
            <p className=" font-mono font-bold opacity-95">Featured Post</p>
            <h3 className="text-xl font-semibold text-balance">How this blog was built with Next.js and Sanity</h3>
            <p className="text-muted-foreground text-base opacity-90">Learn how to create a full-featured blog using Next.js 13, Sanity.io, and TailwindCSS.</p>
          </div>
          <Link
            href="/blog/featured-post"
            className="inline-flex items-center gap-2 hover:underline w-fit mt-4"
          >
            Read more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Technologies */}
        <div className="bg-blur card-hover rounded-3xl p-8 border shadow-sm">
          <h3 className="font-mono font-bold mb-4">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {techColors.map(({ tech, color }) => (
              <Badge
                key={tech}
                variant="no_color"
                className={`${color} text-lg py-3 px-4 flex-grow justify-center`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className="bg-card rounded-3xl border card-hover">
          <Suspense fallback={<Skeleton className="size-full border-3xl"></Skeleton>}>

            <Map
              center={[12.5683, 44.0574]}
              zoom={10}
              marker={{
                coordinates: [12.5683, 44.0574]
              }}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
