import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '@models/*';

@Component({
  selector: 'app-notifications-users-list',
  templateUrl: './notifications-users-list.component.html',
  styleUrls: ['./notifications-users-list.component.scss']
})
export class NotificationsUsersListComponent implements OnInit {
  @Input() users?: User[];
  @Input() checkedUsers?: string[];

  @Output() checkedUser = new EventEmitter<string>();
  @Output() uncheckedUser = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onChange(event, user) {
    if (event.checked) 
      this.checkedUser.emit(user.userId);
    else 
      this.uncheckedUser.emit(user.userId);
  }

}
