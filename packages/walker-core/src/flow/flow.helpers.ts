import z from "zod";
import { ActionSchema, type ActionType } from "../action";
import type { FlowType } from "./flow.dto";

export type CreateFlowProps<T> = FlowType<T>;

export function createFlow<T>(props: CreateFlowProps<T>) {
  return props;
}

export type CreateFlowBodySchemaProps<T> = {
  flow: string;
  schema?: T;
};

export function createFlowBodySchema<T>(props: CreateFlowBodySchemaProps<T>) {
  return ActionSchema.extend({
    flow: z.literal(props.flow),
    ...(props.schema ? { body: props.schema } : {}),
  });
}
