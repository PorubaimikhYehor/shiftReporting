import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, DynText, State } from '@models/*';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { isSmallScreen } from 'src/app/app-store';

@Component({
  selector: 'app-current-user-form',
  templateUrl: './current-user-form.component.html',
  styleUrls: ['./current-user-form.component.scss']
})
export class CurrentUserFormComponent implements OnInit {
  editingUser: User;
  forms: FormGroup[] = [];
  form = new FormGroup({});
  isSmallScreen: boolean;

  name = [
    new DynText({ controlId: 'firstName', label: 'First name', validators: { required: true } }),
    new DynText({ controlId: 'secondName', label: 'Second name', validators: { required: true } }),
  ]
  login = [
    new DynText({ controlId: 'login', label: 'Login', validators: { required: true } }),
    new DynText({ controlId: 'password', label: 'Password', validators: { required: true } }),
  ]
  mail = [
    new DynText({ controlId: 'email', label: 'Email', validators: { email: true, required: true } }),
  ];

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<CurrentUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User,
    },
  ) { }

  ngOnInit(): void {
    this.editingUser = { ...this.data.user }
    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);
  }

  getForm(e: FormGroup) {
    this.forms.push(e);
    if (this.forms.length !== 3) return;
    this.form = new FormGroup({
      f0: this.forms[0],
      f1: this.forms[1],
      f2: this.forms[2],
    })
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.editingUser, value.f0, value.f1, value.f2)
    })
  }

}
