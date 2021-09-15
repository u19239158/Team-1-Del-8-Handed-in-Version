import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAssignedComponent } from './delivery-assigned.component';

describe('DeliveryAssignedComponent', () => {
  let component: DeliveryAssignedComponent;
  let fixture: ComponentFixture<DeliveryAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
