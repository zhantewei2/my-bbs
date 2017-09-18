import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrefComponent } from './href.component';

describe('HrefComponent', () => {
  let component: HrefComponent;
  let fixture: ComponentFixture<HrefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
