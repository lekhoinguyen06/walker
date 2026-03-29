import type { BaseItemOptionsType } from '@src/domains/item/BaseItem';

export const DEFAULT_BASE_ITEM_OPTIONS: BaseItemOptionsType = {
  permission: false,
  content: {
    text: false,
  },
  dynamic: false,
};
