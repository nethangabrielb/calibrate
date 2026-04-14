import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/data";
import { cn } from "@/lib/utils";

import { Application } from "@/types/application";

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
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentApplicationsTable({
  applications,
}: Readonly<{
  applications: Application[];
}>) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Applied</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length ? (
          applications.map((app) => (
            <TableRow
              key={app.id}
              onClick={() => router.push(`/job-applications/${app.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{app.company}</TableCell>
              <TableCell>{app.title}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    statusStyle(app.status as Application["status"]),
                  )}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell>{formatDate(app.createdAt)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No recent applications.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
