import { logger, walk } from '@src';
import { useAppStore } from '../store/app/useAppStore.js';
import type { App } from '../types/app.types.js';
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
