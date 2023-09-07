/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentStore } from '@ngrx/component-store';
import { of } from 'rxjs';
import {
  CurrentWeather,
  CurrentWeatherGateway,
  Location,
} from '@farmapp/weather/core';
import {
  CurrentWeatherState,
  CurrentWeatherStore,
  currentWeatherStoreFactory,
} from './current-weather-store.factory';

describe('Current Weather Store', () => {
  let componentStore: ComponentStore<CurrentWeatherState>;
  let currentWeatherGw: CurrentWeatherGateway;
  let store: CurrentWeatherStore;
  const snackbar: any = { open: () => undefined };

  const currentWeather: CurrentWeather = {
    isDay: true,
    precipitation: 3.0,
    relativeHumidity: 80.0,
    temperature: 12.3,
    wmoCode: 5,
  };

  beforeEach(() => {
    componentStore = new ComponentStore<CurrentWeatherState>({
      loading: false,
      weather: null,
    });
    currentWeatherGw = () => of(currentWeather);
    store = currentWeatherStoreFactory(
      componentStore,
      currentWeatherGw,
      snackbar
    );
  });

  it('should update the state accordingly when the current weather was fetched', () => {
    store.fetchCurrentWeather({} as Location);
    const state = { loading: store.loading(), weather: store.weather() };
    const expected = { loading: false, weather: currentWeather };
    expect(state).toEqual(expected);
  });
});
