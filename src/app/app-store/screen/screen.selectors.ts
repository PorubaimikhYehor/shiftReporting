import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScreen from './screen.reducer';

export const selectScreenState = createFeatureSelector<fromScreen.State>(
  fromScreen.screenFeatureKey
);
