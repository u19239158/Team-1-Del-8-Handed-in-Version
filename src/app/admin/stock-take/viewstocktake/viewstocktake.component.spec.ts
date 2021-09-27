import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstocktakeComponent } from './viewstocktake.component';

describe('ViewstocktakeComponent', () => {
  let component: ViewstocktakeComponent;
  let fixture: ComponentFixture<ViewstocktakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewstocktakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstocktakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
