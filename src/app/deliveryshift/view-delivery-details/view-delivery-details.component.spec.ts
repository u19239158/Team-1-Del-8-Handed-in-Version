import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryDetailsComponent } from './view-delivery-details.component';

describe('ViewDeliveryDetailsComponent', () => {
  let component: ViewDeliveryDetailsComponent;
  let fixture: ComponentFixture<ViewDeliveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeliveryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
