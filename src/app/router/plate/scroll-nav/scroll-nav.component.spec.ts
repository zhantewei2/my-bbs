import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollNavComponent } from './scroll-nav.component';

describe('ScrollNavComponent', () => {
  let component: ScrollNavComponent;
  let fixture: ComponentFixture<ScrollNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
