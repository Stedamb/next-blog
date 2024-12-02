import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-14 w-[200px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="flex flex-col overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="flex-1">
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
