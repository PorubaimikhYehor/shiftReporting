import { Injectable } from '@angular/core';
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
      errorMsg: 'Failed to load data entries'
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
  getDataEntryLogs(dataEntryId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDataEntryLogs',
      payload: { dataEntryId },
      loadingMsg: 'Loading the data entry log...',
      errorMsg: 'Failed to load the data entry log',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
