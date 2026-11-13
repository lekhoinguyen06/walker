import { persistentJSON } from "@nanostores/persistent";
import type { UserType } from "walker-shared";

export const $user = persistentJSON<UserType>("walker-user-store", {
  prompt: "",
});

export function getUserPrompt(): string {
  return $user.get().prompt;
}

export function setUserPrompt(prompt: string) {
  $user.set({ prompt });
}

export function clearUserPrompt() {
  $user.set({ prompt: "" });
}
