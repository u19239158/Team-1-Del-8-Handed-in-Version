import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastSellingProductsReportComponent } from './fast-selling-products-report.component';

describe('FastSellingProductsReportComponent', () => {
  let component: FastSellingProductsReportComponent;
  let fixture: ComponentFixture<FastSellingProductsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastSellingProductsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastSellingProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
