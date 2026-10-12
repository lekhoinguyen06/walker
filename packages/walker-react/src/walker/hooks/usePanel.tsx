import { usePanelStore } from "@/walker/stores/walker";

export function usePanel() {
  const url = usePanelStore((state) => state.url);
  const position = usePanelStore((state) => state.position);
  const setPosition = usePanelStore((state) => state.setPosition);
  const style = usePanelStore((state) => state.style);
  const isHidden = usePanelStore((state) => state.isHidden);
  const setIsHidden = usePanelStore((state) => state.setIsHidden);
  const modal = usePanelStore((state) => state.modal);
  const setModal = usePanelStore((state) => state.setModal);
  const setStore = usePanelStore((state) => state.setStore);
  const tab = usePanelStore((state) => state.tab);
  const setTab = usePanelStore((state) => state.setTab);

  return {
    url,
    position,
    setPosition,
    style,
    isHidden,
    setIsHidden,
    modal,
    setModal,
    setStore,
    tab,
    setTab,
  };
}
