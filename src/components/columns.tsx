"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
