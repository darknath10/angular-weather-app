import { Observable } from 'rxjs';
import { Location } from '../models';

export type SearchLocationsGateway = (query: string) => Observable<Location[]>;
