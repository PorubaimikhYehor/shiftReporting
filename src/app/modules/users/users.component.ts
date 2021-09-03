import { Component, OnInit } from '@angular/core';
import { User, State, Role } from '@models/*';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { allUsers, isSmallScreen, roles } from 'src/app/app-store';
import { UserActions } from '@actions/*';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthorizationService } from '../authorization/authorization.service';
import { tap, filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filterUsers: User[];
  search = new FormControl('')
  roles: Role[];
  currentUser: User;

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private authService: AuthorizationService,
  ) { }

  ngOnInit() {
    this.store.dispatch(UserActions.getAllUsers());
    // this.store.dispatch(UserActions.getRoles());
    // this.getUsers();
    this.search.valueChanges.subscribe(str => this.setFilterUsers(str))
    this.getCurrentUser().pipe(
      mergeMap(_ => this.getUsers())
    ).subscribe();
  }
  getCurrentUser() {
    return this.authService.getCurrentUser().pipe(
      tap(user => this.currentUser = user)
    )
  }
  setFilterUsers(string?: string) {
    if (!string) {
      this.filterUsers = [...this.users];
      return;
    }
    const query = string.split(' ');
    this.filterUsers = this.users;
    query.map(word => {
      const str = word.toLowerCase()
      this.filterUsers = this.filterUsers.filter(i => (
        i.firstName?.toLowerCase().includes(str)
        || i.secondName?.toLowerCase().includes(str)
        || i.email?.toLowerCase().includes(str)
        || i.login?.toLowerCase().includes(str)
      ))
    })
  }

  getUsers() {
    return this.store.pipe(
      select(allUsers),
      map(users => {
        if (this.currentUser.roleId === 1) return users;
        if (this.currentUser.roleId === 2) return users.filter(u => u.roleId > this.currentUser.roleId);
        const cus = this.currentUser.departments.map(d => d.departmentId);
        return users.filter(u => {
          if (u.roleId <= this.currentUser.roleId) return false;
          if (u.departments.filter(d => cus.includes(d.departmentId)).length) return true
        })
      }),
      tap(users => {
        this.users = users;
        this.filterUsers = users;
        this.search.setValue('');
      })
    )
  }

  addItem() {
    const user = <User>{
      departments: [],
      roleId: 5,
      isActive: true
    }
    this.openDialog(user)
  }
  edit(id) {
    const user = this.users.find(i => i.userId === id)
    this.openDialog(user)
  }
  openDialog(editUser: User) {
    const dialogRef = this.dialog.open(UserFormComponent, { data: { user: editUser } })
    dialogRef.afterClosed().subscribe(user => {
      if (!user) return;
      const oldDep = editUser.departments
      if (user.userId) {
        this.store.dispatch(UserActions.updateUser({ user, oldDep }));
        return;
      }
      this.store.dispatch(UserActions.addUser({ user }));
    });
  }
}
