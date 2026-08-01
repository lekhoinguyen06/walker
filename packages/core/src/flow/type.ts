import z from "zod";
import { ActionSchema } from "../action/type";

export const HandlerFactory = z.function({
  input: [ActionSchema],
  output: z.void(),
});

export const FlowSchema = z.object({
  command: z.string(),
  description: z.string(),
  route: z.string().or(z.literal("*")),
  handler: z.function({
    input: [ActionSchema],
    output: z.void(),
  }),
});

export type FlowType = z.infer<typeof FlowSchema>;
