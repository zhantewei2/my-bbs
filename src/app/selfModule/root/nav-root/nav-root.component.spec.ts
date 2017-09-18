import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavRootComponent } from './nav-root.component';

describe('NavRootComponent', () => {
  let component: NavRootComponent;
  let fixture: ComponentFixture<NavRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
