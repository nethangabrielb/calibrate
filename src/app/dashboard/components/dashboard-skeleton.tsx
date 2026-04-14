import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  const cardKeys = ["card-1", "card-2", "card-3", "card-4"];
  const rowKeys = ["row-1", "row-2", "row-3", "row-4", "row-5"];

  return (
    <div className="flex w-full flex-col gap-4 bg-background px-8 py-4 text-foreground">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Get an overview of your job applications and their performance.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {cardKeys.map((cardKey) => (
            <div
              key={cardKey}
              className="w-full rounded-md border border-l-4 border-l-primary border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="size-4 rounded-sm" />
              </div>
              <Skeleton className="mt-3 h-8 w-20" />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-2">
          <div className="flex min-h-[320px] w-full flex-col rounded-lg border border-border bg-card p-4 shadow-sm backdrop-blur-lg">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="mt-2 h-4 w-64" />

            <div className="mt-6 flex h-full items-end gap-3">
              <Skeleton className="h-[35%] w-full rounded-md" />
              <Skeleton className="h-[55%] w-full rounded-md" />
              <Skeleton className="h-[45%] w-full rounded-md" />
              <Skeleton className="h-[70%] w-full rounded-md" />
              <Skeleton className="h-[52%] w-full rounded-md" />
              <Skeleton className="h-[64%] w-full rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-sm backdrop-blur-lg">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-sm" />

          <div className="grid grid-cols-4 gap-4 border-b border-border bg-muted/40 px-4 py-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="divide-y divide-border">
            {rowKeys.map((rowKey) => (
              <div key={rowKey} className="grid grid-cols-4 gap-4 px-4 py-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardSkeleton;
