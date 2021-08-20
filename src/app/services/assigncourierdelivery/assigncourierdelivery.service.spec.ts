import { TestBed } from '@angular/core/testing';

import { AssigncourierdeliveryService } from './assigncourierdelivery.service';

describe('AssigncourierdeliveryService', () => {
  let service: AssigncourierdeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssigncourierdeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
