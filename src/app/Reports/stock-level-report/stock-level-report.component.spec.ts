import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLevelReportComponent } from './stock-level-report.component';

describe('StockLevelReportComponent', () => {
  let component: StockLevelReportComponent;
  let fixture: ComponentFixture<StockLevelReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLevelReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLevelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
