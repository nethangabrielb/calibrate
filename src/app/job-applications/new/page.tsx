"use client";

import { createApplication } from "@/actions/application";
import ApplicationForm from "@/app/job-applications/components/application-form";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

const NewJobApplicationPage = () => {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-6 bg-background px-8 py-4 text-foreground">
      <section className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium">New Application</h1>
          <p className="text-sm text-muted-foreground">
            Add a new job application to your tracker by filling out the form
            below.
          </p>
        </div>
        <Link
          href="/job-applications"
          className="text-sm underline-offset-4 hover:underline flex gap-1 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="leading-none select-none">Back to applications</span>
        </Link>
      </section>

      {/* Form scaffold is intentionally non-final so implementation can be added later. */}
      <ApplicationForm formAction={createApplication} />
    </div>
  );
};

export default NewJobApplicationPage;
