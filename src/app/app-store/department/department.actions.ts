import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Department } from './department.model';

export const getDepartments = createAction(
  '[Department/API] Get Departments',
  props<{ plantId: number }>()
);
export const getDepartmentsSuccess = createAction(
  '[Department/API] Get Departments Success',
  props<{ departments: Department[] }>()
);

export const addDepartment = createAction(
  '[Department/API] Add Department',
  props<{ department: Department }>()
);
export const addDepartmentSucces = createAction(
  '[Department/API] Add Department Succes',
  props<{ department: Department }>()
);
export const updateDepartment = createAction(
  '[Department/API] Update Department',
  props<{ department: Department }>()
);
export const updateDepartmentSuccess = createAction(
  '[Department/API] Update Department Success',
  props<{ department: Update<Department> }>()
);
export const deleteDepartment = createAction(
  '[Department/API] Delete Department',
  props<{ id: number }>()
);
export const deleteDepartmentSucces = createAction(
  '[Department/API] Delete Department Succes',
  props<{ id: number }>()
);
export const clearDepartments = createAction(
  '[Department/API] Clear Departments'
);
export const getUserDepartments = createAction(
  '[Department/API] Get UserDepartments',
  props<{ userId: string }>()
)
export const getUserDepartmentsSucces = createAction(
  '[Department/API] Get UserDepartments Succes',
  props<{ departments: Department[] }>()
)

export const setCurrentDepartment = createAction(
  '[Department/API] Set Current Department',
  props<{ department: Department }>()
);