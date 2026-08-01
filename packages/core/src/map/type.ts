import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  content: z.string(),
});

export type ItemType = z.infer<typeof ItemSchema>;

export const MapSchema = z.object({
  hash: z.string(),
  map: z.record(z.string(), ItemSchema),
});

export type MapType = z.infer<typeof MapSchema>;
