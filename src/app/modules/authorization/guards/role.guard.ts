import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { map } from 'rxjs/operators';

export const routerLinks = [
  { key: 'calendar', title: 'Calendar', icon: 'calendar-month', allowedRoles: [1, 2, 3, 4, 5] },
  { key: 'configuration/plants', title: 'Plant', icon: 'factory', allowedRoles: [1, 2] },
  { key: 'configuration/departments', title: 'Departments', icon: 'graph-outline', allowedRoles: [1, 2] },
  { key: 'configuration/shifts', title: 'Shifts', icon: 'calendar', allowedRoles: [1] },
  { key: 'configuration/schedules', title: 'Schedules', icon: 'calendar-clock', allowedRoles: [1, 2, 3] },
  { key: 'configuration/templates', title: 'Templates', icon: 'file-table-box', allowedRoles: [1, 2, 3] },
  { key: 'configuration/users', title: 'Users', icon: 'account-group', allowedRoles: [1, 2, 3] },
  { key: 'configuration/config', title: 'Settings', icon: 'cog-outline', allowedRoles: [1] },
];


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthorizationService
  ) { }

  checkRole(url) {
    return this.authService.getCurrentUser().pipe(map(user => {
      if (!user) return false;
      const roles = routerLinks.find(r => '/' + r.key === url).allowedRoles;
      if (!roles.includes(user.roleId)) return false;
      return true
    }))
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(state.url)
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
