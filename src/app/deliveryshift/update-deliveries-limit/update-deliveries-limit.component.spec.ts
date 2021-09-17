import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeliveriesLimitComponent } from './update-deliveries-limit.component';

describe('UpdateDeliveriesLimitComponent', () => {
  let component: UpdateDeliveriesLimitComponent;
  let fixture: ComponentFixture<UpdateDeliveriesLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeliveriesLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeliveriesLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
