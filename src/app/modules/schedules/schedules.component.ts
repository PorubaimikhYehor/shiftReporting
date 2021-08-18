import { Component, OnInit } from '@angular/core';
import { ScheduleActions } from '@actions/*';
import { Store, select } from '@ngrx/store';
import { State, Schedule, Shift } from '@models/*';
import { Subscription } from 'rxjs';
import { allSchedules, connectionStatus } from 'src/app/app-store';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  departmentId: number;
  shift: Shift;
  // shiftId: number;
  schedules: Schedule[] = [];
  list: Schedule[] = [];
  schedules$: Subscription;
  isAddDisabled = true;
  isConnected: boolean;
  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.schedules$ = this.store.pipe(
      select(allSchedules),
      tap(val => this.schedules = val),
      tap(_ => this.createLIst())
    ).subscribe();

    this.store.select(connectionStatus)
      .subscribe(status => this.isConnected = status)
  }
  ngOnDestroy(): void {
    this.schedules$.unsubscribe();
  }

  createLIst() {
    if (this.shift?.shiftId) {
      this.list = this.schedules.filter(i => i.shiftId === this.shift.shiftId);
      if (!this.list.length) this.isAddDisabled = false;
      if (this.list.length) this.isAddDisabled = true;
      return;
    }
    this.list = [...this.schedules];
    this.isAddDisabled = true;
  }

  selectDepartment({ departmentId }) {
    this.departmentId = departmentId;
    this.store.dispatch(ScheduleActions.getSchedules({ departmentId }));
  }
  selectShift(e) {
    this.shift = e;
    this.createLIst();
  }
  addItem() {
    const validFromDate = this.dateService.dateLocalJSON().slice(0, 11) + "00:00:00"
    const validToDate = new Date(validFromDate);
    validToDate.setFullYear(validToDate.getFullYear() + 30);

    // this.openDialog(<Schedule>{})
    // const shift = this.shifts.find(i => i.shiftId === +this.preConfigForm.value['shiftId'])
    const schedule = <Schedule>{
      departmentId: this.departmentId,
      shiftId: this.shift.shiftId,
      shiftName: this.shift.name,
      shiftDescription: this.shift.description,
      validFromDate,
      validToDate: this.dateService.dateLocalJSON(validToDate),

    }
    this.openDialog(schedule)
  }


  edit(id) {
    const schedule = this.schedules.find(i => i.scheduleId === id)
    this.openDialog(schedule)
  }
  openDialog(schedule: Schedule) {
    const dialogRef = this.dialog.open(ScheduleFormComponent, { data: { schedule } })
    dialogRef.afterClosed().subscribe(schedule => {
      if (!schedule) return;
      if (schedule.scheduleId) {
        this.store.dispatch(ScheduleActions.updateSchedule({ schedule }));
        return;
      }
      this.store.dispatch(ScheduleActions.addSchedule({ schedule }));
    });
  }

  delete(id) {
    this.store.dispatch(ScheduleActions.deleteSchedule({ id }))
  }

}
