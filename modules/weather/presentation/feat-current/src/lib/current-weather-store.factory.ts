import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Nullable } from '@farmapp/shared/types';
import {
  CurrentWeather,
  CurrentWeatherGateway,
  Location,
} from '@farmapp/weather/core';

export type CurrentWeatherState = {
  weather: Nullable<CurrentWeather>;
  loading: boolean;
};

export const INITIAL_CURRENT_WEATHER_STATE: CurrentWeatherState = {
  loading: false,
  weather: null,
};

export function currentWeatherStoreFactory(
  store: ComponentStore<CurrentWeatherState>,
  currentWeatherGw: CurrentWeatherGateway,
  snackbar: MatSnackBar
) {
  const weather = store.selectSignal(({ weather }) => weather);
  const loading = store.selectSignal(({ loading }) => loading);

  const setWeather = store.updater((state, weather: Nullable<CurrentWeather>) => ({
    ...state,
    weather,
    loading: false,
  }));
  const setLoading = store.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  const fetchCurrentWeather = store.effect(
    (location$: Observable<Location>) => {
      return location$.pipe(
        tap(() => setLoading(true)),
        switchMap((location) =>
          currentWeatherGw(location).pipe(
            tapResponse({
              next: (weather) => setWeather(weather),
              error: ({ message }: Error) => {
                snackbar.open(message, 'Dismiss');
                setWeather(null);
              },
            })
          )
        )
      );
    }
  );

  return { fetchCurrentWeather, loading, weather };
}

export type CurrentWeatherStore = ReturnType<typeof currentWeatherStoreFactory>;
