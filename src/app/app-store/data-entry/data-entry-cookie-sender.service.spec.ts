import { TestBed } from '@angular/core/testing';

import { DataEntryCookieSenderService } from './data-entry-cookie-sender.service';

describe('DataEntryCookieSenderService', () => {
  let service: DataEntryCookieSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEntryCookieSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
