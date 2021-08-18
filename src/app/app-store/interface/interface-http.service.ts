import { Injectable } from '@angular/core';
import { HttpService, AppHttpRequest, AppHttpResponse } from '../../services/http/http.service';
import { Interface } from './interface.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterfaceHttpService {
  baseUrl = 'interfaces/';
  constructor(private httpService: HttpService) { }

  addInterface(intface: Interface, templateId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addInterface',
      payload: { interface: intface, templateId },
      loadingMsg: 'Adding the interface...',
      successMsg: `Interface has been added`,
      errorMsg: 'Failed to add the interface',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateInterface(intface: Interface): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateInterface',
      payload: { interface: intface },
      loadingMsg: 'Updating the interface...',
      successMsg: `Interface has been updated`,
      errorMsg: 'Failed to update the interface',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  getInterfaces(templateId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { templateId },
      url: this.baseUrl + 'getInterfaces',
      loadingMsg: 'Loading interfaces...',
      errorMsg: 'Failed to load interfaces',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
