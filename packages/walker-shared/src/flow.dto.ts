import z from "zod";
import { ActionSchema, type ActionType } from "./action.dto";
import type { ContextType } from "./context.dto";

export interface FlowType<T = any> {
  command: string;
  description: string;
  route: string;
  schema: any;
  handler: (props: {
    action: ActionType<T>;
    context: ContextType;
  }) => Promise<void>;
}

export const FlowItemSchema = z.object({
  command: z.string(),
  description: z.string(),
  schema: z.unknown(),
});

export type FlowItemType = z.infer<typeof FlowItemSchema>;

export type FlowRegistry = Map<string, FlowType>;

export type WebFlows = "click" | "input" | "none";

export type CreateFlowBodySchemaProps<T> = {
  flow: string;
  schema?: T;
};

export function createFlowBodySchema<T extends z.ZodType>(
  props: CreateFlowBodySchemaProps<T>,
) {
  return ActionSchema.extend({
    flow: z.literal(props.flow),
    ...(props.schema ? { body: props.schema } : {}),
  });
}
