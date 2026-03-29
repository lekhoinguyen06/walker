import { consola } from 'consola/browser';
import type { LogItem } from '../types/log.types';
import { useLogStore } from '../store/log/useLogStore';
export class LogManager {
  peak() {
    const logItems = useLogStore.getState().items;
    consola.info(logItems);
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
