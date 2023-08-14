import { Observable } from 'rxjs';
import { Location, WeatherForecast } from '../models';

export type WeatherForecastGateway = (location: Location) => Observable<WeatherForecast>;
