import { Action, createReducer, on } from '@ngrx/store';
import * as ScreenActions from './screen.actions';

export const screenFeatureKey = 'screen';

export interface State {
  isSmall: boolean;
}

export const initialState: State = {
  isSmall: false
};


export const reducer = createReducer(
  initialState,

  on(ScreenActions.setIsSmallScreen,
    (state, { isSmall }) => ({ ...state, isSmall: isSmall })
  ),

);

