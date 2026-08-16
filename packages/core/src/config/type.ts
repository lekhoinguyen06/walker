import z from "zod";

export const ConfigSchema = z.object({
  mode: z.enum(["tailored", "open"]).catch("tailored"),
  gap: z.number().catch(0),
  isPaused: z.boolean().catch(false),
  verbose: z.boolean().catch(false),
  url: z.string().optional(),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
