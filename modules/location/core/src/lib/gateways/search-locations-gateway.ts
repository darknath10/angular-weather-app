import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models';

export const SEARCH_LOCATIONS_GATEWAY = new InjectionToken<SearchLocationsGateway>('Search Locations Gateway Token');

export type SearchLocationsGateway = (query: string) => Observable<Location[]>;
