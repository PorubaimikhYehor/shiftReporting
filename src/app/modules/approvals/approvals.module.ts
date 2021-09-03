import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ApprovalsComponent } from './approvals.component';
import { RouterModule } from '@angular/router';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovalCardComponent } from './components/approval-card/approval-card.component';
import { ApprovalProcessComponent } from './components/approval-process/approval-process.component';
import { GridModule } from '../grid';
import { DataEntryModule } from '../data-entry/data-entry.module';




@NgModule({
  declarations: [
    ApprovalsComponent, ApprovalCardComponent,ApprovalProcessComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    UsedMaterialModule,
    DepartmentsModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    DataEntryModule
  ]
})
export class ApprovalsModule { }
