import { InjectionToken, Provider } from '@angular/core';

export const OPEN_METEO_FORECAST_URL = new InjectionToken<string>('Open Meteo Forecast URL');

export function provideOpenMeteoForecastUrl(): Provider {
  return {
    provide: OPEN_METEO_FORECAST_URL,
    useValue: 'https://api.open-meteo.com/v1/forecast',
  };
}
