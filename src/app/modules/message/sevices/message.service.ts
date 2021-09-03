import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { LoadingComponent } from '../components/loading/loading.component'
import { BehaviorSubject, Observable } from 'rxjs';


export interface AppMessage {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSourse = new BehaviorSubject<AppMessage>(null);
  private message = this.messageSourse.asObservable();

  private isShowMessageSourse = new BehaviorSubject<boolean>(null);
  private isShowMessage = this.isShowMessageSourse.asObservable();

  private messages: AppMessage[] = [];

  getMessage(): Observable<AppMessage> {
    return this.message;
  }
  setMessage(message: AppMessage): void {
    this.messageSourse.next(message);
    this.isShowMessageSourse.next(!!message)
  }


  getIsShowMessage(): Observable<boolean> {
    return this.isShowMessage;
  }

  private setIsShowMessage(isShow: boolean): void {
    this.isShowMessageSourse.next(isShow);
  }


  loadingMessage(message: string) {
    if (!message) return;
    this.pushMessage({
      message,
      type: 'loading'
    })
  }

  errorMessage(message: string) {
    if (!message) return;
    this.pushMessage({
      message,
      type: 'error'
    })
  }
  alertMessage(message: string) {
    // this.close();
    if (!message) return;
    this.pushMessage({
      message,
      type: 'alert'
    })
  }

  close() {
    // this.setMessage(null);
    // this.setIsShowMessage(false)

    if (this.messages.length)
      this.messages.shift();

    this.updateCurrentMessage();
  }

  pushMessage(message: AppMessage) {
    this.messages.push(message);

    this.updateCurrentMessage();
  }

  updateCurrentMessage() {
    if (!this.messages.length) {
      this.setMessage(null);
      this.setIsShowMessage(false);
      return;
    }

    if ((this.messages[0].type == 'loading' || this.messages[0].type == 'alert') && this.messages.length > 1) {
      this.messages.shift();
      this.updateCurrentMessage();
      return;
    }

    this.setMessage(this.messages[0]);
    this.setIsShowMessage(true);
  }
} 
