import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { DataEntry, State, CurrentDataEntry, User } from '@models/*';
import { currentDataEntry, pendingDataEntry } from 'src/app/app-store';
import { switchMap, mergeMap, map, tap, take, filter, skip } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DataSourceService } from 'src/app/modules/data-entry/data-source.service';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DynControl } from '@models/*';
import { DataEntryActions } from '@actions/*';
import { GridsterOptions } from 'src/app/modules/grid';
import { MessageService } from 'src/app/modules/message/sevices/message.service';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-approval-process',
  templateUrl: './approval-process.component.html',
  styleUrls: ['./approval-process.component.scss']
})
export class ApprovalProcessComponent implements OnInit {

  dataEntry: DataEntry;
  getData$: Subscription;
  values: {} = {};
  dashboard: DynControl[] = [];
  form: FormGroup;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  title: string = 'Entry ';
  user: User;
  options: GridsterOptions = {};
  isSaveEnabled = false;
  isSmallScreen: boolean = false;
  @Input() DataEntryId: number;

  constructor(
    private store: Store<State>,
    private dataSourceService: DataSourceService,
    private authService: AuthorizationService,
    private message: MessageService,
    private dateService: DateService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getDataEntry();
  }

  ngOnDestroy(): void {
    this.getData$.unsubscribe();
  }

  goBack() {
    this.location.back()
  }

  approve() {
    this.store.pipe(
      select(currentDataEntry),
      skip(1),
      take(1)
    ).subscribe(d => {
      this.goBack();
    })
    this.store.dispatch(DataEntryActions.approveDataEntry({dataEntryId: this.dataEntry.dataEntryId, approverId: this.user.userId}));
  }

  reject() {
    this.store.pipe(
      select(currentDataEntry),
      skip(1),
      take(1)
    ).subscribe(d => {
      this.goBack();
    })
    this.store.dispatch(DataEntryActions.rejectDataEntry({dataEntryId: this.dataEntry.dataEntryId, approverId: this.user.userId}));
  }


  getDataEntry() {

    const opt = <DataEntry>{};
    this.getData$ = this.store.pipe(
    select(pendingDataEntry),
    tap((pDataEntry: DataEntry) => {
      Object.assign(opt, pDataEntry);
    }),
    mergeMap(_ => this.authService.getCurrentUser()),
    filter(data => !!data),
    map((user: User) => {
      this.user = user;
      opt.modifiedUserId = user.userId;
      return opt;
    }),
    tap(opt => {
      this.dataEntry = new DataEntry(opt);
      this.dataEntry.dataEntryId ?? delete this.dataEntry.dataEntryId;
      this.dashboard = <DynControl[]>this.dataEntry.template.body?.dashboard || [];
      this.options = this.dataEntry.template.body?.gridsterOptions || {};
    }),
    switchMap(opt => {
      if (opt.dataEntryId) return of(opt);
      return this.dataSourceService.getDatasources(opt.templateId).pipe(
        map(data => data.map(i => this.values[i.key] = i.value)),
        map(_ => opt),
      )
    }),
    switchMap(opt => {
      Object.assign(this.values, this.dataEntry.template.body?.templateDataKV || {});
      this.form = this.createForm(this.dashboard);
      this.dataEntry.template.body.templateDataKV = this.form.value;
      return this.form.valueChanges;
    }),
    tap(values => this.dataEntry.template.body.templateDataKV = values),
  ).subscribe()
}


createForm(controls: DynControl[]): FormGroup {
  const group = new FormGroup({});
  controls.map(control => {
    if (control.type === 'label') return;
    const validators: ValidatorFn[] = [];
    control.validators && Object.keys(control.validators).map(vKey => {
      if (vKey === 'startShiftDatetimeValidation') {
        control['min'] = this.dateService.getLocalDate(this.startDate);
        return;
      }
      if (vKey === 'endShiftDatetimeValidation') {
        control['max'] = this.dateService.getLocalDate(this.endDate);
        return;
      }

      if (typeof (control.validators[vKey]) === 'boolean') validators.push(Validators[vKey])
      else validators.push(Validators[vKey](control.validators[vKey]));
    });
    group.addControl(control.controlId, new FormControl(this.setValue(control, this.values), validators));
  });
  return group;
}

setValue(control: DynControl, values): string | boolean | number {
  if (control.value) return control.value
  if (!values
    || values[control.controlId] === null
    || values[control.controlId] === undefined) return null;

  switch (control.type) {
    case 'datetime':
      const a = new Date(values[control.controlId])
      return new Date(a.valueOf() - a.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, 16);
    default:
      return values[control.controlId]
  }
}

}
