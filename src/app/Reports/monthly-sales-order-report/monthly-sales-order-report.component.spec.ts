import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesOrderReportComponent } from './monthly-sales-order-report.component';

describe('MonthlySalesOrderReportComponent', () => {
  let component: MonthlySalesOrderReportComponent;
  let fixture: ComponentFixture<MonthlySalesOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySalesOrderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySalesOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
