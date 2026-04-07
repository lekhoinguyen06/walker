import { DEFAULT_BASE_ITEM_OPTIONS } from '@src/constants/item.constants';
import { BaseItemOptionsType, BaseItemProps } from '@src/types/item.types';

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
