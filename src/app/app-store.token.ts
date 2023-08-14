import { InjectionToken, Provider } from '@angular/core';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { AppStore, INITIAL_APP_STATE, appStoreFactory } from './app-store.factory';

export const APP_STORE = new InjectionToken<AppStore>('App Store');

export function provideAppStore(): Provider[] {
  return [
    ComponentStore,
    {
      provide: INITIAL_STATE_TOKEN,
      useValue: INITIAL_APP_STATE,
    },
    {
      provide: APP_STORE,
      useFactory: appStoreFactory,
      deps: [ComponentStore],
    },
  ];
}
