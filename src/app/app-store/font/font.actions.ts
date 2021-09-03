import { createAction, props } from '@ngrx/store';
import { FontFamily,FontSize } from './font.model';

export const addFontFamily = createAction(
  '[Font] Add Font Family',
  props<{ fontFamily: FontFamily }>()
);

export const getFontFamilies = createAction(
  '[Font] Get Font Families',
);

export const getFontFamiliesSuccess = createAction(
  '[Font] Get Font Families Success',
  props<{ fontFamilies: FontFamily[] }>()
);

export const addFontSize = createAction(
  '[Font] Add Font Size',
  props<{ fontSize: FontSize }>()
);

export const getFontSizes = createAction(
  '[Font] Get Font Sizes',
);

export const getFontSizesSuccess = createAction(
  '[Font] Get Font Sizes Success',
  props<{ fontSizes: FontSize[] }>()
);


