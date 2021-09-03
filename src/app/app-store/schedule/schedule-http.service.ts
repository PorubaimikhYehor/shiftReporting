import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, HttpService, AppHttpRequest } from '../../services/http/http.service';
import { Schedule } from './schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleHttpService {
  baseUrl = 'schedules/'

  constructor(private httpService: HttpService) { }

  addSchedule(schedule: Schedule): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addSchedule',
      payload: { schedule },
      loadingMsg: 'Adding the schedule...',
      successMsg: `Schedule has been added`,
      errorMsg: 'Failed to load schedules',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateSchedule(schedule: Schedule) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateSchedule',
      payload: { schedule },
      loadingMsg: 'Updating the schedule...',
      successMsg: `Schedule has been updated`,
      errorMsg: 'Failed to update the schedule',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  deleteSchedule(scheduleId) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'deleteSchedule',
      payload: { scheduleId },
      loadingMsg: 'Deleteing the schedule...',
      successMsg: `Schedule has been deleted`,
      errorMsg: 'Failed to delete the schedule',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  getSchedule() { }

  getSchedules(departmentId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getSchedules',
      payload: { departmentId },
      loadingMsg: 'Loading the schedule...',
      errorMsg: 'Failed to load the schedule',
      successMsg: 'Loaded the schedule',
    }
    return this.httpService.post<AppHttpResponse>(options);
    return of(null)
  }
}
