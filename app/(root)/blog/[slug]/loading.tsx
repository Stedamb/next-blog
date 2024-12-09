import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="max-w-[1920px] h-[calc(50vh-2rem)]" />
      <div className="max-w-2xl mx-2 sm:mx-auto w-full space-y-4 mt-8">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-2 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <div className="space-y-2 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-[97%]" />
          ))}
        </div>
        <div className="space-y-2 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-[95%]" />
          ))}
        </div>
      </div>
    </div>
  );
}
