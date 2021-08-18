import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';

import * as DataEntryActions from './data-entry.actions';
import { DataEntryHttpService } from './data-entry-http.service';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { DataEntryCookieSenderService } from './data-entry-cookie-sender.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class DataEntryEffects {

  addDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.addDataEntry),
    mergeMap(({ dataEntry }) => this.dataEntryHttpService.addDataEntry(dataEntry).pipe(
      map(resp => {
        if (resp && resp.status === 200)
          return DataEntryActions.setCurrentDataEntry({ currentDataEntry: resp.body });

        this.cookieService.set('data-entry-backup', JSON.stringify({
          action: 'add',
          dataEntry
        }));
        this.dataEntryCookieSenderService.send('data-entry-backup');

        return DataEntryActions.setCurrentDataEntry({ currentDataEntry: null });
      })
    )),
  ));

  getLatestDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getLatestDataEntry),
    mergeMap(({ shiftId }) => this.dataEntryHttpService.getLatestDataEntry(shiftId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.getLatestDataEntrySuccess({ dataEntry: resp.body }))
    )),
  ));

  getDataEntriesOnDate$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getDataEntriesOnDate),
    mergeMap(({ departmentId, fromDate, toDate }) => this.dataEntryHttpService.getDataEntriesOnDate(departmentId, fromDate, toDate).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.setDataEntriesOnDate({ dataEntries: resp.body }))
    )),
  ));

  updateDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.updateDataEntry),
    mergeMap(({ dataEntry }) => this.dataEntryHttpService.updateDataEntry(dataEntry).pipe(
      map(resp => {
        if (resp && resp.status === 200)
          return DataEntryActions.setCurrentDataEntry({ currentDataEntry: resp.body });

        this.cookieService.set('data-entry-backup', JSON.stringify({
          action: 'update',
          dataEntry
        }));
        this.dataEntryCookieSenderService.send('data-entry-backup');

        return DataEntryActions.setCurrentDataEntry({ currentDataEntry: null });
      })
    )),
  ));

  submitDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.submitDataEntry),
    mergeMap(({ dataEntry }) => this.dataEntryHttpService.submitDataEntry(dataEntry).pipe(
      map(resp => {
        if (resp && resp.status === 200)
          return DataEntryActions.setCurrentDataEntry({ currentDataEntry: resp.body });

        this.cookieService.set('data-entry-backup', JSON.stringify({
          action: 'submit',
          dataEntry
        }));
        this.dataEntryCookieSenderService.send('data-entry-backup');

        return DataEntryActions.setCurrentDataEntry({ currentDataEntry: null });
      })
    )),
  ));

  getDataEntryLogs$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getDataEntryLogs),
    mergeMap(({ dataEntryId }) => this.dataEntryHttpService.getDataEntryLogs(dataEntryId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.getDataEntryLogsSuccess({ dataEntryLogs: resp.body }))
    )),
  ));



  constructor(
    private actions$: Actions,
    private dataEntryHttpService: DataEntryHttpService,
    private dataEntryCookieSenderService: DataEntryCookieSenderService,
    private cookieService: CookieService,
  ) { }

}
