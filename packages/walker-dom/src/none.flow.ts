import type { FlowWithHooksAndHandlerType } from "./type";

export async function none() {}

export const noneFlow: FlowWithHooksAndHandlerType = {
  command: "none",
  handler: none,
};
