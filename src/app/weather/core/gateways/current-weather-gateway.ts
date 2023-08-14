import { Observable } from 'rxjs';
import { CurrentWeather, Location } from '../models';

export type CurrentWeatherGateway = (location: Location) => Observable<CurrentWeather>;
