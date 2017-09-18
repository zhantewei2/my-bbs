import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImg0Component } from './select-img-0.component';

describe('SelectImg0Component', () => {
  let component: SelectImg0Component;
  let fixture: ComponentFixture<SelectImg0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImg0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImg0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
