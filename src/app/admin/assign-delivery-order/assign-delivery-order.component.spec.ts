import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeliveryOrderComponent } from './assign-delivery-order.component';

describe('AssignDeliveryOrderComponent', () => {
  let component: AssignDeliveryOrderComponent;
  let fixture: ComponentFixture<AssignDeliveryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDeliveryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
