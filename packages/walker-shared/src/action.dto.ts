import z from "zod";

export const ActionSchema = z
  .object({
    itemId: z.string(),
    flowCommand: z.string(),
    agentMessage: z.string(),
    userMessage: z.string(),
    systemMessage: z.string(),
    body: z.record(z.string(), z.unknown()),
  })
  .loose();

export type ActionType<
  T extends Record<string, unknown> = Record<string, unknown>,
> = z.infer<typeof ActionSchema> & {
  body: T;
};
