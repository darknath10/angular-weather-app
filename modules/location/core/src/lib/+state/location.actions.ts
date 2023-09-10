import { createAction, props } from '@ngrx/store';
import { Nullable } from '@farmapp/shared/types';
import { Location } from '../models';

export const selectLocation = createAction('[Feat Select Location] Set Selected Location', props<{location: Nullable<Location>}>());
