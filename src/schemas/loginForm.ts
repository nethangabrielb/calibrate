import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ error: "Invalid email or password." }).trim(),
  password: z
    .string()
    .min(12, { error: "Invalid email or password." })
    .refine((value) => value.trim().length > 0, {
      error: "Invalid email or password.",
    }),
});
