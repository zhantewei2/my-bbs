import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfNtfComponent } from './self-ntf.component';

describe('SelfNtfComponent', () => {
  let component: SelfNtfComponent;
  let fixture: ComponentFixture<SelfNtfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfNtfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfNtfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
