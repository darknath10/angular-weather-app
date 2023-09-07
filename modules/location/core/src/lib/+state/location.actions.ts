import { createAction, props } from '@ngrx/store';
import { Location } from '../models';

export const selectLocation = createAction('[Feat Select Location] Set Selected Location', props<{location: Location | null}>());
