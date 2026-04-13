import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Analysis } from "@/types/analysis";

export const AnalysisPanel = ({
  analysis,
  children,
}: {
  analysis: Analysis;
  children?: ReactNode;
}) => {
  const scoreStyle = (score: number) => {
    if (score >= 80) return "strong";
    if (score >= 60) return "moderate";
    if (score >= 40) return "partial";
    return "weak";
  };

  const scoreColors: Record<string, string> = {
    strong: "bg-teal-600",
    moderate: "bg-amber-600",
    partial: "bg-orange-600",
    weak: "bg-destructive",
  };

  return (
    <div className="flex flex-col gap-3 ">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-muted/30 px-5 py-4">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Score
          </span>
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-full text-xl font-medium text-white",
              scoreColors[scoreStyle(analysis?.score ?? 0)],
            )}
          >
            {analysis?.score}
          </div>
        </div>

        <div className="rounded-xl border border-border/70 bg-background p-4">
          <p className="text-[13px] font-medium">Recommendation</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            {analysis?.recommendation}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row flex-wrap">
        <SkillsCard
          title="Matching skills"
          skills={analysis?.matchingSkills}
          variant="match"
          emptyText="No matching skills found."
        />
        <SkillsCard
          title="Missing skills"
          skills={analysis?.missingSkills}
          variant="miss"
          emptyText="No gaps — perfect match."
        />
      </div>
      {children}
    </div>
  );
};

const SkillsCard = ({
  title,
  skills,
  variant,
  emptyText,
}: {
  title: string;
  skills?: string[];
  variant: "match" | "miss";
  emptyText: string;
}) => {
  const pillStyle =
    variant === "match"
      ? "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300"
      : "border-destructive/40 bg-destructive/10 text-destructive dark:bg-destructive/20";

  const countStyle =
    variant === "match"
      ? "bg-teal-500/10 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300"
      : "bg-destructive/10 text-destructive dark:bg-destructive/20";

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/70 bg-background px-3.5 py-2.5">
        <p className="text-[13px] font-medium">{title}</p>
        {!!skills?.length && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              countStyle,
            )}
          >
            {skills.length}
          </span>
        )}
      </div>

      {/* Scrollable body */}
      <div className="max-h-40 overflow-y-auto px-3.5 py-2.5 subtle-scrollbar">
        {skills?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[12px] font-medium whitespace-nowrap",
                  pillStyle,
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-muted-foreground">{emptyText}</p>
        )}
      </div>
    </div>
  );
};
