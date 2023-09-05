import { HttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { WEATHER_FORECAST_GATEWAY } from '@farmapp/weather/core';
import { openMeteoWeatherForecastGatewayFactory } from './open-meteo-weather-forecast-gateway.factory';
import { OPEN_METEO_FORECAST_URL, provideOpenMeteoForecastUrl } from './open-meteo-forecast-url.token';

export function provideOpenMeteoWeatherForecastGateway(): Provider[] {
  return [
    provideOpenMeteoForecastUrl(),
    {
      provide: WEATHER_FORECAST_GATEWAY,
      useFactory: openMeteoWeatherForecastGatewayFactory,
      deps: [HttpClient, OPEN_METEO_FORECAST_URL],
    },
  ];
}
