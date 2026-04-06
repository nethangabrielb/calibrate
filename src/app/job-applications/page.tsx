"use client";

import { useQuery } from "@tanstack/react-query";

import ApplicationsTable from "@/components/applications-table";
import ApplicationsTableSkeleton from "@/components/applications-table-skeleton";
import { columns } from "@/components/columns";
import { Button } from "@/components/ui/button";

const JobApplication = () => {
  const { data, isLoading } = useQuery({
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
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-6 bg-background px-8 py-4 text-foreground">
      <section className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Job Applications</h1>
          <p>Manage your job applications in one place.</p>
        </div>
        <Button className="w-fit">New Application</Button>
      </section>
      <div className="min-h-0 flex-1">
        {data && (
          <ApplicationsTable applications={data.data} columns={columns} />
        )}
        {isLoading && <ApplicationsTableSkeleton />}
      </div>
    </div>
  );
};

export default JobApplication;
