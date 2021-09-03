import { createAction, props } from '@ngrx/store';
import { DataEntry } from '../models';
import { CurrentDataEntry, DataEntryLog } from './data-entry.model';

export const addDataEntry = createAction(
  '[DataEntry] Add DataEntry',
  props<{ dataEntry: DataEntry }>()
);
export const addDataEntrySuccess = createAction(
  '[DataEntry] Add DataEntry Success',
  props<{ dataEntry: DataEntry }>()
);

export const getLatestDataEntry = createAction(
  '[DataEntry] Get Latest DataEntry',
  props<{ shiftId: number }>()
);
export const getLatestDataEntrySuccess = createAction(
  '[DataEntry] Get Latest DataEntrys Success',
  props<{ dataEntry: DataEntry }>()
);

export const getDataEntriesOnDate = createAction(
  '[DataEntry] Get DataEntries OnDate',
  props<{ departmentId: number, fromDate: string, toDate: string }>()
);
export const setDataEntriesOnDate = createAction(
  '[DataEntry] Set DataEntries OnDate',
  props<{ dataEntries: DataEntry[] }>()
);

export const updateDataEntry = createAction(
  '[DataEntry] Update DataEntry',
  props<{ dataEntry: DataEntry }>()
);
export const updateDataEntrySuccess = createAction(
  '[DataEntry] Update DataEntry Success',
  props<{ dataEntry: DataEntry }>()
);

export const submitDataEntry = createAction(
  '[DataEntry] Submit DataEntry',
  props<{ dataEntry: DataEntry }>()
);

export const approveDataEntry = createAction(
  '[DataEntry] Approve DataEntry',
  props<{dataEntryId: number, approverId: string}>()
)

export const approveDataEntrySuccess = createAction(
  '[DataEntry] Approve DataEntry Success',
  props<{dataEntryId: number, approverId: string}>()
)

export const rejectDataEntry = createAction(
  '[DataEntry] Reject DataEntry',
  props<{dataEntryId: number, approverId: string}>()
)

export const rejectDataEntrySuccess = createAction(
  '[DataEntry] Reject DataEntry Success',
  props<{dataEntryId: number, approverId: string}>()
)

export const submitDataEntrySuccess = createAction(
  '[DataEntry] Submit DataEntry Success',
  props<{ dataEntry: DataEntry }>()
);

export const setCurrentDataEntry = createAction(
  '[DataEntry] Set CurrentDataEntry',
  props<{ currentDataEntry: CurrentDataEntry }>()
);

export const getDataEntryById = createAction(
  '[DataEntry] Get DataEntryById',
  props<{ dataEntryId: number }>()
);

export const setPendingDataEntry = createAction(
  '[DataEntry] Set pending data entry',
  props<{ pendingDataEntry: DataEntry }>()
);

export const getDataEntryLogs = createAction(
  '[DataEntry] Get DataEntryLogs',
  props<{ dataEntryId: number }>()
);
export const getDataEntryLogsSuccess = createAction(
  '[DataEntry] Get DataEntryLogs Success',
  props<{ dataEntryLogs: DataEntryLog[] }>()
)

export const getPendingDataEntries = createAction(
  '[DataEntry] Get Pending DataEntries',
  props<{ userId: string }>()
)

export const setDataEntrieWaitingForApproval = createAction(
  '[DataEntry] Set DataEntrieWaitingForApproval',
  props<{ DataEntriesWaitingForApproval: DataEntry[] }>()
);

