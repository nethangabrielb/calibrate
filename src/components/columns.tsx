"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import Link from "next/link";

import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "salary",
    enableGlobalFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto px-1 py-1 whitespace-normal!"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Salary
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
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
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto px-1 py-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.original.createdAt),
    enableGlobalFilter: false,
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => formatDate(row.original.updatedAt),
    enableGlobalFilter: false,
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "analysisScore",
    accessorFn: (row) => row.analyses?.[0]?.score ?? null,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto px-1 py-1"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Analysis Score
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const score = row.original.analyses?.[0]?.score;
      if (score == null) {
        return "-";
      }

      return `${score.toFixed(2)}%`;
    },
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableGlobalFilter: false,
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

            <DropdownMenuItem className="w-full cursor-pointer" asChild>
              <Link
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 py-1.5 cursor-pointer transition-all w-full"
                href={`/job-applications/edit/${row.original.id}`}
              >
                <Pencil className="h-4 w-4 shrink-0" />
                <span className="leading-none select-none">Edit</span>
              </Link>
            </DropdownMenuItem>
            <DeleteDialog applicationId={row.original.id}></DeleteDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    // Always visible
  },
];
