import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryshiftsComponent } from './deliveryshifts.component';

describe('DeliveryshiftsComponent', () => {
  let component: DeliveryshiftsComponent;
  let fixture: ComponentFixture<DeliveryshiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryshiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryshiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
