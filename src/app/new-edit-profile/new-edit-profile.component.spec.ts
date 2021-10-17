import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProfileComponent } from './new-edit-profile.component';

describe('NewEditProfileComponent', () => {
  let component: NewEditProfileComponent;
  let fixture: ComponentFixture<NewEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
