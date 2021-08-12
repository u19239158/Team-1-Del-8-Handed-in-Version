import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliveryshiftsComponent } from './add-edit-deliveryshift.component';

describe('AddEditDeliveryshiftsComponent', () => {
  let component: AddEditDeliveryshiftsComponent;
  let fixture: ComponentFixture<AddEditDeliveryshiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeliveryshiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliveryshiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
