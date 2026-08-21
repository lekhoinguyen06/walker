import z from "zod";
import { ActionSchema } from "../action/action.dto";
import { ConfigSchema } from "../config/config.dto";
import { HooksSchema } from "../hook/hook.dto";
import { ContextSchema } from "../context/context.dto";

export const HandlerFactory = z.function({
  input: [
    z.object({
      action: ActionSchema,
      context: ContextSchema.extend({
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
