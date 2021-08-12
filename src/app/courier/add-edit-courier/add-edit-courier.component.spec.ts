import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCourierComponent } from './add-edit-courier.component';

describe('AddEditCourierComponent', () => {
  let component: AddEditCourierComponent;
  let fixture: ComponentFixture<AddEditCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCourierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
