import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySaleOrdersReportComponent } from './weekly-sale-orders-report.component';

describe('WeeklySaleOrdersReportComponent', () => {
  let component: WeeklySaleOrdersReportComponent;
  let fixture: ComponentFixture<WeeklySaleOrdersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklySaleOrdersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklySaleOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
