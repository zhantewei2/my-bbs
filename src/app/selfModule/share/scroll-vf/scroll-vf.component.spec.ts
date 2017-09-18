import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollVfComponent } from './scroll-vf.component';

describe('ScrollVfComponent', () => {
  let component: ScrollVfComponent;
  let fixture: ComponentFixture<ScrollVfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollVfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollVfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
