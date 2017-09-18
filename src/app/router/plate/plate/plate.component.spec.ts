import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateComponent } from './plate.component';

describe('PlateComponent', () => {
  let component: PlateComponent;
  let fixture: ComponentFixture<PlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
