import { Store } from '@ngrx/store';
import { State} from '@models/*';
import { BaseControl } from '../base/base.model';
import { FontFamily, FontSize } from 'src/app/app-store/font/font.model';
import { allFontFamilies, allFontSizes } from 'src/app/app-store';

export class DynLabel extends BaseControl {
  type = 'label';
  valueType = 'string';
  forControl: string;
  private _settings:any[] = [
    { controlId: 'bgColor', label: 'Background color', type: 'color' },
    { controlId: 'bold', label: 'Bold', type: 'checkbox' },
    { controlId: 'italic', label: 'Italic', type: 'checkbox' },
    { controlId: 'underline', label: 'Underline', type: 'checkbox' },
    // { controlId: 'max', label: 'Maximum value', type: 'number' },
  ]

  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.filter(s => s.controlId !== 'isRequired' && s.controlId !== 'name')
    this.settings = this.settings.concat(this._settings);
    this.forControl = opt['forControl'] || null;
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type
  }


}