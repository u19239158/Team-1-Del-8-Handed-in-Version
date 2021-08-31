import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustProfileComponent } from './edit-cust-profile.component';

describe('EditCustProfileComponent', () => {
  let component: EditCustProfileComponent;
  let fixture: ComponentFixture<EditCustProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
