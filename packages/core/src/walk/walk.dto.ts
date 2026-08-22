import z from "zod";
import { ObservedAttributes } from "./walk.const";

export const ObservedAttributesSchema = z.enum(ObservedAttributes);
export type ObservedAttributesType = z.infer<typeof ObservedAttributesSchema>;
