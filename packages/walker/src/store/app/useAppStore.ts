import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';
import type { App } from '../../types/app.types';

interface AppStoreState {
  settings: App;
  getSettings: () => App;
  setSettings: (setting: App) => App;
  resetSettings: () => App;
}

const DEFAULT_APP_STATE: App = {
  isPaused: false,
  isPolling: false,
};

export type AppStoreType = UseBoundStore<StoreApi<AppStoreState>>;

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_APP_STATE,
      getSettings: () => get().settings,
      setSettings: (settings) => {
        set({ settings });
        return settings;
      },
      resetSettings: () => {
        set({ settings: DEFAULT_APP_STATE });
        return DEFAULT_APP_STATE;
      },
    }),
    {
      name: 'app-store',
    },
  ),
);
