import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';


import { map, mergeMap, tap, filter } from 'rxjs/operators';

import * as FontActions from './font.actions';
import { FontHttpService } from './font-http.service';



@Injectable()
export class FontEffects {


  getFontSizes$ = createEffect(() => this.actions$.pipe(
    ofType(FontActions.getFontSizes),
    mergeMap(_ => this.fontHttpService.getFontSizes().pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => FontActions.getFontSizesSuccess({ fontSizes: resp.body }))
    ))));

  getFontFamilies$ = createEffect(() => this.actions$.pipe(
    ofType(FontActions.getFontFamilies),
    mergeMap(_ => this.fontHttpService.getFontFamilies().pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => FontActions.getFontFamiliesSuccess({ fontFamilies: resp.body }))
    ))));

  addFontFamily$ = createEffect(() => this.actions$.pipe(
    ofType(FontActions.addFontFamily),
    mergeMap(({fontFamily}) => this.fontHttpService.addFontFamily(fontFamily).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => FontActions.getFontFamilies())
    ))));

  addFontSize$ = createEffect(() => this.actions$.pipe(
    ofType(FontActions.addFontSize),
    mergeMap(({fontSize}) => this.fontHttpService.addFontSize(fontSize).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => FontActions.getFontSizes())
    ))));




  constructor(private actions$: Actions, private fontHttpService: FontHttpService) {}

}
