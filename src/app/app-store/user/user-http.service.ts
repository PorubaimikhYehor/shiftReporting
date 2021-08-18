import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpResponse, AppHttpRequest, HttpService } from '../../services/http/http.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  baseUrl = 'users/'
  constructor(
    private httpService: HttpService
  ) { }

  getAllUsers(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getAllUsers',
      loadingMsg: 'Loading users...',
      errorMsg: 'Failed to load users',
    }
    return this.httpService.post<AppHttpResponse>(options)
  };
  addUser(user: User): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addUser',
      payload: { user },
      loadingMsg: 'Adding the user...',
      successMsg: `User has been added`,
      errorMsg: 'Failed to add the user',
    }
    return this.httpService.post<AppHttpResponse>(options);
  };
  updateUser(user: User): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateUser',
      payload: { user },
      loadingMsg: 'Updating the user...',
      successMsg: `User has been updated`,
      errorMsg: 'Failed to update the user',
    }
    return this.httpService.post<AppHttpResponse>(options);
  };
  addUserRole(userId: string, roleId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId, roleId },
      url: this.baseUrl + 'addUserRole',
      loadingMsg: "Adding user's roles...",
      errorMsg: 'Failed to add user\'s roles',
    }
    return this.httpService.post<AppHttpResponse>(options)
  };
  deleteUserRole(userId: string, roleId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId, roleId },
      url: this.baseUrl + 'deleteUserRole',
      loadingMsg: "Deleting user's roles...",
      errorMsg: 'Failed to delete user\'s roles',
    }
    return this.httpService.post<AppHttpResponse>(options)
  };
  getUserRoles(userId: string): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId },
      url: this.baseUrl + 'getUserRoles',
      loadingMsg: "Loading user's roles...",
      errorMsg: "Failed to load user's roles"
    }
    return this.httpService.post<AppHttpResponse>(options)
  };
  getRoles(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getRoles',
      loadingMsg: 'Loading roles...',
      errorMsg: 'Failed to delete roles',
    }
    return this.httpService.post<AppHttpResponse>(options)

  };



  addUserDepartment(userId: string, departmentId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId, departmentId },
      url: this.baseUrl + 'addUserDepartment',
      loadingMsg: "Adding user's department...",
      errorMsg: "Failed to add user's department",
    }
    return this.httpService.post<AppHttpResponse>(options)
  };
  deleteUserDepartment(userId: string, departmentId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId, departmentId },
      url: this.baseUrl + 'deleteUserDepartment',
      loadingMsg: "Deleting user's department...",
      errorMsg: "Failed to delete user's department"
    }
    return this.httpService.post<AppHttpResponse>(options)
  };


  getDepartmentUsers(departmentId: number): Observable<AppHttpResponse> { return null };
}
