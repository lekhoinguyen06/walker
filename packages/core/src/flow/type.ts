import z from "zod";
import { ActionSchema } from "../action/type";
import { ConfigSchema } from "../runtime/type";
import { MiddlewaresSchema } from "../middleware/type";

export const HandlerFactory = z.function({
  input: [
    z.object({
      action: ActionSchema,
      context: z.object({
        config: ConfigSchema,
        middlewares: MiddlewaresSchema,
      }),
    }),
  ],
  output: z.promise(z.void()),
});

export const FlowSchema = z.object({
  command: z.string(),
  description: z.string(),
  route: z.string().or(z.literal("*")),
  handler: HandlerFactory,
});

export const FlowsSchema = z
  .map(z.string(), FlowSchema)
  .optional()
  .default(new Map());

export type FlowType = z.infer<typeof FlowSchema>;
export type FlowsType = z.infer<typeof FlowsSchema>;
