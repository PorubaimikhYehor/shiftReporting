import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-year-week-selector',
  templateUrl: './year-week-selector.component.html',
  styleUrls: ['./year-week-selector.component.scss']
})
export class YearWeekSelectorComponent implements OnChanges {
  @Input() week: number;
  @Input() year: number;
  @Input() disabled?: boolean;
  @Output() changeWeek = new EventEmitter<{}>()

  weekStr: string;
  constructor(
    private dateService: DateService
  ) {

  }

  ngOnChanges(): void {
    this.weekStr = this.dateService.getWeekString(this.year, this.week);
  }

  getWeekStr(week) {
    return this.dateService.getWeekString(this.year, week)
  }

  get years(): Array<number> {
    const years = []
    for (let i = 0; i < 201; i++) { years[i] = this.year - 100 + i }
    return years
  }

  get weeks(): Array<number> {
    const numOfWeeks = this.dateService.getWeek(new Date(`${this.year}-12-28`))
    const weeks = []
    for (let i = 0; i < numOfWeeks.week; i++) { weeks[i] = i + 1 }
    return weeks
  }

  change(e, key) {
    const week = {
      year: this.year,
      week: this.week
    };
    week[key] = e.value;
    if (key === 'year') week.week = this.week === 53 ? this.dateService.getWeek(new Date(`${e.value}-12-28`)).week : this.week;
    this.changeWeek.emit(week)
  }

  nextWeek() {
    const week = this.dateService.nextWeek(this.year, this.week);
    this.changeWeek.emit(week)
  }

  prevWeek() {
    const week = this.dateService.prevWeek(this.year, this.week);
    this.changeWeek.emit(week)
  }
}