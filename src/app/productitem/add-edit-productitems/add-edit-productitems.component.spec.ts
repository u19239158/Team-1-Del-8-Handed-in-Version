import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductitemsComponent } from './add-edit-productitems.component';

describe('AddEditProductitemsComponent', () => {
  let component: AddEditProductitemsComponent;
  let fixture: ComponentFixture<AddEditProductitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
