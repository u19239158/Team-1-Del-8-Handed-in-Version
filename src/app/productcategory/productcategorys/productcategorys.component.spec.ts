import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategorysComponent } from './productcategorys.component';

describe('ProductcategorysComponent', () => {
  let component: ProductcategorysComponent;
  let fixture: ComponentFixture<ProductcategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcategorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
