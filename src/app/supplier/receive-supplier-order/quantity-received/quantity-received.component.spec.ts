import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityReceivedComponent } from './quantity-received.component';

describe('QuantityReceivedComponent', () => {
  let component: QuantityReceivedComponent;
  let fixture: ComponentFixture<QuantityReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
