import z from "zod";

export const FlowSchema = z
  .object({
    command: z.string(),
    description: z.string().optional(),
    schema: z.string().optional(),
  })
  .loose();

export type FlowType = z.infer<typeof FlowSchema>;
