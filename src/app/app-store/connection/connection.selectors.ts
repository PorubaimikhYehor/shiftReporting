import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConnection from './connection.reducer';

export const connectionStatus = createFeatureSelector<fromConnection.State>(
  fromConnection.connectionFeatureKey
);
