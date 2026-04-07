import { actionManager } from '@src';

type listActionObservers = {
  viewQueue: () => void;
  viewHistory: () => void;
};

/**
 * Return functions to help observe Agentflows
 * @returns ({ viewQueue, viewHistory })
 */
export function listActions(): listActionObservers {
  const viewQueue = actionManager.listActionQueue;
  const viewHistory = actionManager.listActionHistory;
  return { viewQueue, viewHistory };
}
