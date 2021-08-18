import { Injectable } from '@angular/core';
import { Template } from './template.model';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, AppHttpRequest, HttpService } from '../../services/http/http.service';
import { TemplateType } from './template-type.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateHttpService {

  baseUrl = 'templates/'

  constructor(private httpService: HttpService) { }

  addTemplate(opt: { departmentId: number, template: Template }): Observable<AppHttpResponse> {

    // const temp = { ...opt.template, templateId: 1111111 };
    // return new Observable(observer => {
    //   setTimeout(() => {
    //     const resp: AppHttpResponse = {
    //       status: 200,
    //       body: temp
    //     }
    //     observer.next(resp);
    //   }, 2000)
    // })

    const { departmentId, template } = opt;
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addTemplate',
      payload: { departmentId, template },
      loadingMsg: 'Adding the template...',
      successMsg: `Template has been added`,
      errorMsg: 'Failed to add the template',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateTemplate(template: Template): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateTemplate',
      payload: { template },
      loadingMsg: 'Updating the template...',
      successMsg: `Template has been updated`,
      errorMsg : 'Failed to update the template',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  deleteTemplate(templateId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'deleteTemplate',
      payload: { templateId },
      loadingMsg: 'Deleting the template...',
      successMsg: `Template has been deleted`,
      errorMsg: 'Failed to delete the template',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  getTemplates(departmentID: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getTemplates',
      payload: { departmentID },
      loadingMsg: 'Loading the templates...',
      errorMsg: 'Failed to load the templates',
    }
    // const resp: AppHttpResponse = {
    //   status: 200,
    //   body: <Template[]>[
    //     {
    //       Body: null,
    //       Description: 'Description 1',
    //       LastUpdated: '1234-01-01T01:01:01Z',
    //       Name: 'Name 1',
    //       TemplateID: 1,
    //       TemplateTypeID: 1,
    //       TemplateTypeName: 'test1'
    //     },
    //     {
    //       Body: null,
    //       Description: 'Description 2',
    //       LastUpdated: '1234-01-01T01:01:01Z',
    //       Name: 'Name 2',
    //       TemplateID: 2,
    //       TemplateTypeID: 2,
    //       TemplateTypeName: 'Test 2'
    //     },

    //   ]
    // }
    // return of(resp)

    return this.httpService.post<AppHttpResponse>(options);
  }

  getTemplateTypes(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getTemplateTypes',
      loadingMsg: 'Loading the template types...',
      errorMsg: 'Failed to load the template types',
    }
    // const resp: AppHttpResponse = {
    //   status: 200,
    //   body: <TemplateType[]>[
    //     { TemplateTypeName: 'Type 0', TemplateTypeID: 0 },
    //     { TemplateTypeName: 'Type 1', TemplateTypeID: 1 },
    //     { TemplateTypeName: 'Type 2', TemplateTypeID: 2 }
    //   ]
    // }
    // return of(resp)
    return this.httpService.post<AppHttpResponse>(options);
  }
}
