import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, switchMap, tap } from 'rxjs';
import { Nullable } from '@farmapp/shared/types';
import {
  Location,
  WeatherForecast,
  WeatherForecastGateway,
} from '@farmapp/weather/core';

export type WeatherForecastState = {
  forecast: Nullable<WeatherForecast>;
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
  const forecast = store.selectSignal(({ forecast }) => forecast);
  const loading = store.selectSignal(({ loading }) => loading);

  const setForecast = store.updater(
    (state, forecast: Nullable<WeatherForecast>) => ({
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

  return { fetchWeatherForecast, forecast, loading };
}

export type WeatherForecastStore = ReturnType<
  typeof weatherForecastStoreFactory
>;
