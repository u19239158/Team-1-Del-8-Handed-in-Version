import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowSellingProductsReportComponent } from './slow-selling-products-report.component';

describe('SlowSellingProductsReportComponent', () => {
  let component: SlowSellingProductsReportComponent;
  let fixture: ComponentFixture<SlowSellingProductsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlowSellingProductsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlowSellingProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
