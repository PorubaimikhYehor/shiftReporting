import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { WeekGridComponent } from './components/week-grid/week-grid.component';
import { WeekSelectorComponent } from './components/week-selector/week-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularSvgIconModule } from 'angular-svg-icon';
import { DepartmentsModule } from '../departments/departments.module';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DaySelectorComponent } from './components/day-selector/day-selector.component';
import { YearWeekSelectorComponent } from './components/year-week-selector/year-week-selector.component';
import { GridModule } from '../grid';
import { DataEntryModule } from '../data-entry/data-entry.module';

@NgModule({
  declarations: [CalendarComponent, WeekGridComponent, WeekSelectorComponent, TemplatesListComponent, DaySelectorComponent, YearWeekSelectorComponent,
  ],
  imports: [
    CommonModule,
    // AngularSvgIconModule.forRoot(),
    DepartmentsModule,
    UsedMaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    GridModule,
    DataEntryModule
  ]
})
export class CalendarModule { }
