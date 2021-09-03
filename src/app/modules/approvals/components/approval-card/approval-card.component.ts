import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataEntry, State, Template } from '@models/*';
import { Store } from '@ngrx/store';
import { isSmallScreen } from 'src/app/app-store';
import { MessageService } from 'src/app/modules/message/sevices/message.service';

@Component({
  selector: 'app-approval-card',
  templateUrl: './approval-card.component.html',
  styleUrls: ['./approval-card.component.scss']
})
export class ApprovalCardComponent implements OnInit {

  @Input() dataEntry: DataEntry;
  @Output() clickCheck = new EventEmitter<number>();
  isSmallScreen: boolean;
  
  constructor(
    private store: Store<State>,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);
  }
  get SubmitDate(){
    return new Date(this.dataEntry.submitDate).toLocaleString()
  }
  check() {
    this.clickCheck.emit(this.dataEntry.dataEntryId);
  }
 
  }



