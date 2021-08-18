import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Department } from './department.model';
import * as DepartmentActions from './department.actions';

export const departmentsFeatureKey = 'departments';

export interface State extends EntityState<Department> {
  // additional entities state properties
  userDepartments: Department[];
  currentDepartment: Department;
}

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>({
  selectId: (model: Department) => model.departmentId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  userDepartments: [],
  currentDepartment: null
});

const departmentReducer = createReducer(
  initialState,
  on(DepartmentActions.addDepartmentSucces,
    (state, action) => adapter.addOne(action.department, state)
  ),
  on(DepartmentActions.updateDepartmentSuccess,
    (state, action) => adapter.updateOne(action.department, state)
  ),
  on(DepartmentActions.deleteDepartmentSucces,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(DepartmentActions.getDepartmentsSuccess,
    (state, action) => adapter.setAll(action.departments, state)
  ),
  on(DepartmentActions.clearDepartments,
    state => adapter.removeAll(state)
  ),
  on(DepartmentActions.getUserDepartmentsSucces,
    (state, { departments }) => ({ ...state, userDepartments: departments })
  ),
  on(DepartmentActions.setCurrentDepartment,
    (state, { department }) => ({ ...state, currentDepartment: department })
  ),
  

);

export function reducer(state: State | undefined, action: Action) {
  return departmentReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
