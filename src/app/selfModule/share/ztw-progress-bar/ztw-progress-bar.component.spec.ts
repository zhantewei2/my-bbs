import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtwProgressBarComponent } from './ztw-progress-bar.component';

describe('ZtwProgressBarComponent', () => {
  let component: ZtwProgressBarComponent;
  let fixture: ComponentFixture<ZtwProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtwProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtwProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
