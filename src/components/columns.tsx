"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDate } from "@/lib/data";

import { Application } from "@/types/application";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location ?? "-",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = row.original.salary;

      if (salary == null) {
        return "-";
      }

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.salaryCurrency ?? "USD",
        maximumFractionDigits: 0,
      }).format(salary);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "analysisScore",
    header: "Analysis Score",
    cell: ({ row }) => {
      const score = row.original.analyses?.[0]?.score;
      if (score == null) {
        return "-";
      }

      return `${score.toFixed(2)}%`;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem className="flex items-center gap-2 py-1.5 cursor-pointer transition-all">
              <Pencil className="h-4 w-4 shrink-0" />
              <span className="leading-none select-none">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 py-1.5 cursor-pointer transition-all text-destructive">
              <Trash className="h-4 w-4 shrink-0 text-destructive" />
              <span className="leading-none select-none text-destructive">
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
