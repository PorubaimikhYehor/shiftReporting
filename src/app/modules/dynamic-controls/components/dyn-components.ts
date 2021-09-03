import { DynSelectComponent } from './dyn-select/dyn-select.component';
import { DynDatetimeComponent } from './dyn-datetime/dyn-datetime.component';
import { DynCheckboxComponent } from './dyn-checkbox/dyn-checkbox.component';
import { DynNumberComponent } from './dyn-number/dyn-number.component';
import { DynTimeComponent } from './dyn-time/dyn-time.component';
import { DynTextComponent } from './dyn-text/dyn-text.component';
import { DynTextareaComponent } from './dyn-textarea/dyn-textarea.component';
import { DynColorComponent } from './dyn-color/dyn-color.component';
import { DynText } from './dyn-text/dyn-text.model';
import { DynCheckbox } from './dyn-checkbox/dyn-checkbox.model';
import { DynDatetime } from './dyn-datetime/dyn-datetime.model';
import { DynColor } from './dyn-color/dyn-color.model';
import { DynNumber } from './dyn-number/dyn-number.model';
import { DynSelect } from './dyn-select/dyn-select.model';
import { DynTime } from './dyn-time/dyn-time.model';
import { DynTextarea } from './dyn-textarea/dyn-textarea.model';
import { DynLabelComponent } from './dyn-label/dyn-label.component';
import { DynLabel } from './dyn-label/dyn-label.model';
import { DynDate } from './dyn-date/dyn-date.model';
import { DynDateComponent } from './dyn-date/dyn-date.component';
import { DynImageComponent } from './dyn-image/dyn-image.component';
import { DynImage } from './dyn-image/dyn-image.model';
import { DynInputF } from './input-f/inputF.model';
import { InputFComponent } from './input-f/input-f.component';
import { DynTableComponent } from './dyn-table/dyn-table.component';
import { DynTable } from './dyn-table/dyn-table.model';

export const dynComponents = {
  get: function (type) { return this[type].component },
  getList: function () {
    return Object.keys(this).filter(i => this[i].title).map(i => { return { title: this[i].title, key: i } })
  },
  getModel: function (type) { return this[type].model || null },
  
  // input: { component: InputComponent, title: 'Input' },
  label: { component: DynLabelComponent, title: 'Label', model: DynLabel },
  text: { component: DynTextComponent, title: 'Text', model: DynText },
  textarea: { component: DynTextareaComponent, title: 'Textarea', model: DynTextarea },
  number: { component: DynNumberComponent, title: 'Number', model: DynNumber },
  select: { component: DynSelectComponent, title: 'Select', model: DynSelect },
  checkbox: { component: DynCheckboxComponent, title: 'Checkbox', model: DynCheckbox },
  datetime: { component: DynDatetimeComponent, title: 'Datetime', model: DynDatetime },
  time: { component: DynTimeComponent, /* title: 'Time', */ model: DynTime },
  color: { component: DynColorComponent, /* title: 'Color', */ model: DynColor },
  date: { component: DynDateComponent, /* title: 'Date', */ model: DynDate },
  image: { component: DynImageComponent,  title: 'Image',  model: DynImage },
  inputF: { component: InputFComponent,  model: DynInputF },
  table: { component: DynTableComponent, title:"Table", model: DynTable}
}

