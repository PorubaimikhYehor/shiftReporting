import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckerService {
  start(timeout: number = 5000) {
    this.check(timeout)
  }

  private check(timeout: number) {
    this.http.get({url: 'connection/check'})
      .subscribe(x => setTimeout(
        () => this.check(timeout),
        timeout
      ));
  }

  constructor(
    private http: HttpService,
  ) { }
}
