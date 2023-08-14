import { HttpClient } from '@angular/common/http';
import { InjectionToken, Provider } from '@angular/core';
import { WeatherForecastGateway } from '../../../core/gateways';
import { openMeteoWeatherForecastGatewayFactory } from '../../../gateways';
import { OPEN_METEO_FORECAST_URL, provideOpenMeteoForecastUrl } from '../../shared/tokens';

export const WEATHER_FORECAST_GATEWAY = new InjectionToken<WeatherForecastGateway>('Weather Forecast GW');

export function provideWeatherForecastGateway(): Provider[] {
  return [
    provideOpenMeteoForecastUrl(),
    {
      provide: WEATHER_FORECAST_GATEWAY,
      useFactory: openMeteoWeatherForecastGatewayFactory,
      deps: [HttpClient, OPEN_METEO_FORECAST_URL]
    },
  ];
}
