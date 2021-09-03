import { Injectable } from '@angular/core';
import { dynComponents } from '../../dynamic-controls';
import { BaseControl, DynControl } from '../../dynamic-controls/models';
import { GridsterItem } from 'angular-gridster2';
import { Interface, Template } from '@models/*';
import { PiafHttpService } from '../../piaf/piaf-http.service';
import { DynLabel } from '../../dynamic-controls/components/dyn-label/dyn-label.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridsterOptions, optionsBase } from '../../grid';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';

interface Atribute {
  name: string;
  type: string;
  label?: string;
  readonly?: boolean;
  valueKey?: string;
  preKey?: string;
  value?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  options = new BehaviorSubject<GridsterOptions>(null)
  preKey: string = 'attr';
  PIAFControlList;
  baseAttributes: { [key: string]: Array<Atribute> } = {
    PIAFEventFrames: [
      { name: 'TemplateName', label: 'Template name', type: 'System.String', readonly: true, },
      { name: 'StartTime', label: 'Start time', type: 'System.DateTime' },
      { name: 'EndTime', label: 'End time', type: 'System.DateTime' },
      { name: 'EventName', label: 'Event name', type: 'System.String' },
    ],
    PIAFAttributes: [
      { name: 'Timestamp', label: 'Template stamp', type: 'System.DateTime', }
    ]
  }

  constructor(
    private piafHttpService: PiafHttpService,
    private dataTypeService: DataTypeService
  ) { }

  setOptions(opt: GridsterOptions) {
    const { minCols, minRows, bgColor } = optionsBase
    const nextOpt = Object.assign({ minCols, minRows, bgColor }, opt);
    this.options.next(nextOpt);
  }
  getOptions(): Observable<GridsterOptions> {
    return this.options.asObservable()
  }
  setOptionsMaxDimention(dashboard) {
    this.setOptions({
      ...this.options.value,
      minRows: Math.max(this.lastRow(dashboard), this.options.value.minRows || 0),
      minCols: Math.max(this.lastCol(dashboard), this.options.value.minCols || 0),
    })
  }
  private lastRow(dashboard: DynControl[]) {
    const arr: number[] = dashboard.map(i => i.gridItem.y + i.gridItem.rows);
    return arr.length ? Math.max.apply(null, arr) : 0
  }
  private lastCol(dashboard: DynControl[]) {
    const arr: number[] = dashboard.map(i => i.gridItem.x + i.gridItem.cols)
    return arr.length ? Math.max.apply(null, arr) : 0
  }


  createDashboard(dashboard: DynControl[]): DynControl[] {
    const result: DynControl[] = [];
    dashboard.map(i => {
      const model = dynComponents.getModel(i.type);
      result.push(new model(i));
    });
    return result;
  }

  createNewControl(dashboard, gridItem, controlTypeKey): DynControl {
    const controlType = dynComponents.getModel(controlTypeKey)
    gridItem.cols = this.getMaxColsS(gridItem, dashboard);
    const newControl = new controlType({ gridItem });
    dashboard.push(newControl)
    return newControl;
  }

  copyControl(dashboard, gridItem, control:DynControl): DynControl {
    const newControl = <DynControl>JSON.parse(JSON.stringify(control));
    gridItem.cols = this.getMaxColsS(gridItem, dashboard);
    newControl.controlId=new BaseControl().createControlId(newControl.type);
    newControl.gridItem = gridItem;
    dashboard.push(newControl)
    return newControl;
  }


  private getMaxColsS(newItem: GridsterItem, dboard: DynControl[]): number {
    const dboardGridster = dboard.map(i => i.gridItem);
    let maxLength = 5; /* maxLength - length of new element */
    for (let i = 1; i <= maxLength; i++) {
      dboardGridster.map(item => {
        if (item.x === newItem.x + i
          && item.y <= newItem.y
          && item.y + item.rows - 1 >= newItem.y) {
          maxLength = i;
        }
      });
    }
    return maxLength;
  }

  createControls(dashboard: DynControl[], iface: Interface, template: Template) {
    this.PIAFControlList = {
      Attributes: [],
    };
    let attributes: Atribute[] = []
    switch (iface.name) {
      case 'PIAFAttributes':
        attributes = attributes.concat(this.baseAttributes[iface.name]);
        this.createAttributeControls(dashboard, attributes);
        template.body.PIAFAttributes = { ...this.PIAFControlList };
        this.setOptionsMaxDimention(dashboard)
        break;
      case 'PIAFEventFrames':
        attributes = attributes.concat(this.baseAttributes[iface.name]);
        this.piafHttpService.getEventFrameTemplate({
          serverName: iface.setting1,
          databaseName: iface.setting2,
          eventFrameTemplateName: iface.setting3,
        }).subscribe(efTemplate => {
          if (efTemplate) efTemplate.attributes.map(attr => attributes.push({ ...attr, preKey: this.preKey, label: attr.name }));
          // console.log(attributes);
          attributes.find(a => a.name === 'TemplateName')['value'] = iface.setting3;
          this.createAttributeControls(dashboard, attributes);
          template.body.PIAFTemplate = { ...this.PIAFControlList };
          this.setOptionsMaxDimention(dashboard)
        });
        break;
      default:
        break
    }
  }

  private createAttributeControls(dashboard: DynControl[], attributes: Atribute[]) {
    attributes.map(attr => {
      const indexY = this.lastRow(dashboard);
      const control = this.createControl(attr, indexY);
      if (!control) return;
      dashboard.push(control);
      dashboard.push(this.createLabel(attr, indexY, control.controlId));
    });
    const lastRow = this.lastRow(dashboard);
    if (this.options.value.minRows < lastRow) this.setOptions({
      ...this.options.value,
      minRows: this.lastRow(dashboard),
    })

  }

  private createLabel(attribute: Atribute, y: number, forControl: string) {
    const gridItem: GridsterItem = { cols: 5, rows: 1, x: 0, y }

    return new DynLabel({
      controlId: 'label-' + attribute.name + '-' + Date.now().toString(16),
      gridItem,
      label: attribute.label,
      name: attribute.name,
      forControl: forControl,
    })
  }

  private createControl(attribute: Atribute, y: number): DynControl {
    const { type, preKey, name } = attribute
    const gridItem: GridsterItem = { cols: 6, rows: 1, x: 5, y };
    const controlType = this.dataTypeService.getType(type)?.allowableControls[0];
    if (!controlType) return null;
    const model = dynComponents.getModel(controlType);
    const controlId = `${preKey ? preKey + '-' : ''}${name}-${controlType}${Date.now().toString(16)}`;
    if (preKey) {
      const attr = { attributeName: name, key: controlId, };
      // attr[name] = controlId;
      this.PIAFControlList.Attributes.push(attr)
    } else {
      this.PIAFControlList[name] = controlId;
    };
    const opt = {
      controlId,
      gridItem,
      label: attribute.label,
      name: attribute.name,
      valueType: attribute.type,
      validators: { required: true },
      readonly: attribute.readonly,
    }
    if (attribute.value) opt['value'] = attribute.value;
    return new model(opt);
  }
}