import { InjectionToken, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { CURRENT_WEATHER_GATEWAY } from '@farmapp/weather/core';
import {
  CurrentWeatherStore,
  INITIAL_CURRENT_WEATHER_STATE,
  currentWeatherStoreFactory,
} from './current-weather-store.factory';

export const CURRENT_WEATHER_STORE = new InjectionToken<CurrentWeatherStore>(
  'Current Weather Store Token'
);

export function provideCurrentWeatherStore(): Provider[] {
  return [
    ComponentStore,
    {
      provide: INITIAL_STATE_TOKEN,
      useValue: INITIAL_CURRENT_WEATHER_STATE,
    },
    {
      provide: CURRENT_WEATHER_STORE,
      useFactory: currentWeatherStoreFactory,
      deps: [ComponentStore, CURRENT_WEATHER_GATEWAY, MatSnackBar],
    },
  ];
}
