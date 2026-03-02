import Store from 'electron-store';
import type { AppSettings, ServerEntry } from '../renderer/src/types';

export interface StoreSchema {
  settings: AppSettings;
  theme: 'light' | 'dark' | 'system';
  servers: ServerEntry[];
  sidebarCollapsed: boolean;
}

const store = new Store<StoreSchema>({
  defaults: {
    settings: {
      pollingInterval: 15000,
      autoRefresh: true
    },
    theme: 'system',
    servers: [],
    sidebarCollapsed: false
  }
});

export default store;
