import { useStore } from "@nanostores/react";
import { $history, clearHistory } from "walker-dom";

export function useHistory() {
  const history = useStore($history);
  return {
    history,
    clear: clearHistory,
  };
}
