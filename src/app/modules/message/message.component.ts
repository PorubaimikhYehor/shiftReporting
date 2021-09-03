import { Component, OnInit } from '@angular/core';
import { MessageService, AppMessage } from './sevices/message.service';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { filter } from 'rxjs/operators';
import { AlertComponent } from './components/alert/alert.component';
import { Store } from '@ngrx/store';
import { State } from '@models/*';
import { isSmallScreen } from 'src/app/app-store';
import { animate, style, transition, trigger } from '@angular/animations';

const messageComponent = {
  loading: LoadingComponent,
  error: ErrorComponent,
  alert: AlertComponent
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('showHideBg', [
      transition(':enter', [
        style({opacity: 0}),
        animate('50ms', style({opacity: .3}))
      ]),
      transition(':leave', [
        style({opacity: .3}),
        animate('50ms', style({opacity: 0}))
      ]),
    ]),
    trigger('showHideMessage', [
      transition(':enter', [
        style({opacity: 0}),
        animate('100ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('100ms', style({opacity: 0}))
      ]),
    ]),
  ]
})
export class MessageComponent implements OnInit {

  message: string;
  component;
  content = null;
  isShow = false;
  isError = false;
  isSmallScreen: boolean = false;
  constructor(
    private messageService: MessageService,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);

    this.messageService.getMessage()
      .pipe(
        filter(v => !!v)
      )
      .subscribe(message => {
        this.isError = message.type === 'error' ? true : false;
        this.content = [[document.createTextNode(message.message)]]
        this.component = messageComponent[message.type];
      });

    this.messageService.getIsShowMessage().subscribe(isShow => this.isShow = isShow)
  }

}
