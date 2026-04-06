"use client";

import { useQuery } from "@tanstack/react-query";

import ApplicationsTable from "@/components/applications-table";
import ApplicationsTableSkeleton from "@/components/applications-table-skeleton";

const JobApplication = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await fetch("/api/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      return response.json();
    },
  });

  return (
    <div className="flex h-screen w-full py-4 px-8 bg-background text-foreground flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Job Applications</h1>
        <p>Manage your job applications in one place.</p>
      </div>
      {data && <ApplicationsTable applications={data.data} />}
      {isLoading && <ApplicationsTableSkeleton />}
    </div>
  );
};

export default JobApplication;
