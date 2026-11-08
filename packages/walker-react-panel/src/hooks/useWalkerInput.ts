import { useWalkerInputStore } from "../stores/walker";

export function useWalkerInput() {
  const input = useWalkerInputStore((state) => state.input);
  const setInput = useWalkerInputStore((state) => state.setInput);
  return {
    input,
    setInput,
  };
}
