import z from "zod";
import { ActionSchema } from "../action/type";

export const WalkSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  actions: z.array(ActionSchema),
});

export type WalkType = z.infer<typeof WalkSchema>;
