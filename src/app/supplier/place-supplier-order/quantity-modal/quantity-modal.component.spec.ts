import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityModalComponent } from './quantity-modal.component';

describe('QuantityModalComponent', () => {
  let component: QuantityModalComponent;
  let fixture: ComponentFixture<QuantityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
