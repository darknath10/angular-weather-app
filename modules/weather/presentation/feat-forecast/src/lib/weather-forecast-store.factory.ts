import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import {
  Location,
  WeatherForecast,
  WeatherForecastGateway,
} from '@farmapp/weather/core';

export type WeatherForecastState = {
  forecast: WeatherForecast | null;
  loading: boolean;
};

export const INITIAL_WEATHER_FORECAST_STATE: WeatherForecastState = {
  forecast: null,
  loading: false,
};

export function weatherForecastStoreFactory(
  store: ComponentStore<WeatherForecastState>,
  weatherForecastGw: WeatherForecastGateway,
  snackbar: MatSnackBar
) {
  const forecast$ = store.select(({ forecast }) => forecast);
  const loading$ = store.select(({ loading }) => loading);
  const vm$ = store.select({
    forecast: forecast$,
    loading: loading$,
  });

  const setForecast = store.updater(
    (state, forecast: WeatherForecast | null) => ({
      ...state,
      forecast,
      loading: false,
    })
  );
  const setLoading = store.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  const fetchWeatherForecast = store.effect(
    (location$: Observable<Location>) => {
      return location$.pipe(
        tap(() => setLoading(true)),
        switchMap((location) =>
          weatherForecastGw(location).pipe(
            tapResponse({
              next: (forecast) => setForecast(forecast),
              error: ({ message }: Error) => {
                snackbar.open(message, 'dismiss');
                setForecast(null);
              },
            })
          )
        )
      );
    }
  );

  return { vm$, fetchWeatherForecast };
}

export type WeatherForecastStore = ReturnType<
  typeof weatherForecastStoreFactory
>;
