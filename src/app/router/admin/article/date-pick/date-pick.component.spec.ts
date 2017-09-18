import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickComponent } from './date-pick.component';

describe('DatePickComponent', () => {
  let component: DatePickComponent;
  let fixture: ComponentFixture<DatePickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
