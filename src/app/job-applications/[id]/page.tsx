"use client";

import { AnalysisPanel } from "@/app/job-applications/components/analysis-panel";
import JobApplicationSkeleton from "@/app/job-applications/components/job-application-skeleton";
import SkeletonAnalysisPanel from "@/app/job-applications/components/skeleton-analysis-panel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, MapPin } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { use } from "react";

import Link from "next/link";

import { CreateAnalysisDialog } from "@/components/create-analysis-dialog";
import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/lib/data";
import { cn } from "@/lib/utils";

import { Analysis } from "@/types/analysis";
import { Application } from "@/types/application";

const ResumeSchema = z.object({
  resume: z
    .string()
    .min(10, "Resume must be at least 10 characters long")
    .refine((val) => val.trim().length > 0, "Resume cannot be empty"),
});

type ResumeFormData = z.infer<typeof ResumeSchema>;

const JobApplication = ({ params }: { params: Promise<{ id: string }> }) => {
  const queryClient = useQueryClient();
  const { id } = use(params);

  const { data, isPending: applicationPending } = useQuery<Application>({
    queryKey: ["application", id],
    queryFn: async () => {
      const res = await fetch(`/api/applications/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch application data");
      }

      const json = await res.json();

      return json.data[0] as Application;
    },
    enabled: !!id,
  });

  const { data: analyses, isPending: analysisPending } = useQuery<{
    success: boolean;
    data: Analysis[];
  }>({
    queryKey: ["analyses", id],
    queryFn: async () => {
      const res = await fetch(`/api/analysis/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch analyses");
      }

      const json = await res.json();

      return json;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(ResumeSchema),
  });

  const statusStyle = (
    status: "APPLIED" | "INTERVIEWING" | "OFFERED" | "REJECTED",
  ) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-800";
      case "INTERVIEWING":
        return "bg-yellow-100 text-yellow-800";
      case "OFFERED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const onSubmit: SubmitHandler<ResumeFormData> = async (_data) => {
    const resume = _data.resume;

    const res = await fetch(`/api/analysis/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume }),
    });

    if (!res.ok) {
      console.error("Failed to run analysis");
      return;
    }

    const json = await res.json();

    if (json.success) {
      queryClient.invalidateQueries({ queryKey: ["analyses", id] });
      toast.success(json.message || "Analysis created successfully!");
    } else {
      toast.error(json.message || "Failed to run analysis");
    }
  };

  const analysisContent = (() => {
    if (analysisPending) {
      return <SkeletonAnalysisPanel />;
    }

    if (analyses && analyses?.data?.length > 0) {
      return (
        <AnalysisPanel analysis={analyses?.data?.[0]}>
          <div className="flex flex-col items-center justify-center gap-3 px-5 py-3">
            <CreateAnalysisDialog
              register={register}
              errors={errors}
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              buttonText="Re-run AI Analysis"
            />
          </div>
        </AnalysisPanel>
      );
    }

    return (
      <div className="flex flex-1 flex-col justify-center items-center px-5 py-8 gap-4">
        <p className="max-w-md text-sm leading-6 text-muted-foreground text-center">
          It seems this application does not have any AI analysis available yet.
          Click the button below to run an AI analysis on this application and
          get insights on how to improve it.
        </p>
        <CreateAnalysisDialog
          register={register}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </div>
    );
  })();

  return (
    <div className="flex h-screen w-full min-w-0 gap-6 bg-background px-8 py-4 text-foreground">
      {applicationPending ? (
        <JobApplicationSkeleton />
      ) : (
        <div className="flex w-full flex-col flex-1 min-h-0">
          <section className="flex flex-col gap-2 h-fit">
            <h1 className="font-medium text-2xl">{data?.title}</h1>
            <h3 className="text-[16px] font-normal text-secondary-foreground">
              {data?.company}
            </h3>

            <div className="flex items-center gap-4 mt-2 h-5 text-[14px]">
              {data?.location && (
                <>
                  <div className="text-black/70 flex items-center gap-1">
                    <MapPin className="inline-block h-4 w-4" />
                    <p>{data?.location}</p>
                  </div>
                  <Separator orientation="vertical" />
                </>
              )}
              {data?.salary && (
                <>
                  <div className="text-black/70 flex items-center gap-1">
                    <p>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: data?.salaryCurrency ?? "USD",
                        maximumFractionDigits: 0,
                      }).format(data?.salary)}
                    </p>
                  </div>
                  <Separator orientation="vertical" />
                </>
              )}
              {data?.createdAt && (
                <div className="text-black/70 flex items-center gap-1">
                  <p>Applied on {formatDate(data?.createdAt)}</p>
                </div>
              )}
            </div>
            <div
              className={cn(
                "px-4 py-2 rounded-full text-[12px] font-semibold w-fit mt-2 mb-2",
                statusStyle(data?.status as Application["status"]),
              )}
            >
              {data?.status}
            </div>
          </section>
          <section className="flex flex-col gap-2 mt-4 border border-border rounded-lg p-4 min-h-0 flex-1 overflow-hidden shadow-sm backdrop-blur-sm">
            <h1 className="text-xl font-medium shrink-0">
              Full Job Description
            </h1>
            <p className="font-light overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border/70 scrollbar-track-transparent">
              {data?.description}
            </p>
          </section>
        </div>
      )}

      {/* AI Analysis Section */}
      <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-lg backdrop-blur-sm">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-medium tracking-tight">AI Analysis</h1>
          <Link
            href="/job-applications"
            className="group flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="select-none leading-none">
              Back to applications
            </span>
          </Link>
        </header>

        {analysisContent}
      </div>
    </div>
  );
};

export default JobApplication;
