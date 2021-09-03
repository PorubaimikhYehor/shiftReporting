import { Component, OnInit } from '@angular/core';
import { DataEntry, State, DynControl, User, CurrentDataEntry } from '@models/*';
import { Store, select } from '@ngrx/store';
import { currentDataEntry } from 'src/app/app-store';
import { switchMap, tap, mergeMap, map, filter, skip, take } from 'rxjs/operators';
import { GridsterOptions } from '../grid';
import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { DataEntryActions, FontActions } from '@actions/*';
import { AuthorizationService } from '../authorization/authorization.service';
import { MessageService } from '../message/sevices/message.service';
import { DateService } from 'src/app/services/date/date.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { DataSourceService } from './data-source.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  dataEntry: DataEntry;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  title: string = 'Entry ';
  dashboard: DynControl[] = [];
  options: GridsterOptions = {};
  values: {} = {};
  form: FormGroup;
  user: User
  isSaveEnabled = false;
  isSmallScreen: boolean = false;

  getData$: Subscription
  constructor(
    private store: Store<State>,
    private authService: AuthorizationService,
    private message: MessageService,
    private dateService: DateService,
    private location: Location,
    private router: Router,
    private dataSourceService: DataSourceService,
    private bpObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(FontActions.getFontFamilies());
    this.store.dispatch(FontActions.getFontSizes());
    this.getDataEntry();
    this.bpObserver.observe('(max-width: 960px)').subscribe(result => {
      this.isSmallScreen = result.matches;
    })
  }
  ngOnDestroy(): void {
    this.getData$.unsubscribe();
  }

  getDataEntry() {
    const opt = <DataEntry>{};
    this.getData$ = this.store.pipe(
      select(currentDataEntry),
      filter(data => {
        if (!data) {
          this.router.navigate(['/calendar']);
          return;
        }
        if (data.dataEntry.template.body.dashboard.length) return true;
        this.message.alertMessage('This template has no controls. You need to set up controls to use the template');
        return false;
      }),
      take(1),
      tap((cDataEntry: CurrentDataEntry) => {
        Object.assign(opt, cDataEntry.dataEntry);
        this.startDate = cDataEntry.startDate;
        this.endDate = cDataEntry.endDate;
        this.deadline = cDataEntry.deadline;
        this.title = cDataEntry.dataEntry.template.name;
        // if (!cDataEntry.dataEntry.submitDate)
        //   this.isSaveEnabled = this.dateService.isBetween(new Date(), cDataEntry.startDate, cDataEntry.deadline)
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
        this.dataEntry.dataEntryId && this.store.dispatch(DataEntryActions.getDataEntryLogs({ dataEntryId: this.dataEntry.dataEntryId }));
        this.dashboard = <DynControl[]>this.dataEntry.template.body?.dashboard || [];
        this.options = this.dataEntry.template.body?.gridsterOptions || {};
        this.getSavePermission()
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

  goBack() {
    this.location.back()
  }

  getSavePermission(): boolean {
    if ((this.dataEntry.submitDate) || (new Date() < this.startDate) || (this.user.roleId === 4) || (this.user.roleId === 5 && new Date() > this.deadline)) {
      (this.user.roleId === 3 && new Date() > this.deadline) && this.message.errorMessage('Saving is not possible. Time is running out.');
      this.isSaveEnabled = false;
      return false;
    }
    this.isSaveEnabled = true;
    return true;
  }

  getCreateDate(): string {
    return this.dateService.isBetween(new Date(), this.startDate, this.endDate)
      ? this.dateService.getLocalDate() : this.dateService.getLocalDate(this.endDate.getTime() - 1000);
  }

  save() {
    this.store.pipe(
      select(currentDataEntry),
      skip(1),
      take(1)
    ).subscribe(d => {
      this.router.navigate(['/calendar']);
    })
    if (!this.getSavePermission()) return;
    if (this.dataEntry.dataEntryId) {
      this.store.dispatch(DataEntryActions.updateDataEntry({ dataEntry: this.dataEntry }));
      return;
    }
    this.dataEntry.createDate = this.getCreateDate();
    this.store.dispatch(DataEntryActions.addDataEntry({ dataEntry: this.dataEntry }));
  }

  submitDataEntry() {
    this.store.pipe(
      select(currentDataEntry),
      skip(1),
      take(1)
    ).subscribe(d => {
      this.router.navigate(['/calendar']);
    })
    if (!this.getSavePermission()) return;
    this.dataEntry.createDate = this.dataEntry.createDate || this.getCreateDate();
    this.dataEntry.submitDate = this.dateService.getLocalDate();
    this.dataEntry.submitUserId = this.user.userId;
    this.store.dispatch(DataEntryActions.submitDataEntry({ dataEntry: this.dataEntry }));
  }
}

