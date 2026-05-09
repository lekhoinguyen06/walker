import type { Action } from "@repo/core";

// TODO: create Map type in @repo/core
export type CommandPayload = Action | Record<string, string>;