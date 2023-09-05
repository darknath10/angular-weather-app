import { Observable } from 'rxjs';
import { CurrentWeather, Location } from '../models';
import { InjectionToken } from '@angular/core';

export const CURRENT_WEATHER_GATEWAY = new InjectionToken<CurrentWeatherGateway>('Current Weather Gateway Token');

export type CurrentWeatherGateway = (location: Location) => Observable<CurrentWeather>;
