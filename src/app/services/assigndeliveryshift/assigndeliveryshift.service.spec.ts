import { TestBed } from '@angular/core/testing';

import { AssigndeliveryshiftService } from './assigndeliveryshift.service';

describe('AssigndeliveryshiftService', () => {
  let service: AssigndeliveryshiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssigndeliveryshiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
