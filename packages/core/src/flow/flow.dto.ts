import z from "zod";
import { ActionSchema, type ActionType } from "../action/action.dto";
import { ConfigSchema } from "../config/config.dto";
import { HooksSchema, type HooksType } from "../hook/hook.dto";
import { ContextSchema, type ContextType } from "../context/context.dto";

export const HandlerFactory = z.function({
  input: [
    z.object({
      action: z.unknown(),
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
  schema: z.instanceof(z.ZodType),
  handler: z.any(),
});

type InferSchema<T> = T extends z.ZodType<infer U> ? U : never;

export const FlowsSchema = z.array(FlowSchema);

export type FlowType<S extends z.ZodType = z.ZodType> = {
  command: string;
  description: string;
  route: string | "*";
  schema: S;
  handler: (props: {
    action: InferSchema<S>;
    context: ContextType & { hooks: HooksType };
  }) => Promise<void>;
};

export function createFlow<S extends z.ZodType>(
  config: FlowType<S>,
): FlowType<S> {
  return config;
}

export type FlowsType = z.infer<typeof FlowsSchema>;
