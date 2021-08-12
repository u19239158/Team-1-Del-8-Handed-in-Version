import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductcategorysComponent } from './add-edit-productcategorys.component';

describe('AddEditProductcategorysComponent', () => {
  let component: AddEditProductcategorysComponent;
  let fixture: ComponentFixture<AddEditProductcategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductcategorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductcategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
