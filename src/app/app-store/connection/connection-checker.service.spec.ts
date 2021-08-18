import { TestBed } from '@angular/core/testing';

import { ConnectionCheckerService } from './connection-checker.service';

describe('ConnectionCheckerService', () => {
  let service: ConnectionCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
