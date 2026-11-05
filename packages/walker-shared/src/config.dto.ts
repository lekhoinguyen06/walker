import z from "zod";

export const ConfigSchema = z.object({
  gap: z.number(),
  isLoading: z.boolean(),
  verbose: z.boolean(),
  url: z.url(),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
