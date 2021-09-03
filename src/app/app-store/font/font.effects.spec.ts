import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FontEffects } from './font.effects';

describe('FontEffects', () => {
  let actions$: Observable<any>;
  let effects: FontEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FontEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FontEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
