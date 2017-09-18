import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMsnMinComponent } from './user-msn-min.component';

describe('UserMsnMinComponent', () => {
  let component: UserMsnMinComponent;
  let fixture: ComponentFixture<UserMsnMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMsnMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMsnMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
