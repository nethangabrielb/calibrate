import * as z from "zod";

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
  salary: z.number().positive("Salary must be greater than 0").optional(),
  salaryCurrency: z
    .string()
    .length(3, "Currency must be 3 letters")
    .regex(/^[A-Z]{3}$/, "Use ISO 4217 code (e.g., USD)")
    .optional(),
});

type ApplicationFormData = z.infer<typeof ApplicationFormSchema>;

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
