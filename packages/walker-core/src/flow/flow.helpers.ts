import z from "zod";
import { ActionSchema } from "../action";
import type { FlowType } from "./flow.dto";

export type CreateFlowProps<T> = FlowType<T>;

export function createFlow<T>(props: CreateFlowProps<T>): CreateFlowProps<T> {
  return props;
}

export type CreateFlowBodySchemaProps<T> = {
  flow: string;
  schema?: T;
};

export type CreateFlowBodySchemaResProps<T extends z.ZodType> = z.ZodObject<
  {
    message: z.ZodString;
    targetId: z.ZodString;
    prompt: z.ZodString;
    end: z.ZodBoolean;
    body?: NonNullable<T> | undefined;
    flow: z.ZodLiteral<string>;
  },
  z.core.$loose
>;

export function createFlowBodySchema<T extends z.ZodType>(
  props: CreateFlowBodySchemaProps<T>,
): CreateFlowBodySchemaResProps<T> {
  return ActionSchema.extend({
    flow: z.literal(props.flow),
    ...(props.schema ? { body: props.schema } : {}),
  });
}
