import { createAction, props } from '@ngrx/store';
import { Nullable } from '@farmapp/shared/types';
import { User } from '../models';

export const setUser = createAction('[Feat User Sign Up] set user', props<{ user: Nullable<User> }>());
