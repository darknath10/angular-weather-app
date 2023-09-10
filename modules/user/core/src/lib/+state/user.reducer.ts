import { createFeature, createReducer, on } from '@ngrx/store';
import { Nullable } from '@farmapp/shared/types';
import { User } from '../models';
import * as UserActions from './user.actions';

type UserState = {
  user: Nullable<User>;
};

const INITIAL_STATE: UserState = {
  user: null,
};

export const userFeature = createFeature({
  name: 'User',
  reducer: createReducer(
    INITIAL_STATE,
    on(UserActions.setUser, (state, { user }) => ({ ...state, user })),
  ),
});

export const { selectUser } = userFeature;
