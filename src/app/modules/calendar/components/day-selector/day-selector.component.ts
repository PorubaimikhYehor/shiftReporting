import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements OnInit {
  @Input() day: Date;
  @Input() disabled?: boolean;
  @Output() changeDay = new EventEmitter<Date>()
  // controlDay = new FormControl('')
  // weekStr: string;
  constructor(
    private dateService: DateService
  ) {

  }
  ngOnInit() {
  }
  get dayInput() { return this.dateService.getLocalDate(this.day).slice(0, 10) }

  change(e) {
    this.changeDay.emit(new Date(e.target.value))
  }
  // dateChange(a, e) {
  //   this.changeDay.emit(e.value)

  // }
  nextDay() {
    const day = new Date(this.day)
    day.setHours(0, 0, 0, 0);
    day.setDate(this.day.getDate() + 1)
    this.changeDay.emit(day)
  }

  prevDay() {
    const day = new Date(this.day)
    day.setHours(0, 0, 0, 0);
    day.setDate(this.day.getDate() - 1)
    this.changeDay.emit(day)
  }
}
