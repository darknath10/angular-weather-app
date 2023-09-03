import { ComponentStore } from '@ngrx/component-store';
import { Location } from '@farmapp/location'

export type AppState = {
  selectedLocation: Location | null;
  user: {
    firstName: string;
    lastName: string;
  } | null;
};

export const INITIAL_APP_STATE: AppState = {
  selectedLocation: null,
  user: null,
};

export function appStoreFactory(store: ComponentStore<AppState>) {
  const selectedLocation$ = store.select(({ selectedLocation }) => selectedLocation);
  const user$ = store.select(({ user }) => user);

  const setSelectedLocation = store.updater((state, selectedLocation: Location | null) => ({ ...state, selectedLocation }));
  const setUser = store.updater((state, user: AppState['user'] | null) => ({ ...state, user }));

  return { selectedLocation$, user$, setSelectedLocation, setUser };
}

export type AppStore = ReturnType<typeof appStoreFactory>;
