import z from "zod";
import type { ActionType } from "../action";
import type { ContextType } from "../context";

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
  schema: z.any(),
});

export type FlowItemType = z.infer<typeof FlowItemSchema>;

export type FlowRegistry = Map<string, FlowType>;
