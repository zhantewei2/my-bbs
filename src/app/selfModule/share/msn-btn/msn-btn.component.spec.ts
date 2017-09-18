import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsnBtnComponent } from './msn-btn.component';

describe('MsnBtnComponent', () => {
  let component: MsnBtnComponent;
  let fixture: ComponentFixture<MsnBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsnBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsnBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
