import z from "zod";

export const AnalysisSchema = z.object({
  id: z.number(),
  jobId: z.number(),
  score: z.float64(),
  matchingSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  recommendation: z.string(),
  createdAt: z.string(),
});
