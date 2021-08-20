import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnlineSalesComponent } from './search-online-sales.component';

describe('SearchOnlineSalesComponent', () => {
  let component: SearchOnlineSalesComponent;
  let fixture: ComponentFixture<SearchOnlineSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOnlineSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOnlineSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
