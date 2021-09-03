import { Injectable } from '@angular/core';
import { HttpService, AppHttpResponse, AppHttpRequest } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';
import { UpdateConfigurations, Configuration } from './configuration.model';
import { filter, map, tap } from 'rxjs/operators';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationHttpService {
  baseUrl = 'configurations/';

  constructor(
    private httpService: HttpService,
    private dataTypeService: DataTypeService,
  ) { }

  getConfigurations(): Observable<Configuration[]> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getConfigurations',
      loadingMsg: 'loading configurations...',
      errorMsg: 'Failed to load configurations',
      successMsg: 'Loaded configurations',
    }
    return this.httpService.post<AppHttpResponse>(options).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => resp.body),
    );
  }
  
  updateConfigurations(configurations: UpdateConfigurations[]): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateConfigurations',
      payload: { configurations },
      loadingMsg: 'Updating the configurations...',
      successMsg: `Configurations has been updated`,
      errorMsg: 'Failed to update the configurations',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
