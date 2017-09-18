import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelyComponent } from './rely.component';

describe('RelyComponent', () => {
  let component: RelyComponent;
  let fixture: ComponentFixture<RelyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
