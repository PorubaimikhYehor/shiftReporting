import { createAction, props } from '@ngrx/store';

export const setConnectionStatus = createAction(
  '[Connection] Set Connection Status',
  props<{ isConnected: boolean }>()
);