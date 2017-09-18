import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReply2Component } from './view-reply2.component';

describe('ViewReply2Component', () => {
  let component: ViewReply2Component;
  let fixture: ComponentFixture<ViewReply2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReply2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReply2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
