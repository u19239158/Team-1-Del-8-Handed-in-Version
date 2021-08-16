import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteOffStockComponent } from './write-off-stock.component';

describe('WriteOffStockComponent', () => {
  let component: WriteOffStockComponent;
  let fixture: ComponentFixture<WriteOffStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteOffStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteOffStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
