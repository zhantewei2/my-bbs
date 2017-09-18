import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateUserCardComponent } from './plate-user-card.component';

describe('PlateUserCardComponent', () => {
  let component: PlateUserCardComponent;
  let fixture: ComponentFixture<PlateUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
