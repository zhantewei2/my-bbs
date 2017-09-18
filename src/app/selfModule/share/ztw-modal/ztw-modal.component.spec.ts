import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtwModalComponent } from './ztw-modal.component';

describe('ZtwModalComponent', () => {
  let component: ZtwModalComponent;
  let fixture: ComponentFixture<ZtwModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtwModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtwModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
