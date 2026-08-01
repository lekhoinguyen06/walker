import z from "zod";

export const ConfigSchema = z.object({
  mode: z.enum(["tailored", "open"]),
  url: z.url().optional(),
  gap: z.number().optional().default(1000),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
