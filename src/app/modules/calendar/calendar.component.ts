import { Component, OnInit, OnDestroy } from '@angular/core';
import { Schedule, State, DataEntry } from '@models/*';
import { ScheduleActions, TemplateActions, DataEntryActions } from '@actions/*';
import { Store, select } from '@ngrx/store';
import { allSchedules, connectionStatus } from 'src/app/app-store';
import { DateService } from 'src/app/services/date/date.service';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  schedules: Schedule[];
  date: Date;
  week: number;
  year: number;
  departmentId = null;
  weekYear: { year: number, week: number };
  weekDataEntries: DataEntry[];
  day: Date;
  isConnected: boolean;

  constructor(
    private store: Store<State>,
    private dateService: DateService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.calendarService.getCalendarState()
      .subscribe(state => {
        const { day, week, year } = state;
        this.day = day;
        this.week = week;
        this.year = year;
        this.getDataEntry(this.day);
      })
    this.getSchedules();

    this.store.select(connectionStatus)
        .subscribe(status => this.isConnected = status);
  }

  ngOnDestroy() {
    // this.store.dispatch(ScheduleActions.clearSchedules());
  }

  setState(state: { week: number, year: number, day: Date }) {
    this.calendarService.setCalendarState(state)
  }

  getSchedules() {
    this.store.pipe(
      select(allSchedules)
    ).subscribe(schedules => this.schedules = schedules)
  }

  changeDepartment(e) {
    const departmentId = this.departmentId = e.departmentId
    this.store.dispatch(ScheduleActions.getSchedules({ departmentId }));
    this.store.dispatch(TemplateActions.getTemplates({ departmentId }));
    this.getDataEntry(this.day);
  }
  getDataEntry(day?: Date) {
    if ((!this.departmentId || !this.week || !this.year) && (!this.departmentId || !day)) {
      this.store.dispatch(DataEntryActions.setDataEntriesOnDate({ dataEntries: [] }))
      return;
    }
    let date;
    if (day) {
      const from = new Date(day);
      const to = new Date(day);

      from.setDate(day.getDate() - 1)
      to.setDate(day.getDate() + 1)
      date = {
        from: this.dateService.getLocalDate(from.setDate(day.getDate() - 1)),
        to: this.dateService.getLocalDate(to.setDate(day.getDate() + 1)),
      }
    } else {
      date = this.dateService.getWeekJSON(this.year, this.week);
    }

    this.store.dispatch(DataEntryActions.getDataEntriesOnDate({
      departmentId: this.departmentId,
      fromDate: date.from,
      toDate: date.to
    }))
  }


  setDay(day) {
    this.setState({ day, week: 1, year: 1 })
  }
  dayView() {
    if (this.day || !this.isConnected) return;
    const day = this.dateService.getMonday(this.year, this.week)
    this.setState({ day, week: 1, year: 1 })
  }

  setWeek(e) {
    const week = e.week;
    const year = e.year;
    this.setState({ day: null, week, year })
  }
  
  weekView() {
    if (!this.isConnected) return;
    const weekYear = this.dateService.getWeek(this.day);
    const week = weekYear.week;
    const year = weekYear.year;
    this.setState({ day: null, week, year })
  }
}
