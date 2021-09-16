import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureOrderComponent } from './capture-order.component';

describe('CaptureOrderComponent', () => {
  let component: CaptureOrderComponent;
  let fixture: ComponentFixture<CaptureOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
