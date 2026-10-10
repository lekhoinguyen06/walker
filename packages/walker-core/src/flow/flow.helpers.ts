import type { FlowType } from "walker-shared";

export type CreateFlowProps<T> = FlowType<T>;

export function createFlow<T>(props: CreateFlowProps<T>): CreateFlowProps<T> {
  return props;
}
