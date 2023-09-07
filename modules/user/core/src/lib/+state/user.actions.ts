import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const setUser = createAction('[Feat User Sign Up] set user', props<{ user: User | null }>());
