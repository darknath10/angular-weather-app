import { InjectionToken, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { INITIAL_WEATHER_FORECAST_STATE, WeatherForecastStore, weatherForecastStoreFactory } from '../+state';
import { WEATHER_FORECAST_GATEWAY, provideWeatherForecastGateway } from './weather-forecast-gateway.token';

export const WEATHER_FORECAST_STORE = new InjectionToken<WeatherForecastStore>('Weather Forecast Store');

export function provideWeatherForecastStore(): Provider[] {
  return [
    provideWeatherForecastGateway(),
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
