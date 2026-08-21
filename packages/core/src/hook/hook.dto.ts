import z from "zod";
import { ActionSchema } from "../action/action.dto";
import { ConfigSchema } from "../config/config.dto";
import { ContextSchema } from "../context/context.dto";

export const HookPropsSchema = z.object({
  action: ActionSchema,
  context: ContextSchema,
});

export const HookResponseSchema = z.promise(z.void());

export const HookFactory = z.function({
  input: [HookPropsSchema],
  output: HookResponseSchema,
});

export const HooksSchema = z.object({
  onScroll: HookFactory.optional(),
  onMessage: HookFactory.optional(),
  onMouse: HookFactory.optional(),
});

export type HookType = z.infer<typeof HookFactory>;
export type HooksType = z.infer<typeof HooksSchema>;
export type HookPropsType = z.infer<typeof HookPropsSchema>;
export type HookResponseType = z.infer<typeof HookResponseSchema>;
