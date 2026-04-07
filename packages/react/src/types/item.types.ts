import z from 'zod';

export interface BaseItemProps extends BaseItemOptionsType {
  children: React.ReactNode;
  itemKey: string;
  data?: Record<string, string>;
  options?: BaseItemOptionsType;
}

export const BaseItemOptionsSchema = z.object({
  permission: z.boolean().optional(),
  // Map with item having content true will deliver content inside as JSON string
  content: z
    .object({
      text: z.boolean().optional(),
    })
    .optional(),
  // Map with an dynamic true will not be used as cache
  dynamic: z.boolean().optional(),
});

export const BaseItemDataSchema = z.record(z.string(), z.string());

export type BaseItemOptionsType = z.infer<typeof BaseItemOptionsSchema>;