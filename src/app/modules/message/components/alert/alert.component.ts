import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../sevices/message.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  constructor(
    private messageService: MessageService
  ) { }
  ngOnInit() {
    setTimeout(_ => { this.messageService.close() }, 5000)
  }
  close() {
    this.messageService.close()
  }
}
