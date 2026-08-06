import z from "zod";
import { ActionSchema } from "../action/type";
import { ConfigSchema } from "../runtime/type";

export const MiddlewarePropsSchema = z.object({
  action: ActionSchema,
  context: z.object({
    config: ConfigSchema,
  }),
});

export const MiddlewareResponseSchema = z.promise(z.string().or(z.void()));

export const MiddlewareFactory = z.function({
  input: [MiddlewarePropsSchema],
  output: MiddlewareResponseSchema,
});

export const SupportedMiddlewares = [
  "message",
  "database",
  "logger",
  "scroll",
  "mouse",
] as const;

export const MiddlewareSchema = z.object({
  name: z.enum(SupportedMiddlewares),
  description: z.string(),
  handler: MiddlewareFactory,
});

export const MiddlewaresSchema = z
  .map(z.enum(SupportedMiddlewares), MiddlewareSchema)
  .optional()
  .default(new Map());

export type MiddlewareType = z.infer<typeof MiddlewareSchema>;
export type MiddlewaresType = z.infer<typeof MiddlewaresSchema>;
export type MiddlewarePropsType = z.infer<typeof MiddlewarePropsSchema>;
export type MiddlewareResponseType = z.infer<typeof MiddlewareResponseSchema>;
