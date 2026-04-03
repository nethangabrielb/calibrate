import * as z from "zod";

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters long." })
      .trim(),
    email: z.email({ error: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(12, { error: "Be at least 12 characters long" })
      .regex(/[a-zA-Z]/, { error: "Must contain at least one letter." })
      .regex(/[0-9]/, { error: "Must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Must contain at least one special character.",
      })
      .trim()
      .refine((value) => value.trim().length > 0, {
        error: "Must not be empty.",
      }),
    confirmPassword: z.string().refine((value) => value.trim().length > 0, {
      error: "Must not be empty.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
