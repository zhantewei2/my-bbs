import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtwTabComponent } from './ztw-tab.component';

describe('ZtwTabComponent', () => {
  let component: ZtwTabComponent;
  let fixture: ComponentFixture<ZtwTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtwTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtwTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
