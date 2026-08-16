import z from "zod";
import { ActionSchema } from "../action/type";
import { ConfigSchema } from "../config/type";
import { HooksSchema } from "../hook/type";

export const HandlerFactory = z.function({
  input: [
    z.object({
      action: ActionSchema,
      context: z.object({
        config: ConfigSchema,
        hooks: HooksSchema,
      }),
    }),
  ],
  output: z.promise(z.void()),
});

export const FlowSchema = z.object({
  command: z.string(),
  description: z.string(),
  route: z.string().or(z.literal("*")),
  // schema: z.custom<z.ZodType>().optional(),
  handler: HandlerFactory,
});

export const FlowsSchema = z
  .map(z.string(), FlowSchema)
  .optional()
  .default(new Map());

export type FlowType = z.infer<typeof FlowSchema>;
export type FlowsType = z.infer<typeof FlowsSchema>;
