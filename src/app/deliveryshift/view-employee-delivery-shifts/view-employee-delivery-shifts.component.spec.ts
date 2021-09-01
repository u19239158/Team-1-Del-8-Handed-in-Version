import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeDeliveryShiftsComponent } from './view-employee-delivery-shifts.component';

describe('ViewEmployeeDeliveryShiftsComponent', () => {
  let component: ViewEmployeeDeliveryShiftsComponent;
  let fixture: ComponentFixture<ViewEmployeeDeliveryShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeeDeliveryShiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeDeliveryShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
