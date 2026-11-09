import type { FlowType } from "walker-shared";

export async function none() {}

export const noneFlow: FlowType = {
  command: "none",
  handler: none,
};
