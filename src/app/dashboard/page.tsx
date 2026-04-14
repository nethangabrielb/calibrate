"use client";

import DashboardCard from "@/app/dashboard/components/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Briefcase, TrendingUp, Trophy } from "lucide-react";

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data.");
      }
      return response.json();
    },
  });

  console.log(data);

  return (
    <div className="flex w-full flex-col gap-4 bg-background px-8 py-4 text-foreground">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Get an overview of your job applications and their performance.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
          <DashboardCard
            title="Total Applications"
            value={data?.data.totalApplications ?? "0"}
            icon={Briefcase}
          />
          <DashboardCard
            title="Average Score"
            value={`${data?.data.averageScore ?? "0"}%`}
            icon={TrendingUp}
          />
          <DashboardCard
            title="Active Applications"
            value={data?.data.activeApplications ?? "0"}
            icon={Activity}
          />
          <DashboardCard
            title="Offers"
            value={data?.data.offeredApplications ?? "0"}
            icon={Trophy}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
