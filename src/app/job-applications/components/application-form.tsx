"use client";

import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { TextField } from "@/components/input";

import { FormState } from "@/schemas/application";

import { Application } from "@/types/application";

const ApplicationForm = ({
  formAction,
  data,
}: {
  formAction: (state: FormState, formData: FormData) => Promise<FormState>;
  data?: Application;
}) => {
  const router = useRouter();
  const [state, action, pending] = useActionState<FormState, FormData>(
    formAction,
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      // Reset form on successful submission
      const form = document.querySelector("form");
      form?.reset();
      toast.success("Application saved successfully!");
      router.push("/job-applications");
    }
  }, [state]);

  return (
    <section aria-labelledby="application-form-heading" className="space-y-4">
      <form action={action} className="space-y-4" aria-busy={pending}>
        {/* Scaffold placeholder: company details (name, role, location). */}
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground flex flex-col gap-4">
          <div className="flex gap-4">
            <TextField
              label="Company Name"
              error={state?.errors?.company?.[0]}
              required
              name="company"
              defaultValue={state?.data?.company ?? data?.company ?? ""}
            ></TextField>
            <TextField
              label="Job Title"
              error={state?.errors?.title?.[0]}
              defaultValue={state?.data?.title ?? data?.title ?? ""}
              required
              name="title"
            ></TextField>
          </div>
          <TextField
            label="Job Description"
            type="textarea"
            error={state?.errors?.description?.[0]}
            defaultValue={state?.data?.description ?? data?.description ?? ""}
            name="description"
            required
          ></TextField>
          <div className="flex gap-4">
            <TextField
              label="Location"
              error={state?.errors?.location?.[0]}
              className="flex-1"
              name="location"
              defaultValue={state?.data?.location ?? data?.location ?? ""}
            ></TextField>
            <TextField
              label="Salary"
              type="number"
              error={state?.errors?.salary?.[0]}
              name="salary"
              defaultValue={state?.data?.salary ?? data?.salary ?? ""}
              defaultCurrency={
                state?.data?.salaryCurrency ?? data?.salaryCurrency ?? "USD"
              }
              className="flex-1"
            ></TextField>
          </div>
        </div>

        {/* Scaffold placeholder: swap in project Button and pending state handling. */}
        <button
          type="submit"
          className="rounded-md border px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50 disabled:hover:bg-primary/50 transition"
          disabled={pending}
        >
          {pending ? "Saving..." : "Save Application"}
        </button>

        {state?.message ? (
          <p className="text-sm text-muted-foreground">{state.message}</p>
        ) : null}
      </form>
    </section>
  );
};

export default ApplicationForm;
