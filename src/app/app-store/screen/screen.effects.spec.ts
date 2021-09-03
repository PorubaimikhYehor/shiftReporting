import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ScreenEffects } from './screen.effects';

describe('ScreenEffects', () => {
  let actions$: Observable<any>;
  let effects: ScreenEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScreenEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ScreenEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
