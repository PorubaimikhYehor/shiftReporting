import { Component, OnInit, Input, Output, EventEmitter, OnChanges, HostListener, ViewChild } from '@angular/core';
import { GridsterItem, GridsterConfig, GridsterItemComponentInterface } from 'angular-gridster2';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

// export interface DboardItem {
//   key: string;
//   gridsterItem: GridsterItem;
//   control: DynControl;
// }
export interface GridsterOptions extends GridsterConfig {
  bgColor?: string;
}
export const optionsBase: GridsterOptions = {
  bgColor: '#888888',
  gridType: 'fit',
  // setGridSize: true,
  // disableWindowResize: true,
  // keepFixedHeightInMobile: true,
  minCols: 10,
  minRows: 10,
  // maxCols: 50,
  // maxRows: 50,
  fixedColWidth: 40,
  fixedRowHeight: 40,
  margin: 4,
  mobileBreakpoint: 1,
  // pushItems: false,
  // outerMargin: true,
  outerMarginTop: 16,
  outerMarginBottom: 16,
  outerMarginLeft: 16,
  outerMarginRight: 16,
  swap: false,

  resizable: {
    enabled: false,
  }
};

export interface dataCopy{
  gridItem:GridsterItem,
  control:DynControl
}


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges {
  @Input() appointment: string;
  @Input() selectedControlId: string;
  @Input() dashboard: DynControl[];
  @Input() options: GridsterOptions = {};
  @Input() form: FormGroup;
  @Input() showInvalid: boolean;
  @Input() controlsErrors //: TemplateDataItem[];
  @Input() blind: boolean;
  @Input() rclickEnabled: boolean;

  @Output() clickItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() dropNewItem: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
  @Output() copyItem: EventEmitter<dataCopy> = new EventEmitter<dataCopy>();
  @Output() dashboardChange: EventEmitter<DynControl[]> = new EventEmitter<DynControl[]>();
  // @Output() optionsChange: EventEmitter<GridsterOptions> = new EventEmitter<GridsterOptions>()

  constructor(){}

  private _optionsBuild: GridsterConfig = {
    itemChangeCallback: (e, i) => this.gridsterItemChange(e, i),
    emptyCellDropCallback: (e, i) => this.emptyCellDrop(e, i),
    enableEmptyCellDrop: true,
    displayGrid: 'onDrag&Resize',
    // displayGrid: 'onDrag&Resize',    
    draggable: {
      delayStart: 0,
      enabled: true,
      dropOverItems: false,
      start: (item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) => {this.dragStart(item, itemComponent, event)},
    },
    resizable: {
      enabled: true,
    },
  };
  gridSize: { [key: string]: string } = {}
  isItemChange = false;
  optionsResult: GridsterOptions = {};
  optionsAppointment: GridsterOptions;
  elementErrors//: ElementError[];
  itemToCopy:DynControl=null;

  mouseMoved: boolean = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseMoved = true;
  }

  ngOnChanges(): void {
    this.processingOptions(this.appointment);
  }

  dragStart(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent): void {
    this.mouseMoved = false;
  }

  processingOptions(appointment: string) {
    const optionsAppointment = appointment === 'build'
      ? this._optionsBuild : {};
    Object.assign(this.optionsResult, optionsBase, optionsAppointment, this.options);
    this.gridSize = this.calcWidthHeight(this.optionsResult, this.dashboard);
    this.changedOptions();
  }
  calcWidthHeight(opt, dashboard: DynControl[]): { [key: string]: string } {
    const {
      fixedColWidth,
      outerMarginLeft,
      outerMarginRight,
      outerMarginTop,
      outerMarginBottom,
    } = opt;
    const result = {}
    let maxX = opt.minCols;
    let maxY = opt.minRows;
    dashboard.map(({ gridItem }) => {
      const x = gridItem.x + gridItem.cols;
      const y = gridItem.y + gridItem.rows;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    });
    result['width'] = (maxX * fixedColWidth + outerMarginLeft + outerMarginRight) + 'px';
    result['height'] = (maxY * fixedColWidth + outerMarginTop + outerMarginBottom) + 'px';
    return result;
  }

  gridsterItemChange(e, i): void {
    this.gridSize = this.calcWidthHeight(this.optionsResult, this.dashboard);
    this.dashboardChange.emit(this.dashboard);
    this.isItemChange = true;
    this.changedOptions();
  }

  itemClick(event, id): void {
    !this.isItemChange && !this.mouseMoved && this.clickItem.emit(id);
    this.isItemChange = false;
  }

  gridRightClick(event): void {
    if(this.rclickEnabled){event.preventDefault();
      let x = event.clientX + 'px';
      let y = event.clientY + 'px';
      this.contextMenuPosition.x = x;
      this.contextMenuPosition.y = y;
      let c = Math.floor(event.offsetX/this.optionsResult.fixedColWidth);
      let r = Math.floor(event.offsetY/this.optionsResult.fixedRowHeight);
      this.contextMenu.menuData = {'c':c,'r':r};
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
    
  }

  itemRightClick(event, id): void {
    event.preventDefault();
    
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'itemId': id };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  
  }
  
  changedOptions() {
    if (this.optionsResult.api && this.optionsResult.api.optionsChanged) {
      this.optionsResult.api.optionsChanged();
    }
  }

  emptyCellDrop(event: MouseEvent, item: GridsterItem) {
    console.log(item);
    this.dropNewItem.emit(item);
  }

  getBackground(dboardItem: DynControl): string {
    return 'white';
    // const data = this.controlsErrors && this.controlsErrors.find(i => i.ControlID === dboardItem.id);
    // return (data && data.HasError)
    //   && 'rgba(255, 140, 140)'
    //   || dboardItem.element.backgroundColor
    //   || 'white';
  }
  getMessageError(dboardItem: DynControl): string {
    return '';
    // const data = this.controlsErrors && this.controlsErrors.find(i => i.ControlID === dboardItem.id);
    // return (data && data.HasError) ? data.ErrorMessage : '';
  }
  // getContent(item) {
  // return `[slot="${item.key}"]`
  // }

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };


  onCopy(id:string){
    this.itemToCopy = this.dashboard.filter(d=>d.controlId==id)[0];
  }

  onPaste(c,r){
    let item:GridsterItem = {rows:this.itemToCopy.gridItem.rows,cols:this.itemToCopy.gridItem.cols,x:c,y:r};

    this.copyItem.emit({gridItem:item,control:this.itemToCopy});
    this.isItemChange = true;
    this.changedOptions();
  }




}
