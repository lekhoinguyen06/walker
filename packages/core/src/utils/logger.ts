import { consola } from 'consola/browser';
import type { LogItem } from '../types/log.types';
import { useLogStore } from '../store/log/useLogStore';
import { mapManager } from '@src'
export class LogManager {
  peak() {
    const logItems = useLogStore.getState().items;
    consola.info(logItems);
  }

  map() {
    const map = mapManager.map();
    consola.info(map);
  }

  clear() {
    useLogStore.getState().clearItems();
    consola.info('Logs cleared');
  }

  log() {
    const logItems = useLogStore.getState().items;
    useLogStore.getState().clearItems();
    consola.info(logItems);
  }

  last() {
    const logItems = useLogStore.getState().items;
    const lastItem = logItems[logItems.length - 1];
    consola.info(lastItem);
  }

  add(id: string, item: LogItem) {
    useLogStore.getState().addItem(id, item);
  }

  plain(value: string) {
    consola.info(value);
  }
}

// TODO:
// - [ ] Show log on demand
// - [ ] Pipe ID
