import { Pencil, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/data";
import { cn } from "@/lib/utils";

import { Application } from "@/types/application";

const ApplicationsTable = ({
  applications,
}: {
  applications: Application[];
}) => {
  console.log(applications);
  const statusColors = (
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

  return (
    <Table>
      <TableCaption>A list of all your applications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-center">Salary</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Analysis Score</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.title}</TableCell>
            <TableCell>{application.company}</TableCell>
            <TableCell>{application.location}</TableCell>
            <TableCell className="text-center">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: application?.salaryCurrency || "USD",
              }).format(application?.salary || 0)}
            </TableCell>
            <TableCell>
              {application?.createdAt && formatDate(application.createdAt)}
            </TableCell>
            <TableCell>
              {application?.updatedAt && formatDate(application.updatedAt)}
            </TableCell>
            <TableCell className="text-center">
              <span
                className={cn(
                  "bg-blue-100 px-2 py-1 rounded-md",
                  statusColors(application?.status),
                )}
              >
                {application?.status}
              </span>
            </TableCell>
            <TableCell>
              {application?.analyses?.[0]?.score?.toFixed(2)}
            </TableCell>
            <TableCell>
              <button className="bg-blue-400 text-white p-1 rounded-md cursor-pointer">
                <Pencil size={18}></Pencil>
              </button>
              <button className="bg-destructive/80 text-white p-1 rounded-md ml-2 cursor-pointer">
                <Trash size={18}></Trash>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
