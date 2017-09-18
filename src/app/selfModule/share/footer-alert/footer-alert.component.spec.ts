import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAlertComponent } from './footer-alert.component';

describe('FooterAlertComponent', () => {
  let component: FooterAlertComponent;
  let fixture: ComponentFixture<FooterAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
