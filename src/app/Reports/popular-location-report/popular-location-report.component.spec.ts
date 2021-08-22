import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularLocationReportComponent } from './popular-location-report.component';

describe('PopularLocationReportComponent', () => {
  let component: PopularLocationReportComponent;
  let fixture: ComponentFixture<PopularLocationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularLocationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
