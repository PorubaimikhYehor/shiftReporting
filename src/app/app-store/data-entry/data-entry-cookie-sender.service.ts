import { Injectable } from '@angular/core';
import { DataEntry } from '@models/*';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataEntryHttpService } from './data-entry-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataEntryCookieSenderService {

  constructor(
    private cookieService: CookieService,
    private dataEntryHttpService: DataEntryHttpService,
  ) { }

  send(cookieName: string) {
    if (!this.cookieService.check(cookieName)) return;
    const cookie: { action: string, dataEntry: DataEntry } = JSON.parse(this.cookieService.get(cookieName));

    let subscription = this.process(cookie.action, cookie.dataEntry)
      .subscribe(x => {
        if (x) {
          this.cookieService.delete(cookieName);
          subscription.unsubscribe();
        }
      })
  }

  private process(action: string, dataEntry: DataEntry) {
    let result = new BehaviorSubject<boolean>(false);
    if (action == 'add')
      this.add(dataEntry, result);
    if (action == 'update')
      this.update(dataEntry, result);
    if (action == 'submit')
      this.submit(dataEntry, result);

    return result.asObservable();
  }

  private add(dataEntry: DataEntry, result: BehaviorSubject<boolean>) {
    setTimeout(
      () => {
        this.dataEntryHttpService.addDataEntry(dataEntry, true).pipe(
          tap(resp => {
            if (resp)
              result.next(true);
            else
              this.add(dataEntry, result)
          })
        ).subscribe()
      },
      5000
    );
  }

  private update(dataEntry: DataEntry, result: BehaviorSubject<boolean>) {
    setTimeout(
      () => {
        this.dataEntryHttpService.updateDataEntry(dataEntry, true).pipe(
          tap(resp => {
            if (resp)
              result.next(true);
            else
              this.update(dataEntry, result)
          })
        ).subscribe()
      },
      5000
    );
  }

  private submit(dataEntry: DataEntry, result: BehaviorSubject<boolean>) {
    setTimeout(
      () => {
        this.dataEntryHttpService.submitDataEntry(dataEntry, true).pipe(
          tap(resp => {
            if (resp)
              result.next(true);
            else
              this.submit(dataEntry, result)
          })
        ).subscribe()
      },
      5000
    );
  }
}
