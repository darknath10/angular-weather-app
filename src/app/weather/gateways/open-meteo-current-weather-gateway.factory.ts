import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { CurrentWeatherGateway } from '../core/gateways';
import { CurrentWeather, Location } from '../core/models';

type OpenMeteoHourlyForecastResponse = {
  current_weather: {
    is_day: 0 | 1;
    [key: string]: unknown;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    precipitation: number[];
    weathercode: number[];
  };
  [key: string]: unknown;
}

const getCurrentHourForGivenTimezone = (timeZone: string): number => {
  const formatter = new Intl.DateTimeFormat(undefined, { timeZone, hour: 'numeric', hour12: false });
  const [hour] = formatter.formatToParts(new Date())
    .filter(({ type }) => type === 'hour')
    .map(({ value }) => +value);
  return hour === 24 ? 0 : hour;
};

const openMeteoHourlyForecastToCurrentWeatherByTimezone = (timezone: string) =>
  ({ current_weather, hourly }: OpenMeteoHourlyForecastResponse): CurrentWeather => {
    const { is_day } = current_weather;
    const { temperature_2m, relativehumidity_2m, precipitation: _precipitation, weathercode } = hourly;
    const index = getCurrentHourForGivenTimezone(timezone);
    return {
      isDay: !!is_day,
      precipitation: _precipitation[index],
      relativeHumidity: relativehumidity_2m[index],
      temperature: temperature_2m[index],
      wmoCode: weathercode[index],
    };
  }

export function openMeteoCurrentWeatherGatewayFactory(http: HttpClient, url: string): CurrentWeatherGateway {
  return ({ latitude, longitude, timezone }: Location) => {
    const params = new HttpParams()
      .append('latitude', latitude)
      .append('longitude', longitude)
      .append('timezone', timezone)
      .append('forecast_days', 1)
      .append('current_weather', true)
      .append('hourly', 'temperature_2m,relativehumidity_2m,precipitation,weathercode');

    return http.get<OpenMeteoHourlyForecastResponse>(url, { params }).pipe(
      map(openMeteoHourlyForecastToCurrentWeatherByTimezone(timezone)),
      catchError((error) => throwError(() => new Error(`Could not fetch current weather: ${error['reason'] ?? error['message'] ?? JSON.stringify(error)}`))),
    );
  }
}
