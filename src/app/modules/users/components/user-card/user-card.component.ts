import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, State, Role } from '@models/*';
import { Store, select } from '@ngrx/store';
import { isSmallScreen, roles } from 'src/app/app-store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() clickEdit = new EventEmitter<string>()
  @Output() clickRoles = new EventEmitter<string>()
  @Output() clickDepartments = new EventEmitter<string>()

  isSmallScreen: boolean;
  // @Output() clickDelete = new EventEmitter<number>()

  roles: Role[] = [];
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.pipe(
      select(roles),
    ).subscribe(roles => this.roles = roles)

    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);
  }

  get firstName() {
    return this.user.firstName;
  }

  get secondName() {
    return this.user.secondName;
  }

  get login() {
    return this.user.login;
  }

  get email() {
    return this.user.email;
  }
  get isActive() {
    return this.user.isActive;
  }
  get departments() {
    return this.user.departments;
  }
  get role() {
    const role = this.roles.find(r => r.roleId === this.user.roleId)
    return role?.roleName || '';
  }
  get initials() {
    const { firstName, secondName } = this.user;
    const getFirstLetter = (str: string) => str.slice(0, 1).toUpperCase()
    return getFirstLetter(firstName) + getFirstLetter(secondName);
  }
  edit() {
    this.clickEdit.emit(this.user.userId)
  }
}
