import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeliveryshiftscheduleComponent } from './viewdeliveryshiftschedule.component';

describe('ViewdeliveryshiftscheduleComponent', () => {
  let component: ViewdeliveryshiftscheduleComponent;
  let fixture: ComponentFixture<ViewdeliveryshiftscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdeliveryshiftscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeliveryshiftscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
