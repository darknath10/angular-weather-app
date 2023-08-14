import { ComponentStore } from '@ngrx/component-store';
import { Location } from './location/core/models'

export type AppState = {
  selectedLocation: Location | null;
};

export const INITIAL_APP_STATE: AppState = {
  selectedLocation: null,
};

export function appStoreFactory(store: ComponentStore<AppState>) {
  const selectedLocation$ = store.select(({ selectedLocation }) => selectedLocation);

  const setSelectedLocation = store.updater((state, selectedLocation: Location | null) => ({ ...state, selectedLocation }));

  return { selectedLocation$, setSelectedLocation };
}

export type AppStore = ReturnType<typeof appStoreFactory>;
