import { TestBed } from '@angular/core/testing';

import { WriteOffStockService } from '../write-off-stock/write-off-stock.service';

describe('WriteOffStockService', () => {
  let service: WriteOffStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteOffStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
