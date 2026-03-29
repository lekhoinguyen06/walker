import React from 'react';
import z from 'zod';
import { DEFAULT_BASE_ITEM_OPTIONS } from '../../constants/map.constants';

interface BaseItemProps extends BaseItemOptionsType {
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

function optionsMapper(options: BaseItemOptionsType): string {
  // let optionString = "";
  // (Object.keys(options) as (keyof BaseItemOptions)[]).forEach((key) => {
  // 	if (options[key]) optionString += key + "&";
  // });
  // return optionString;
  return JSON.stringify(options);
}

export function BaseItem({
  children,
  itemKey,
  data,
  options = DEFAULT_BASE_ITEM_OPTIONS,
}: BaseItemProps) {
  return (
    <div
      data-walker-key={itemKey}
      data-walker-data={JSON.stringify(data)}
      data-walker-options={optionsMapper(options)}
    >
      {children}
    </div>
  );
}
