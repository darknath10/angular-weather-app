import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, debounceTime, switchMap, tap } from 'rxjs';
import { Location, SearchLocationsGateway } from '@farmapp/location/core';

export type LocationsState = {
  locations: Location[];
  loading: boolean;
}

export const INITIAL_LOCATIONS_STATE: LocationsState = {
  locations: [],
  loading: false,
};

export function searchLocationsStoreFactory(store: ComponentStore<LocationsState>, searchLocationsGw: SearchLocationsGateway, snackbar: MatSnackBar) {
  const locations = store.selectSignal(({ locations }) => locations);
  const loading = store.selectSignal(({ loading }) => loading);

  const setLocations = store.updater((state, locations: Location[]) => ({ ...state, locations, loading: false }));
  const setLoading = store.updater((state, loading: boolean) => ({ ...state, loading }));

  const searchLocations = store.effect((query$: Observable<string>) => {
    return query$.pipe(
      debounceTime(500),
      tap(() => setLoading(true)),
      switchMap((query) => searchLocationsGw(query).pipe(
        tapResponse({
          next: (locations) => setLocations(locations),
          error: ({ message }: Error) => {
            snackbar.open(message, 'Dismiss');
            setLocations([]);
          },
        }),
      )),
    );
  });

  return { loading, locations, searchLocations };
}

export type SearchLocationsStore = ReturnType<typeof searchLocationsStoreFactory>;
