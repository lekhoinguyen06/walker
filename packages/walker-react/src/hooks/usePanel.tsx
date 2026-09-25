import { usePanelStore } from "@/stores/walker";

export function usePanel() {
  const url = usePanelStore((state) => state.url);
  const position = usePanelStore((state) => state.position);
  const style = usePanelStore((state) => state.style);
  const isHidden = usePanelStore((state) => state.isHidden);
  const tab = usePanelStore((state) => state.tab);
  const devTab = usePanelStore((state) => state.devTab);
  const setUrl = usePanelStore((state) => state.setUrl);
  const setPosition = usePanelStore((state) => state.setPosition);
  const setStyle = usePanelStore((state) => state.setStyle);
  const setIsHidden = usePanelStore((state) => state.setIsHidden);
  const switchTab = usePanelStore((state) => state.switchTab);
  const openTab = usePanelStore((state) => state.openTab);
  const closeTab = usePanelStore((state) => state.closeTab);
  const openDevTab = usePanelStore((state) => state.openDevTab);
  const closeDevTab = usePanelStore((state) => state.closeDevTab);
  const setStore = usePanelStore((state) => state.setStore);

  return {
    url,
    position,
    style,
    isHidden,
    tab,
    devTab,
    setUrl,
    setPosition,
    setStyle,
    setIsHidden,
    switchTab,
    openTab,
    closeTab,
    openDevTab,
    closeDevTab,
    setStore,
  };
}
