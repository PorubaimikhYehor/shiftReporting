import { BaseControl } from '../base/base.model';

export class DynInputF extends BaseControl {  
  type = "inputF";
  placeholder?: string;
  inputType?: string;

  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type); 
    this.name = opt['name'] || this.type
  }
} 