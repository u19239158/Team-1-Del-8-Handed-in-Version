import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytypesComponent } from './categorytypes.component';

describe('CategorytypesComponent', () => {
  let component: CategorytypesComponent;
  let fixture: ComponentFixture<CategorytypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorytypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorytypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
