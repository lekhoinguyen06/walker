import { useStore } from "@nanostores/react";
import { $history } from "walker-dom";

export function useHistory() {
  const history = useStore($history);
  return {
    history,
  };
}
