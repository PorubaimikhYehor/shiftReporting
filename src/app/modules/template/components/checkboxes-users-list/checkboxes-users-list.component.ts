import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '@models/*';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkboxes-users-list',
  templateUrl: './checkboxes-users-list.component.html',
  styleUrls: ['./checkboxes-users-list.component.scss']
})
export class CheckboxesUsersListComponent implements OnInit {
  @Input() users?: User[];
  @Input() checkedUsers?: string[];
  filteredUsers: User[] = [];
  search = new FormControl('');

  @Output() checkedUser = new EventEmitter<string>();
  @Output() uncheckedUser = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void {
    this.filteredUsers = this.users ? this.users : [];

    this.search.valueChanges.subscribe(query => {
      this.filteredUsers = this.users;
      if (!query) return;
      const words = String(query).split(' ');
      words.map(word => {
        const str = word.toLowerCase()
        this.filteredUsers = this.filteredUsers.filter(user => (
          user.firstName?.toLowerCase().includes(str)
          || user.secondName?.toLowerCase().includes(str)
          || user.email?.toLowerCase().includes(str)
        ))
      })
    })
  }

  onChange(event, user) {
    if (event.checked) 
      this.checkedUser.emit(user.userId);
    else 
      this.uncheckedUser.emit(user.userId);
  }

  selectAll(event) {
    if (!this.filteredUsers) return;
    if (event.checked)
      this.filteredUsers.map(user => this.checkedUser.emit(user.userId));
    else
      this.filteredUsers.map(user => this.uncheckedUser.emit(user.userId));
  }

  isChecked(): boolean {
    let result = true;
    this.filteredUsers.map(x => {
      if (!~this.checkedUsers.indexOf(x.userId)) 
        result = false;
    });
    if (!this.filteredUsers.length) result = false;
    return result;
  }

}
