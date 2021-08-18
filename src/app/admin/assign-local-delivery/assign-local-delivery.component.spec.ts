import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLocalDeliveryComponent } from './assign-local-delivery.component';

describe('AssignLocalDeliveryComponent', () => {
  let component: AssignLocalDeliveryComponent;
  let fixture: ComponentFixture<AssignLocalDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLocalDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLocalDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
