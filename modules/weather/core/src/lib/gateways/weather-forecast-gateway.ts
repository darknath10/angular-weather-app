import { Observable } from 'rxjs';
import { Location, WeatherForecast } from '../models';
import { InjectionToken } from '@angular/core';

export const WEATHER_FORECAST_GATEWAY = new InjectionToken<WeatherForecastGateway>('Weather Forecast Gateway Token');

export type WeatherForecastGateway = (location: Location) => Observable<WeatherForecast>;
