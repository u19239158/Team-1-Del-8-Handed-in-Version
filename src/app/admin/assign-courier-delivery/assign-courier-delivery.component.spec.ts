import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourierDeliveryComponent } from './assign-courier-delivery.component';

describe('AssignCourierDeliveryComponent', () => {
  let component: AssignCourierDeliveryComponent;
  let fixture: ComponentFixture<AssignCourierDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCourierDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCourierDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
