import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { CurrentWeatherGateway } from '../../../core/gateways';
import { CurrentWeather, Location } from '../../../core/models'

export type CurrentWeatherState = {
  weather: CurrentWeather | null;
  loading: boolean;
}

export const INITIAL_CURRENT_WEATHER_STATE: CurrentWeatherState = {
  loading: false,
  weather: null,
};

export function currentWeatherStoreFactory(store: ComponentStore<CurrentWeatherState>, currentWeatherGw: CurrentWeatherGateway, snackbar: MatSnackBar) {
  const weather$ = store.select(({ weather }) => weather);
  const loading$ = store.select(({ loading }) => loading);
  const vm$ = store.select({
    weather: weather$,
    loading: loading$,
  });

  const setWeather = store.updater((state, weather: CurrentWeather | null) => ({ ...state, weather, loading: false }));
  const setLoading = store.updater((state, loading: boolean) => ({ ...state, loading }));

  const fetchCurrentWeather = store.effect((location$: Observable<Location>) => {
    return location$.pipe(
      tap(() => setLoading(true)),
      switchMap((location) => currentWeatherGw(location).pipe(
        tapResponse({
          next: (weather) => setWeather(weather),
          error: ({ message }: Error) => {
            snackbar.open(message, 'Dismiss');
            setWeather(null);
          },
        }),
      )),
    );
  });

  return { vm$, fetchCurrentWeather };
}

export type CurrentWeatherStore = ReturnType<typeof currentWeatherStoreFactory>;
