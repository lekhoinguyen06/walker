import type { FlowWithHooksAndHandlerType } from "walker-shared";

export async function none() {}

export const noneFlow: FlowWithHooksAndHandlerType = {
  command: "none",
  handler: none,
};
