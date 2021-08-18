import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
import { User, State, Department } from '@models/*';
import { tap, filter, mergeMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { DepartmentActions } from '@actions/*';
import { currentDepartment, userDepartments } from 'src/app/app-store';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-user-department',
  templateUrl: './select-user-department.component.html',
  styleUrls: ['./select-user-department.component.scss']
})
export class SelectUserDepartmentComponent implements OnInit {
  @Output() changeDepartment = new EventEmitter<Department>()
  @Input() set disabled(is: boolean) {
    if (is) this.department.disable();
    else this.department.enable();
  }
  department = new FormControl(null);
  departments: Department[]
  constructor(
    private authService: AuthorizationService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(userDepartments).pipe(
      tap(departments => {
        this.departments = departments;
      }),
      mergeMap(_ => this.store.select(currentDepartment)),
      tap(cd => {
        if (!cd) {
          this.departments.length && this.department.setValue(this.departments[0].departmentId);
          return;
        }

        if (cd.departmentId == this.department.value)
          return ;

        this.department.setValue(cd.departmentId);
        this.changeDepartment.emit(this.departments.find(d => d.departmentId == this.department.value));
      })
    ).subscribe();

    this.authService.getCurrentUser()
      .pipe(
        filter(data => !!data),
        tap(({ userId }) => this.store.dispatch(DepartmentActions.getUserDepartments({ userId })))
      ).subscribe()
    this.department.valueChanges.subscribe(val => {
      const department = this.departments.find(d => d.departmentId == val);
      this.changeDepartment.emit(department);
      this.store.dispatch(DepartmentActions.setCurrentDepartment({ department }));
    })
  }
}
