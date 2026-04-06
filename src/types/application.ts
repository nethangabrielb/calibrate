import z from "zod";

import {
  ApplicationFormSchema,
  ApplicationSchema,
} from "@/schemas/application";

export type ApplicationFormData = z.infer<typeof ApplicationFormSchema>;
export type Application = z.infer<typeof ApplicationSchema>;
