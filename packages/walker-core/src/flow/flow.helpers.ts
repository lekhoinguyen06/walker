import z from "zod";
import { ActionSchema, type ActionType } from "../action/action.dto";
import type { FlowType } from "./flow.dto";

type FlowBodySchemaProps<
  F extends string,
  S extends z.ZodSchema | undefined,
> = {
  flow: F;
  schema?: S;
};

export function createFlowBodySchema<
  F extends string,
  S extends z.ZodSchema | undefined,
>({ flow, schema }: FlowBodySchemaProps<F, S>) {
  return ActionSchema.extend({
    flow: z.literal(flow),
    body: (schema ?? z.unknown().optional()) as S extends z.ZodSchema
      ? S
      : z.ZodOptional<z.ZodUnknown>,
  });
}
