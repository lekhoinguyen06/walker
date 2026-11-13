import z from "zod";
import { ItemSchema } from "./item.dto";

export const MapSchema = z.array(ItemSchema);

export type MapType = z.infer<typeof MapSchema>;
