import { ConnecitonActions } from '@actions/*';
import { Action, createReducer, on } from '@ngrx/store';
import * as ConnectionActions from './connection.actions';

export const connectionFeatureKey = 'connection';

export interface State {
  isConnected: boolean;
}

export const initialState: State = {
  isConnected: true,
};


export const reducer = createReducer(
  initialState,

  on(ConnecitonActions.setConnectionStatus,
    (state, { isConnected }) => ({ ...state, isConnected: isConnected })
  ),

);

