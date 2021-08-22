import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostFrequentBuyersReportComponent } from './most-frequent-buyers-report.component';

describe('MostFrequentBuyersReportComponent', () => {
  let component: MostFrequentBuyersReportComponent;
  let fixture: ComponentFixture<MostFrequentBuyersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostFrequentBuyersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostFrequentBuyersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
