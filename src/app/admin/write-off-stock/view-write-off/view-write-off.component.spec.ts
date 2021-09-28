import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWriteOffComponent } from './view-write-off.component';

describe('ViewWriteOffComponent', () => {
  let component: ViewWriteOffComponent;
  let fixture: ComponentFixture<ViewWriteOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWriteOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
