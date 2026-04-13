import { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonAnalysisPanel = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const chips = ["chip-1", "chip-2", "chip-3", "chip-4", "chip-5"];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-muted/30 px-5 py-4">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Score
          </span>
          <Skeleton className="size-16 rounded-full" />
        </div>

        <div className="rounded-xl border border-border/70 bg-background p-4">
          <Skeleton className="h-4 w-28" />
          <div className="mt-2 flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-[90%]" />
            <Skeleton className="h-3.5 w-[75%]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-4 md:flex-row">
        <SkillsCardSkeleton title="Matching skills" chips={chips} />
        <SkillsCardSkeleton title="Missing skills" chips={chips.slice(0, 4)} />
      </div>

      {children}
    </div>
  );
};

const SkillsCardSkeleton = ({
  title,
  chips,
}: {
  title: string;
  chips: string[];
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/70 bg-background px-3.5 py-2.5">
        <p className="text-[13px] font-medium">{title}</p>
        <Skeleton className="h-5 w-7 rounded-full" />
      </div>

      <div className="max-h-40 overflow-y-auto px-3.5 py-2.5 subtle-scrollbar">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <Skeleton key={chip} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonAnalysisPanel;
