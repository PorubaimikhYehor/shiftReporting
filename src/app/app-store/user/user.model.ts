import { Department } from '../department/department.model';
import { Role } from './role.model';

export class User {
  userId: string = null;
  firstName: string = null;
  secondName: string = null;
  isActive: boolean = null;
  password: string = null;
  email: string = null;
  login: string = null;
  departments: Department[] = null;
  roleId: number = null;
  dataEntriesToApprove: string = null;

  constructor(opt: {} = {}) {
    Object.keys(opt).map(key => {
      if (Object.keys(this).includes(key)) {
        this[key] = opt[key]
      }
    })
  }
}
