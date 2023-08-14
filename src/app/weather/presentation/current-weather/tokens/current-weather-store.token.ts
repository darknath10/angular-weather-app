import { InjectionToken, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { CurrentWeatherStore, INITIAL_CURRENT_WEATHER_STATE, currentWeatherStoreFactory } from '../+state';
import { CURRENT_WEATHER_GATEWAY, provideCurrentWeatherGateway } from './current-weather-gateway.token';

export const CURRENT_WEATHER_STORE = new InjectionToken<CurrentWeatherStore>('Current Weather Store');

export function provideCurrentWeatherStore(): Provider[] {
  return [
    provideCurrentWeatherGateway(),
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
