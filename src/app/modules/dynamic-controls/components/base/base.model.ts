import { GridsterItem } from 'angular-gridster2';

export class BaseControl {
  controlId: string;
  type = 'base';
  value?: boolean | string | number | null;
  valueType?: string;
  validators?: { [key: string]: boolean | number | string };
  label?: string;
  name?: string;
  bgColor?: string;
  isRemovable?: boolean;
  readonly: boolean;
  // isRequired?: boolean;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  picture: string;

  fSize?:string;
  fFamily?:string;

  gridItem?: Partial<GridsterItem> = {
    cols: 5,
    rows: 1,
    maxItemCols: Infinity,
    maxItemRows: 1,
    resizeEnabled: true,
  };

  settings = [
    { controlId: 'name', label: 'Name', type: 'text', validators: { required: true } },
    { controlId: 'label', label: 'Label', type: 'text' },
    { controlId: 'isRequired', label: 'Required', type: 'checkbox' },

    // { controlId: 'bgColor', label: 'Background', type: 'color' }
  ]


  constructor(opt: {} = {}) {
    this.controlId = opt['controlId'] || null;
    this.value = opt.hasOwnProperty('value') ? opt['value'] : null;
    this.validators = opt['validators'] || {};
    this.label = opt['label'] || '';
    this.name = opt['name'] || '';
    this.bgColor = opt['bgColor'] || '#ffffff';
    this.gridItem = this.setGridItem(opt['gridItem']);
    this.isRemovable = opt['isRemovable'] || true;
    this.readonly = opt['readonly'] || false;
    this.bold = opt['bold'] || false; 
    this.italic = opt['italic'] || false; 
    this.underline = opt['underline'] || false; 
    this.picture = opt.hasOwnProperty('picture') ? opt['picture'] : null;
  
    this.fFamily = opt.hasOwnProperty('fFamily')?opt['fFamily'] || 'inherit':null;
    this.fSize =opt.hasOwnProperty('fSize')? opt['fSize'] || 'inherit':null;
  }

  set isRequired(value: boolean) {
    if (!value) {
      delete this.validators['required'];
      return;
    }
    this.validators['required'] = true;
  }
  get isRequired() {
    return <boolean>this.validators['required'] || false;
  }

  setGridItem(gridItem) {
    if (!gridItem) return null;
    const result = {};
    Object.assign(result, this.gridItem, gridItem)
    result['cols'] = Math.min(result['cols'], this.gridItem.maxItemCols)
    return result
  }
  createControlId?(type) {
    return type + Date.now().toString(16);
  }
}
