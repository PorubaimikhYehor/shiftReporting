import { ScreenActions } from '@actions/*';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { State } from '@models/*';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeUpdaterService {

  constructor(
    private bpObserver: BreakpointObserver,
    private store: Store<State>
  ) { }

  start() {
    this.bpObserver.observe('(max-width: 960px)').subscribe(result => {
      this.store.dispatch(ScreenActions.setIsSmallScreen({isSmall: result.matches}));
    })
  }
}