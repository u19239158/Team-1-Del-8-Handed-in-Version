import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategorytypesComponent } from './add-edit-categorytypes.component';

describe('AddEditCategorytypesComponent', () => {
  let component: AddEditCategorytypesComponent;
  let fixture: ComponentFixture<AddEditCategorytypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCategorytypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCategorytypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
