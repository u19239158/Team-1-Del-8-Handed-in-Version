import { TestBed } from '@angular/core/testing';

import { DeliveryshiftService } from './deliveryshift.service';

describe('DeliveryshiftService', () => {
  let service: DeliveryshiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryshiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
