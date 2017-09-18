import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerReplyComponent } from './inner-reply.component';

describe('InnerReplyComponent', () => {
  let component: InnerReplyComponent;
  let fixture: ComponentFixture<InnerReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
