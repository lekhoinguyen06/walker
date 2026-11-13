import { useStore } from "@nanostores/react";
import { $user, setUserPrompt, clearUserPrompt } from "walker-dom";

export function useUser() {
  const user = useStore($user);
  return {
    user,
    clearUserPrompt,
    setUserPrompt,
  };
}
