import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCardComponent } from './master-card.component';

describe('MasterCardComponent', () => {
  let component: MasterCardComponent;
  let fixture: ComponentFixture<MasterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
