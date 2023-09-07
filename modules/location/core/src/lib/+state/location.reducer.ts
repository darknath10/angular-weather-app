import { createFeature, createReducer, on } from '@ngrx/store';
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
});

export const { selectSelectedLocation } = locationFeature;
