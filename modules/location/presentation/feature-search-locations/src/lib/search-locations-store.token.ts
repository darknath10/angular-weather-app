import { InjectionToken, Provider } from '@angular/core';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { INITIAL_LOCATIONS_STATE, SearchLocationsStore, searchLocationsStoreFactory } from './search-locations-store.factory';
import { SEARCH_LOCATIONS_GATEWAY } from '@farmapp/location/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const SEARCH_LOCATIONS_STORE = new InjectionToken<SearchLocationsStore>('Locations Store');

export function provideSearchLocationsStore(): Provider[] {
  return [
    ComponentStore,
    {
      provide: INITIAL_STATE_TOKEN,
      useValue: INITIAL_LOCATIONS_STATE,
    },
    {
      provide: SEARCH_LOCATIONS_STORE,
      useFactory: searchLocationsStoreFactory,
      deps: [ComponentStore, SEARCH_LOCATIONS_GATEWAY, MatSnackBar],
    },
  ];
}
