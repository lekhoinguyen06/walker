import type { Flow } from "./type";

export async function none() {}

export const noneFlow: Flow = {
  command: "none",
  handler: none,
};
