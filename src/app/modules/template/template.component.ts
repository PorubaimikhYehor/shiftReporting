import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Template } from 'src/app/app-store/template/template.model';
import { FormGroup } from '@angular/forms';
import { DynControl } from '../dynamic-controls/models';
import { Store, select } from '@ngrx/store';
import { State, editingTemplate, templateInterfaces, addedTemplate, configurations, allUsers, currentDepartment, connectionStatus } from 'src/app/app-store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Interface, User } from '@models/*';
import { DashboardService } from './services/dashboard.service';
import { DateService } from 'src/app/services/date/date.service';
import { GridsterOptions } from '../grid';
import { TemplateActions, InterfaseActions, UserActions } from '@actions/*';
import { MatDialog } from '@angular/material/dialog';
import { SettingsControlComponent } from './components/settings-control/settings-control.component';
import { allInterfaces } from './components/interfaces-config/interfaces-config.component';
import { filter, mergeMap, take, tap } from 'rxjs/operators';
import { MessageService } from '../message/sevices/message.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  template: Template;
  departmentId: number;
  dashboard = [];
  options: GridsterOptions = {};
  appointment = 'build';
  selectedControl: DynControl;
  newControlType: string = null;
  isShowTemplateInfo = true
  // title: string = 'Create template';
  // saveButton: string = 'Add';
  formGrinsterOptions: FormGroup;
  interfaces: Interface[];
  storeInterfaces: Interface[];
  isInterfacesEnabled: boolean = false;
  departmentUsers: User[];
  // interfacesUpdating: Interface[]

  options$: Subscription;
  editingTemplate$: Subscription;
  constructor(
    private location: Location,
    private router: Router,
    private store: Store<State>,
    private dashboardService: DashboardService,
    private dateService: DateService,
    private dialog: MatDialog,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getAllUsers());


    this.store.pipe(select(configurations)).pipe(
      tap(config => this.isInterfacesEnabled = <boolean>config.find(c => c.configurationId === 1)?.value || false),
    ).subscribe()


    this.store.pipe(select(templateInterfaces)).subscribe((interfaces: Interface[]) => {
      this.storeInterfaces = [...interfaces];
      this.interfaces = [...interfaces];
    });


    this.options$ = this.dashboardService.getOptions().subscribe(options => {
      if (!options || !this.template) return;
      this.template.body.gridsterOptions = options
      this.options = options;
      this.formGrinsterOptions
    })

    this.editingTemplate$ = this.store.pipe(
      select(editingTemplate),
      tap(template => {
        if (!template) {
          this.router.navigate(['configuration/templates']);
          return;
        }
        let opt = {};

        if (!template._departmentId) opt = template
        else {
          const validFromDate = this.dateService.dateLocalJSON().slice(0, 11) + "00:00:00"
          const validToDate = new Date(validFromDate);
          validToDate.setFullYear(validToDate.getFullYear() + 30);
          opt = {
            templateTypeId: 1,
            templateTypeName: "Shift template",
            validFromDate,
            validToDate: this.dateService.dateLocalJSON(validToDate),
          }
        }
        template.templateId && this.isInterfacesEnabled && this.store.dispatch(InterfaseActions.getInterfaces({ templateId: template.templateId }));
        this.departmentId = template._departmentId;
        this.template = new Template(opt);
        this.dashboard = this.dashboardService.createDashboard(this.template.body.dashboard);
        this.dashboardService.setOptions(this.template.body.gridsterOptions)
        // this.options = this.template.body.gridsterOptions;

        // auro select first ttemplate
        // this.dashboard.length && this.clickItem(this.dashboard[0].controlId)
      }),
      mergeMap(_ => this.store.select(currentDepartment)),
      mergeMap(department => this.store.select(allUsers).pipe(
        tap(users => {
          this.departmentUsers = users.filter(user => user.departments.find(dep => dep.departmentId == department.departmentId));
        })
      ))).subscribe()
  }

  ngOnDestroy(): void {
    this.options$.unsubscribe();
    this.editingTemplate$.unsubscribe();
    this.store.dispatch(InterfaseActions.getInterfacesSuccess({ interfaces: [] }));
  }
  getFormGeneral(e: FormGroup) {
    e.valueChanges.subscribe(value =>
      Object.assign(this.template, value)
    )
  }

  getFormGridsterOptions(e: FormGroup) {
    this.formGrinsterOptions = e
    e.valueChanges.subscribe((values) => {
      this.dashboardService.setOptions(values);
    })
  }

  goBack() {
    this.location.back()
  }
  dropNewItem(gridItem): void {
    this.dashboardService.createNewControl(this.dashboard, gridItem, this.newControlType);
  }

  copyItem(data): void {
    this.dashboardService.copyControl(this.dashboard, data.gridItem, data.control);
  }

  clickItem(controlId) {
    const control = this.dashboard.find(i => i.controlId === controlId);
    const dialogRef = this.dialog.open(SettingsControlComponent, {
      autoFocus: false,
      data: {
        control, body: this.template.body,
        interfaces: this.interfaces,
        isInterfacesEnabled: this.isInterfacesEnabled
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (result === 'clickDelete') {
        this.deleteControl(controlId);
        return
      }
      Object.assign(this.template.body, result.body);
      const control = this.dashboard.find(i => i.controlId === controlId);
      Object.assign(control, result.control);
    })
  }

  dashboardChange(event) {
    this.dashboardService.setOptionsMaxDimention(this.dashboard);
  }


  setTypeNewControl(key) {
    this.newControlType = key
    // this.newControlType = dynComponents.getModel(key);
  }

  removeExcessProps(obj: {}, props: string[]) {
    props.map(prop => delete obj[prop])
  }

  updateInterfaces(templateId) {
    this.interfaces.filter(i => i.updating).map((intface) => {
      delete intface.updating;
      if (this.storeInterfaces.map(({ name }) => name).includes(intface.name)) {
        this.store.dispatch(InterfaseActions.updateInterface({ intface, templateId }));
        return;
      }
      this.store.dispatch(InterfaseActions.addInterface({ intface, templateId }));
    })

  }

  save() {
    if (!this.template.name) {
      this.messageService.errorMessage("Can't save template without name");
      return;
    }
    this.template.body.dashboard = this.dashboard;
    const template: Template = JSON.parse(JSON.stringify(this.template));
    template.body.dashboard.map(i => {
      this.removeExcessProps(i, ['diffGridItem', 'settings', '_settings']);
      this.removeExcessProps(i.gridItem, ['maxItemCols', 'maxItemRows', 'resizeEnabled']);
    })
    template.body.TemplateData = [];
    template.lastUpdated = this.dateService.getLocalDate();
    if (this.departmentId) {
      const departmentId = this.departmentId;
      this.store.dispatch(TemplateActions.addTemplate({ template, departmentId }));
    } else {
      template.templateId && this.store.dispatch(TemplateActions.updateTemplate({ template }));
    }
    this.store.pipe(
      select(addedTemplate),
      filter(val => !!val),
      take(1)
    ).subscribe(temp => {
      this.updateInterfaces(temp.templateId);
      this.store.dispatch(TemplateActions.setAddedTemplate({ template: null }))
      this.store.dispatch(TemplateActions.setEditingTemplate({ template: null }))
      this.router.navigate(['configuration/templates']);
    })
  }

  deleteControl(controlId) {
    const index = this.dashboard.findIndex(i => i.controlId === controlId)
    this.dashboard.splice(index, 1);
  }
  changeStatusInterface(iface: Interface) {
    iface.isActive && this.dashboardService.createControls(this.dashboard, iface, this.template)
    !iface.isActive && this.deleteControls(iface.name);
    // if (event.name !== 'PIAFAttributes' && event.name !== 'PIAFEventFrames') return;
  }
  changeSettingsInterface(iface: Interface) {
    if ((iface.name === 'PIAFAttributes' || iface.name === 'PIAFEventFrames') && iface.isActive) {
      this.deleteControls(iface.name);
      this.dashboardService.createControls(this.dashboard, iface, this.template);
    }
  }
  deleteControls(ifaceName) {
    let controlsId: string[] = [];
    const storage = this.template.body[allInterfaces[ifaceName].storage];
    if (storage.hasOwnProperty('Attributes')) {
      controlsId = <string[]>Object.values(storage).filter(key => typeof (key) === 'string');
      if (ifaceName === 'PIAFAttributes') this.template.body[allInterfaces[ifaceName].storage] = {};
    };
    if (ifaceName === 'PIAFEventFrames') {
      if (Object.keys(storage).length) controlsId = controlsId.concat(storage['Attributes'].map(i => i.key));
      this.template.body[allInterfaces[ifaceName].storage] = {};
    };
    this.dashboard = this.dashboard.filter(({ controlId, forControl }) => !controlsId.includes(controlId) && !controlsId.includes(forControl));
    if (['Excel', 'Xml', 'DatabaseTable'].includes(ifaceName)) this.template.body[allInterfaces[ifaceName].storage] = [];
  }

  addUserToNotifyList(userId: string) {
    if (!~this.template.body.toNotifyUserIdList.indexOf(userId))
      this.template.body.toNotifyUserIdList = this.template.body.toNotifyUserIdList.concat([userId]);
  }

  removeUserFromToNotifyList(userId: string) {
    if (~this.template.body.toNotifyUserIdList.indexOf(userId))
      this.template.body.toNotifyUserIdList = this.template.body.toNotifyUserIdList.filter(id => id != userId);
  }

  addSubmissionApprover(userId: string) {
    if (!~this.template.body.submissionApprovers.indexOf(userId))
      this.template.body.submissionApprovers = this.template.body.submissionApprovers.concat([userId]);
  }

  removeSubmissionApprover(userId: string) {
    if (~this.template.body.submissionApprovers.indexOf(userId))
      this.template.body.submissionApprovers = this.template.body.submissionApprovers.filter(id => id != userId);
  }
}

// PIAFEventFrames
// PIAFAttributes
// Excel
// Xml
// DatabaseTable