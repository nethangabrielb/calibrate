import * as z from "zod";

import { ApplicationFormData } from "@/types/application";

export const ApplicationFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title too short")
    .max(200, "Title too long")
    .refine((value) => value.trim().length > 0, "Title cannot be empty"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description too long")
    .refine((value) => value.trim().length > 0, "Description cannot be empty"),
  company: z
    .string()
    .min(2, "Company name too short")
    .max(100, "Company name too long")
    .refine((value) => value.trim().length > 0, "Company name cannot be empty"),
  location: z
    .string()
    .min(2, "Location too short")
    .max(100, "Location too long"),
  salary: z
    .number()
    .refine(
      (value) => typeof value === "number" && value >= 0,
      "Salary must be a positive number",
    )
    .optional(),
  salaryCurrency: z
    .string()
    .length(3, "Currency must be 3 letters")
    .regex(/^[A-Z]{3}$/, "Use ISO 4217 code (e.g., USD)")
    .optional(),
  status: z.enum(["APPLIED", "INTERVIEWING", "OFFERED", "REJECTED"]),
});

export const ApplicationStatusSchema = z.enum([
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
]);

export const ApplicationSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string(),
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().nullable(),
  salary: z.number().int().positive().nullable(),
  salaryCurrency: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: ApplicationStatusSchema,
  analyses: z.array(z.object({ score: z.number().min(0).max(100) })).optional(),
});

export type FormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
        location?: string[];
        company?: string[];
        salary?: string[];
        salaryCurrency?: string[];
      };
      message?: string;
      error?: any;
      data?: ApplicationFormData;
      success?: boolean;
    }
  | undefined;
