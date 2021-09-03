import { TestBed } from '@angular/core/testing';

import { ScreenSizeUpdaterService } from './screen-size-updater.service';

describe('ScreenSizeUpdaterService', () => {
  let service: ScreenSizeUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
