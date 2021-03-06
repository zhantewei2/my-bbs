import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrComponent } from './err.component';

describe('ErrComponent', () => {
  let component: ErrComponent;
  let fixture: ComponentFixture<ErrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
