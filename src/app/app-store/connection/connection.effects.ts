import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ConnectionActions from './connection.actions';



@Injectable()
export class ConnectionEffects {

  constructor(private actions$: Actions) {}

}
