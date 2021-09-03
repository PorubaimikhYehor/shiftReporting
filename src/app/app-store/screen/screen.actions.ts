import { createAction, props } from '@ngrx/store';

export const setIsSmallScreen = createAction(
  '[Screen] Set Is Small Screen',
  props<{ isSmall: boolean }>()
);