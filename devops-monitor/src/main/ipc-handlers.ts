import { ipcMain } from 'electron';
import store from './store';
import type { AppSettings } from '../renderer/src/types';

// API port
export function setupIPC() {
  // Get the mock API server port
  ipcMain.handle('getApiPort', () => {
    return 3001; // mock server runs on this port
  });

  // Store operations
  ipcMain.handle('storeGet', (_, key: string) => {
    return store.get(key as any);
  });

  ipcMain.handle('storeSet', (_, key: string, value: any) => {
    store.set(key as any, value);
    return true;
  });

  // Settings operations
  ipcMain.handle('getSettings', (): AppSettings => {
    return store.get('settings');
  });

  ipcMain.handle('saveSettings', (_, settings: AppSettings) => {
    store.set('settings', settings);
    return true;
  });

  // Tray status update
  ipcMain.handle('updateTrayStatus', (_, status: string) => {
    // TODO: implement tray status update when tray is added
    console.log('updateTrayStatus:', status);
    return true;
  });

  // Notifications
  ipcMain.handle('sendNotification', (_, title: string, options?: any) => {
    // TODO: implement native notifications
    console.log('sendNotification:', title, options);
    return true;
  });

  // Event listeners are registered but will be triggered from main process
  // These handlers just acknowledge the registration
  ipcMain.on('onAlertReceived', (_event, alert) => {
    console.log('Alert received:', alert);
  });

  ipcMain.on('onNavigate', (_event, route) => {
    console.log('Navigate:', route);
  });
}
