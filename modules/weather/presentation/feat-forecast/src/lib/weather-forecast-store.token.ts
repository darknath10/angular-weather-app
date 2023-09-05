import { InjectionToken, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { WEATHER_FORECAST_GATEWAY } from '@farmapp/weather/core';
import {
  INITIAL_WEATHER_FORECAST_STATE,
  WeatherForecastStore,
  weatherForecastStoreFactory,
} from './weather-forecast-store.factory';

export const WEATHER_FORECAST_STORE = new InjectionToken<WeatherForecastStore>(
  'Weather Forecast Store Token'
);

export function provideWeatherForecastStore(): Provider[] {
  return [
    ComponentStore,
    {
      provide: INITIAL_STATE_TOKEN,
      useValue: INITIAL_WEATHER_FORECAST_STATE,
    },
    {
      provide: WEATHER_FORECAST_STORE,
      useFactory: weatherForecastStoreFactory,
      deps: [ComponentStore, WEATHER_FORECAST_GATEWAY, MatSnackBar],
    },
  ];
}
