import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { WeatherForecastGateway } from '../core/gateways';
import { Location, WeatherForecast } from '../core/models';

type OpenMeteoForecastResponse = {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    et0_fao_evapotranspiration: number[];
  };
  [key: string]: unknown;
};

export function openMeteoWeatherForecastGatewayFactory(http: HttpClient, url: string): WeatherForecastGateway {
  return ({ latitude, longitude, timezone }: Location) => {
    const params = new HttpParams()
      .append('latitude', latitude)
      .append('longitude', longitude)
      .append('timezone', timezone)
      .append('past_days', 1)
      .append('forecast_days', 6)
      .append('daily', 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration');

    return http.get<OpenMeteoForecastResponse>(url, { params }).pipe(
      map<OpenMeteoForecastResponse, WeatherForecast>(({ daily: { time, weathercode, temperature_2m_max, temperature_2m_min, precipitation_sum, et0_fao_evapotranspiration } }) =>
        new Array(7).fill(undefined).map((_, index) => ({
          date: time[index],
          evapotranspiration: et0_fao_evapotranspiration[index],
          maxTemperature: temperature_2m_max[index],
          minTemperature: temperature_2m_min[index],
          precipitation: precipitation_sum[index],
          wmoCode: weathercode[index],
        })),
      ),
      catchError((error) => throwError(() => new Error(`Could not fetch weather forecast: ${error['reason'] ?? error['message'] ?? JSON.stringify(error)}`))),
    );
  }
}
