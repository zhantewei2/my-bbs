import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBtnComponent } from './load-btn.component';

describe('LoadBtnComponent', () => {
  let component: LoadBtnComponent;
  let fixture: ComponentFixture<LoadBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
