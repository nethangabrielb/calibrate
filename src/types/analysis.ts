import z from "zod";

import { AnalysisSchema } from "@/schemas/analysis";

export type Analysis = z.infer<typeof AnalysisSchema>;
