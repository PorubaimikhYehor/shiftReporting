import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Store, select } from '@ngrx/store';
import { DataEntry, State, Template, User } from '@models/*';
import { DataEntryActions, TemplateActions, } from '@actions/*';
import { allTemplates, connectionStatus, dataEntriesWaitingForApproval, isSmallScreen, userDepartments } from 'src/app/app-store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date/date.service';
import { FontFamily, FontSize } from 'src/app/app-store/font/font.model';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit, OnDestroy {

  currentUser: User;
  departmentId: number;
  dataEntries: DataEntry[] = [];
  dataEntries$: Subscription;
  isConnected: boolean;
  search = new FormControl('');
  isSmallScreen: boolean;

  constructor(
    private store: Store<State>,
    private router: Router,
    private authService:AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
    .subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = user;
      // this.selectDepartment({ value: user.departments[0].departmentId })
    });

    this.store.dispatch(DataEntryActions.getPendingDataEntries({userId:this.currentUser.userId}))
    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);
    this.store.select(connectionStatus)
      .subscribe(status => this.isConnected = status)
    
    this.dataEntries$ = this.store.pipe(
      select(dataEntriesWaitingForApproval)
    ).subscribe(dataEntries => {
      this.dataEntries = dataEntries;
     

    }
    
    );

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dataEntries$.unsubscribe();
  }
  
  approveDataEntry(dataEntryId:number){
    this.store.dispatch(DataEntryActions.getDataEntryById({dataEntryId: dataEntryId})); 
    this.router.navigate(['configuration/approvals/dataentry']);
  }
  
    
}
