import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideVfPackageComponent } from './side-vf-package.component';

describe('SideVfPackageComponent', () => {
  let component: SideVfPackageComponent;
  let fixture: ComponentFixture<SideVfPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideVfPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideVfPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
