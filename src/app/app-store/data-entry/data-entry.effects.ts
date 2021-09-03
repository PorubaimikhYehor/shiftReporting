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

  approveDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.approveDataEntry),
    mergeMap(({dataEntryId, approverId}) => this.dataEntryHttpService.approveDataEntry(dataEntryId, approverId).pipe(
      map(resp =>  DataEntryActions.setCurrentDataEntry({currentDataEntry: null}))
    ))
  ));

  rejectDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.rejectDataEntry),
    mergeMap(({dataEntryId, approverId}) => this.dataEntryHttpService.rejectDataEntry(dataEntryId, approverId).pipe(
      map(resp => DataEntryActions.setCurrentDataEntry({currentDataEntry: null}))
    ))
  ));

  getDataEntryLogs$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getDataEntryLogs),
    mergeMap(({ dataEntryId }) => this.dataEntryHttpService.getDataEntryLogs(dataEntryId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.getDataEntryLogsSuccess({ dataEntryLogs: resp.body }))
    )),
  ));

  getDataEntryById$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getDataEntryById),
    mergeMap(({ dataEntryId }) => this.dataEntryHttpService.getDataEntry(dataEntryId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => {
        return DataEntryActions.setPendingDataEntry({ pendingDataEntry: resp.body })}))))
    );

    
  getPendingDataEntries$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getPendingDataEntries),
    mergeMap(({ userId }) => this.dataEntryHttpService.GetPendingDataEntries(userId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.setDataEntrieWaitingForApproval({ DataEntriesWaitingForApproval: resp.body }))
    )),
  ));



  constructor(
    private actions$: Actions,
    private dataEntryHttpService: DataEntryHttpService,
    private dataEntryCookieSenderService: DataEntryCookieSenderService,
    private cookieService: CookieService,
  ) { }

}
