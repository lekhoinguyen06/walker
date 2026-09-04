import z from "zod";

export const ConfigSchema = z.object({
  mode: z.enum(["tailored", "open"]).catch("tailored"),
  gap: z.number().catch(0),
  isLoading: z.boolean().catch(false),
  verbose: z.boolean().catch(false),
  url: z.url().optional(),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
