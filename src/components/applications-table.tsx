import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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

interface ApplicationsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  applications: Application[];
}

const ApplicationsTable = ({
  applications,
  columns,
}: ApplicationsTableProps<Application, unknown>) => {
  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={
                    header.getContext().column.id === "analysisScore" ||
                    header.getContext().column.id === "status"
                      ? "text-center"
                      : ""
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    cell.column.id === "salary" ||
                      (cell.column.id === "analysisScore" && "text-center") ||
                      (cell.column.id === "status" && "text-center"),
                  )}
                >
                  {cell.column.id === "status" ? (
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        statusColors(cell.getValue() as any),
                      )}
                    >
                      {cell.getValue() as Application["status"]}
                    </span>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
              <TableCell className="text-center">
                <button className="bg-blue-400 text-white p-1 rounded-md cursor-pointer">
                  <Pencil size={18}></Pencil>
                </button>
                <button className="bg-destructive/80 text-white p-1 rounded-md ml-2 cursor-pointer">
                  <Trash size={18}></Trash>
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
