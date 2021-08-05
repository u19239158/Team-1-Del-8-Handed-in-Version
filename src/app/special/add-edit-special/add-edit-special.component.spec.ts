import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSpecialComponent } from './add-edit-special.component';

describe('AddEditSpecialComponent', () => {
  let component: AddEditSpecialComponent;
  let fixture: ComponentFixture<AddEditSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
