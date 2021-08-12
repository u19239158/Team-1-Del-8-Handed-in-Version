import { TestBed } from '@angular/core/testing';

import { CategorytypeService } from './categorytype.service';

describe('CategorytypeService', () => {
  let service: CategorytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
