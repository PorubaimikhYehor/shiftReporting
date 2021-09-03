import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpRequest, AppHttpResponse, HttpService } from 'src/app/services/http/http.service';
import { filter, map } from 'rxjs/operators';

export interface DataSource {
  key: string;
  value: object;
  hasError: boolean;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(
    private httpService: HttpService,
  ) { }

  baseUrl = 'datasources/'

  getDatasources(templateId): Observable<DataSource[]> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDatasources',
      loadingMsg: 'Loading data...',
      successMsg: 'Successfuly loaded data',
      errorMsg: 'Failed to load data',
      payload: { templateId }
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter((resp: AppHttpResponse) => resp && resp.status === 200),
        map((resp: AppHttpResponse) => resp.body),
      )
  }

}
