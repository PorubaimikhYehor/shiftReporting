import { Template } from '../template/template.model';

export class DataEntry {
  dataEntryId?: number = null;
  scheduleId: number = null;
  templateId: number = null;
  createDate: string = null;
  submitDate: string = null;
  template: Template = null;
  submitUserId: string = null;
  modifiedUserId: string = null;
  isApproved: boolean = null;
  constructor(opt: {} = {}) {
    Object.keys(opt).map(key => {
      if (Object.keys(this).includes(key)) {
        this[key] = opt[key]
      }
    })
    this.template = new Template(opt['template'] || {})
    this.isApproved = false;
  }
}

export interface CurrentDataEntry {
  startDate: Date;
  endDate: Date;
  deadline: Date
  dataEntry: DataEntry;
}

export interface DataEntryLog {
  controlName: string;
  value: string;
  recordDate: string;
  firstName: string;
  secondName: string;
}