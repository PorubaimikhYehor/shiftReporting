import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ScreenActions from './screen.actions';



@Injectable()
export class ScreenEffects {
  
  constructor(private actions$: Actions) {}

}
