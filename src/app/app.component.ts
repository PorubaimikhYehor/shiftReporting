import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthorizationService } from './modules/authorization/authorization.service';
import { map, filter, tap, mergeMap } from 'rxjs/operators';
import { OidcClientService } from './modules/authorization/oidc-client.service';
import { User, State, Role } from './models';
import { routerLinks } from './modules/authorization/guards/role.guard';
import { Store, select } from '@ngrx/store';
import { ConfigurationsActions, UserActions } from './app-store/actions'
import { getRoles } from './app-store/user/user.actions';
import { userRoles, roles, userDepartments, connectionStatus } from './app-store';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserFormComponent } from './modules/users/components/current-user-form/current-user-form.component';
import { DataEntryCookieSenderService } from './app-store/data-entry/data-entry-cookie-sender.service';
import { ConnectionCheckerService } from './app-store/connection/connection-checker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSnavOpen = false;
  userName: string;
  abbreviation: string;
  isSmall = false;
  currentUser: User;
  config = routerLinks;
  roles: Role[];
  userRole: string = ""
  smallScreen = true;
  isConnected: boolean;

  constructor(
    private bpObserver: BreakpointObserver,
    private authService: AuthorizationService,
    private oidcCLientService: OidcClientService,
    private store: Store<State>,
    private dialog: MatDialog,
    private dataEntryCookieSender: DataEntryCookieSenderService,
    private connectionCheckerService: ConnectionCheckerService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.bpObserver.observe('(max-width: 960px)').subscribe(result => {
      this.smallScreen = result.matches;
      this.isSnavOpen = !result.matches
    })
    this.store.pipe(
      select(roles),
      filter(roles => !!roles.length),
      tap(roles => this.roles = roles),
      tap(_ => this.userRole = this.roles.find(r => r.roleId === this.currentUser.roleId).roleName || '')
    ).subscribe();
    this.authService.getCurrentUser().pipe(
      filter(user => !!user),
      tap(currentUser => {
        this.currentUser = currentUser;
        this.store.dispatch(UserActions.getRoles());
        this.store.dispatch(ConfigurationsActions.getConfigurations());
        this.userName = `${currentUser?.firstName} ${currentUser?.secondName}`;
        this.abbreviation = currentUser?.firstName.slice(0, 1).toUpperCase() + currentUser?.secondName.slice(0, 1).toUpperCase();
        this.config.map(item => item['isShow'] = item.allowedRoles.includes(currentUser.roleId))
      }),
    ).subscribe();

    this.dataEntryCookieSender.send('data-entry-backup');
    this.connectionCheckerService.start(5000);

    this.store.select(connectionStatus)
      .subscribe(status => this.isConnected = status);
  }

  editUserInfo() {
    const dialogRef = this.dialog.open(CurrentUserFormComponent, { data: { user: this.currentUser } });
    dialogRef.afterClosed().subscribe(user => {
      if (!user) return;
      this.store.dispatch(UserActions.updateUser({ user, oldDep: user.departments, isCurrent: true }));
    });
  }

  logout() {
    this.oidcCLientService.logout()
  }

  redirect(url) {
    this.router.navigate([url]);
  }
}
