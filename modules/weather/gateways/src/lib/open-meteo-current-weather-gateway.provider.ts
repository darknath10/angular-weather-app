import { HttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CURRENT_WEATHER_GATEWAY } from '@farmapp/weather/core';
import { openMeteoCurrentWeatherGatewayFactory } from './open-meteo-current-weather-gateway.factory';
import { OPEN_METEO_FORECAST_URL, provideOpenMeteoForecastUrl } from './open-meteo-forecast-url.token';

export function provideOpenMeteoCurrentWeatherGateway(): Provider[] {
  return [
    provideOpenMeteoForecastUrl(),
    {
      provide: CURRENT_WEATHER_GATEWAY,
      useFactory: openMeteoCurrentWeatherGatewayFactory,
      deps: [HttpClient, OPEN_METEO_FORECAST_URL],
    },
  ];
}
