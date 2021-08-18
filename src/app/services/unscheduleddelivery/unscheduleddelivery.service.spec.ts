import { TestBed } from '@angular/core/testing';

import { UnscheduleddeliveryService } from './unscheduleddelivery.service';

describe('UnscheduleddeliveryService', () => {
  let service: UnscheduleddeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnscheduleddeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
