import { HttpClient } from '@angular/common/http';
import { InjectionToken, Provider } from '@angular/core';
import { CurrentWeatherGateway } from '../../../core/gateways';
import { openMeteoCurrentWeatherGatewayFactory } from '../../../gateways';
import { OPEN_METEO_FORECAST_URL, provideOpenMeteoForecastUrl } from '../../shared/tokens';

export const CURRENT_WEATHER_GATEWAY = new InjectionToken<CurrentWeatherGateway>('Current Weather GW');

export function provideCurrentWeatherGateway(): Provider[] {
  return [
    provideOpenMeteoForecastUrl(),
    {
      provide: CURRENT_WEATHER_GATEWAY,
      useFactory: openMeteoCurrentWeatherGatewayFactory,
      deps: [HttpClient, OPEN_METEO_FORECAST_URL],
    },
  ];
}
