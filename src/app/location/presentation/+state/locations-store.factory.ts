import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, debounceTime, switchMap, tap } from 'rxjs';
import { SearchLocationsGateway } from '../../core/gateways';
import { Location } from '../../core/models';

export type LocationsState = {
  locations: Location[];
  loading: boolean;
}

export const INITIAL_LOCATIONS_STATE: LocationsState = {
  locations: [],
  loading: false,
};

export function locationsStoreFactory(store: ComponentStore<LocationsState>, searchLocationsGw: SearchLocationsGateway, snackbar: MatSnackBar) {
  const locations$ = store.select(({ locations }) => locations);
  const loading$ = store.select(({ loading }) => loading);
  const vm$ = store.select({
    locations: locations$,
    loading: loading$,
  });

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

  return { vm$, searchLocations };
}

export type LocationsStore = ReturnType<typeof locationsStoreFactory>;
