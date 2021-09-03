import { Action, createReducer, on } from '@ngrx/store';
import * as FontActions from './font.actions';
import { FontFamily, FontSize } from './font.model';

export const fontFeatureKey = 'font';

export interface State{
  FontSizes: FontSize[]
  FontFamilies:FontFamily[]
}

export const initialState: State = {
  FontSizes: [],
  FontFamilies:[]
};


 const fontReducer = createReducer(
  initialState,

  on(FontActions.getFontSizesSuccess,(state,action) => ({ ...state, FontSizes: action.fontSizes })
  ),
  on(FontActions.getFontFamiliesSuccess,(state,action) =>  ({ ...state, FontFamilies: action.fontFamilies })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return fontReducer(state, action);
}


