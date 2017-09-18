import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtwAlertComponent } from './ztw-alert.component';

describe('ZtwAlertComponent', () => {
  let component: ZtwAlertComponent;
  let fixture: ComponentFixture<ZtwAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtwAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtwAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
