import { Skeleton } from "@/components/ui/skeleton";

const JobApplicationSkeleton = () => {
  return (
    <div className="flex w-full flex-1 min-h-0 flex-col">
      <section className="flex h-fit flex-col gap-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/2" />

        <div className="mt-2 flex h-5 items-center gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-px" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-px" />
          <Skeleton className="h-4 w-36" />
        </div>

        <Skeleton className="mb-2 mt-2 h-8 w-24 rounded-full" />
      </section>

      <section className="mt-4 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden rounded-lg border border-border p-4 shadow-sm backdrop-blur-sm">
        <Skeleton className="h-6 w-52 shrink-0" />
        <div className="min-h-0 space-y-2 overflow-y-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[96%]" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[88%]" />
          <Skeleton className="h-4 w-[93%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
      </section>
    </div>
  );
};

export default JobApplicationSkeleton;
