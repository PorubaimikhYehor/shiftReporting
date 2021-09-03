import { Component, OnInit, Inject } from '@angular/core';
import { User, DynText, DynCheckbox, State, Role, DynSelect, Plant } from '@models/*';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { roles, userDepartments, allPlants, isSmallScreen } from 'src/app/app-store';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
import { PlantActions } from '@actions/*';
import { filter, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isSmallSCreen: boolean;
  currentUser: User;
  departments = new FormControl();
  departmentsList = [];
  plants: Plant[] = [];

  user: User;
  form = new FormGroup({});
  forms: FormGroup[] = [];
  rolesView = null;
  name = [
    new DynText({ controlId: 'firstName', label: 'First name', validators: { required: true } }),
    new DynText({ controlId: 'secondName', label: 'Second name', validators: { required: true } }),
  ]
  login = [
    new DynText({ controlId: 'login', label: 'Login', validators: { required: true } }),
    new DynText({ controlId: 'password', label: 'Password', validators: { required: this.data.user.userId ? false : true } }),
  ]
  mail = [
    new DynText({ controlId: 'email', label: 'Email', validators: { email: true } }),
  ];
  
  role = [
    new DynSelect({ controlId: 'roleId', label: 'Role', options: this.rolesView, validators: { required: true }, }),
  ]
  active =[
    new DynCheckbox({ controlId: 'isActive', label: 'Active user' }),
  ]

  constructor(
    private store: Store<State>,
    private authService: AuthorizationService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User,
    },
  ) { }

  ngOnInit(): void {
    this.store.dispatch(PlantActions.getPlants());
    const plants$ = this.store.pipe(select(allPlants), filter(data => !!data))
    this.store.select(allPlants).subscribe(plants => this.plants = plants);
    this.authService.getCurrentUser().pipe(
      filter(user => !!user),
      tap(user => this.currentUser = user),
      mergeMap(_ => plants$),
      tap(plants => this.plants = this.plants),
      tap(_ => this.createDepList()),
      tap(_ => this.getRoles())
    ).subscribe();

    this.user = { ...this.data.user };
    this.departments.setValue(this.user.departments?.map(d => d.departmentId) || [])
    this.departments.valueChanges
      .subscribe(val => this.user.departments =
        this.currentUser.departments
          .filter(d => val.includes(d.departmentId))
      )
    this.store.select(isSmallScreen)
        .subscribe(small => this.isSmallSCreen = small);
  }

  createDepList() {
    const result = [];
    this.plants.map(plant => {
      const departments = this.currentUser.departments.filter(d => d.plantId === plant.plantId);
      this.user?.departments.map(ud => {
        if (departments.map(d => d.departmentId).includes(ud.departmentId)) return;
        if (ud.plantId !== plant.plantId) return;
        const o = { ...ud };
        o['disabled'] = true
        departments.push(o)
      })
      if (!departments.length) return;
      result.push({ plant, departments, })
    })
    this.departmentsList = result;
  }
  getRoles() {
    this.store.pipe(
      select(roles),
    ).subscribe((roles: Role[]) => {
      if (!roles.length) return;
      const r = this.currentUser.roleId === 1 ? roles
        : roles.filter(i => i.roleId > this.currentUser.roleId)
      this.rolesView = r.map(i => {
        return {
          value: i.roleId,
          viewValue: i.roleName
        }
      })
      this.role.find(i => i.controlId = 'roleId')['options'] = this.rolesView;
    })
  }

  getForm(e: FormGroup) {
    this.forms.push(e);
    if (this.forms.length !== 5) return;
    this.form = new FormGroup({
      f0: this.forms[0],
      f1: this.forms[1],
      f2: this.forms[2],
      f3: this.forms[3],
      f4: this.forms[4],
    })
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.user, value.f0, value.f1, value.f2, value.f3, value.f4)
    })
  }


  // save(){
  //   this.dialogService.close(this.user)    
  // }
  saveDisabled(): boolean {
    return this.form.invalid || !(this.departments.value.length || (this.form.value.f3.roleId < 3));
  }
}


/*
departments: [{…}]
email: null
firstName: "Iegor I"
isActive: true
login: "bob1"
password: null
roles: [{…}]
secondName: "Shkurin"
userId: "0cbb9061-63ea-477b-8787-2a563b3dfc99"
__proto__: Object
__proto__: Object


options: { value: string | number, viewValue: string }
 */