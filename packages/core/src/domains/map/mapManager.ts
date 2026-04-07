import { logger } from '@src';
import hash from 'object-hash';
import {
  BaseItemDataSchema,
  BaseItemOptionsSchema,
  DEFAULT_BASE_ITEM_OPTIONS,
  type BaseItemOptionsType,
} from '@repo/react';
import z from 'zod';

interface WalkerMap {
  hash: string;
  map: Record<string, NodeMap>;
}
interface NodeMap {
  children: Record<string, NodeMap>;
  options: BaseItemOptionsType;
  content: NodeContentType;
}

interface NodeContentType {
  data?: Record<string, string>;
  text?: string;
}
export class MapManager {
  map(): WalkerMap {
    const registry: Record<string, NodeMap> = {};
    const tree: Record<string, NodeMap> = {};
    let walkerMap: WalkerMap = { map: {}, hash: '' };
    const all = document.querySelectorAll(
      '[data-walker-key], [data-walker-options]',
    );

    // Build flat map
    all.forEach((el) => {
      const key = el.getAttribute('data-walker-key');
      const data = el.getAttribute('data-walker-data');
      const options = el.getAttribute('data-walker-options');

      if (!key) return;

      const nodeContent: NodeContentType = {};
      let optionsObject = DEFAULT_BASE_ITEM_OPTIONS;

      const optionsValidation = z.safeParse(
        BaseItemOptionsSchema,
        options && JSON.parse(options),
      );
      const dataValidation = z.safeParse(
        BaseItemDataSchema,
        data && JSON.parse(data),
      );

      if (optionsValidation.success) optionsObject = optionsValidation.data;
      if (dataValidation.success) nodeContent.data = dataValidation.data;

      // Implement rules
      if (optionsObject.dynamic) return;
      if (optionsObject.content?.text) nodeContent.text = el.textContent;

      registry[key] = {
        children: {},
        options: optionsObject,
        content: nodeContent,
      };
    });

    // Attach children
    all.forEach((el) => {
      const key = el.getAttribute('data-walker-key');
      if (!key) return;

      const parentEl = el.parentElement?.closest('[data-walker-key]');

      if (parentEl) {
        const parentKey = parentEl.getAttribute('data-walker-key');
        if (parentKey && registry[parentKey]) {
          registry[parentKey].children[key] = registry[key];
        }
      }
    });

    // Return only root parent
    all.forEach((el) => {
      const key = el.getAttribute('data-walker-key');
      if (!key) return;

      const parentEl = el.parentElement?.closest('[data-walker-key]');
      if (!parentEl) {
        tree[key] = registry[key];
      }
    });

    // Hash
    walkerMap = {
      map: tree,
      hash: hash(tree),
    };

    logger.add('1', {
      identifier: 5,
      domain: 'Map Manager',
      title: 'Send map',
      data: walkerMap,
    });

    return walkerMap;
  }
}
