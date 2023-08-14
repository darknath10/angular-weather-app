import { InjectionToken, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { INITIAL_LOCATIONS_STATE, LocationsStore, locationsStoreFactory } from '../+state';
import { SEARCH_LOCATIONS_GATEWAY, provideSearchLocationsGateway } from './search-locations-gateway.token';

export const LOCATIONS_STORE = new InjectionToken<LocationsStore>('Locations Store');

export function provideLocationsStore(): Provider[] {
  return [
    provideSearchLocationsGateway(),
    ComponentStore,
    {
      provide: INITIAL_STATE_TOKEN,
      useValue: INITIAL_LOCATIONS_STATE,
    },
    {
      provide: LOCATIONS_STORE,
      useFactory: locationsStoreFactory,
      deps: [ComponentStore, SEARCH_LOCATIONS_GATEWAY, MatSnackBar],
    },
  ];
}
