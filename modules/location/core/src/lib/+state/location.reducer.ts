import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Location } from '../models';
import * as LocationActions from './location.actions';

type LocationState = {
  selectedLocation: Location | null;
};

const INITIAL_STATE: LocationState = {
  selectedLocation: null,
};

export const locationFeature = createFeature({
  name: 'Location',
  reducer: createReducer(
    INITIAL_STATE,
    on(LocationActions.selectLocation, (state, { location }) => ({ ...state, selectedLocation: location })),
  ),
  extraSelectors: ({ selectSelectedLocation }) => ({
    selectTimezone: createSelector(
      selectSelectedLocation,
      (location) => !location ? 'UTC' : location.timezone,
    ),
    selectLocationCoordinatesAndTimezone: createSelector(
      selectSelectedLocation,
      (location) => !location ?null : { latitude: location.latitude, longitude: location.longitude, timezone: location.timezone },
    ),
  }),
});

export const {
  selectLocationCoordinatesAndTimezone,
  selectSelectedLocation,
  selectTimezone,
} = locationFeature;
