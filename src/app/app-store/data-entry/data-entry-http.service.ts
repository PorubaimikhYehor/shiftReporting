import { Injectable, ɵresetJitOptions } from '@angular/core';
import { DataEntry } from '@models/';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, AppHttpRequest, HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DataEntryHttpService {
  baseUrl = 'dataentries/'

  constructor(private httpService: HttpService) { }

  addDataEntry(dataEntry: DataEntry, inBackground?: boolean): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addDataEntry',
      payload: { dataEntry },
      loadingMsg: 'Adding the data entry...',
      successMsg: `DataEntry has been added`,
      errorMsg: 'Failed to add the data entry',

      disableLoadingMsg: inBackground,
      disableErrorMsg: inBackground,
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getLatestDataEntry(shiftID: number): Observable<AppHttpResponse> {
    return of(null)
  }

  getDataEntriesOnDate(departmentId: number, fromDate: string, toDate: string): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDataEntriesOnDate',
      payload: { departmentId, fromDate, toDate },
      loadingMsg: 'Loading data entries...',
      errorMsg: 'Failed to load data entries',
      successMsg: 'Loaded data entries',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  GetPendingDataEntries(userId:string){
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getPendingDataEntries',
      payload: { userId },

      loadingMsg: 'Loading the data entries...',
      successMsg: 'Loaded data entries',
      errorMsg: 'Failed to load data entries',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  GetDataEntry(DataEntryID:number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDataEntry',
      payload: { DataEntryID },

      loadingMsg: 'Loading the data entry...',
      successMsg: `Data entry has been loaded`,
      errorMsg: 'Failed to update the data entry',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateDataEntry(dataEntry: DataEntry, inBackground?: boolean): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateDataEntry',
      payload: { dataEntry },

      loadingMsg: 'Updating the data entry...',
      successMsg: `Data entry has been updated`,
      errorMsg: 'Failed to update the data entry',

      disableLoadingMsg: inBackground,
      disableErrorMsg: inBackground,
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  submitDataEntry(dataEntry: DataEntry, inBackground?: boolean): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'submitDataEntry',
      payload: { dataEntry },

      loadingMsg: 'Submitting the dataEntry...',
      successMsg: `Data entry has been submitted`,
      errorMsg: 'Failed to submit the data entry',

      disableLoadingMsg: inBackground,
      disableErrorMsg: inBackground,
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  approveDataEntry(dataEntryId: number, approverId: string): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'approveDataEntry',
      payload: {dataEntryId, approverId},

      loadingMsg: 'Approving the data entry...',
      successMsg: 'The data entry has been approved',
      errorMsg: 'Failed to approve the data entry',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  rejectDataEntry(dataEntryId: number, approverId: string): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + "rejectDataEntry",
      payload: { dataEntryId, approverId },

      loadingMsg: 'Rejecting the data entry...',
      successMsg: 'The data entry has been rejected',
      errorMsg: 'Failed to reject the data entry',
    }

    return this.httpService.post<AppHttpResponse>(options);
  }

  getDataEntryLogs(dataEntryId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDataEntryLogs',
      payload: { dataEntryId },
      loadingMsg: 'Loading the data entry log...',
      errorMsg: 'Failed to load the data entry log',
      successMsg: 'Loaded the data entry log',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getDataEntry(DataEntryID:number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDataEntry',
      payload: { DataEntryID },
 
      loadingMsg: 'Loading the data entry...',
      successMsg: `Data entry has been loaded`,
      errorMsg: 'Failed to update the data entry',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

}
