import { createContext, useContext } from 'react';
import { useFlowStore } from '@src/store/flow/useFlowStore.js';

export const FlowContext = createContext(useFlowStore);

export function useFlowItem(id: string) {
  const useFlowStore = useContext(FlowContext);
  if (!useFlowStore)
    throw new Error('useFlowItem must be inside a Flow component');
  const value = useFlowStore((state) => state.items[id]?.value ?? '');
  const updateItem = useFlowStore((state) => state.updateItem);
  return { value, updateItem };
}
