import { logger, walk } from '@core';
import { useAppStore } from '../store/app/useAppStore';
import type { App } from '../types/app.types';
export class AppManager {
  togglePause(): App {
    const prevSetting = useAppStore.getState().getSettings();
    const nextSetting = useAppStore
      .getState()
      .setSettings({ ...prevSetting, isPaused: !prevSetting.isPaused });
    logger.plain(nextSetting.isPaused ? 'App is paused' : 'App is running');
    if (!nextSetting.isPaused) walk();
    return prevSetting;
  }
}
