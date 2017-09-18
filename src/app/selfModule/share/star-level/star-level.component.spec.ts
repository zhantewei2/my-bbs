import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarLevelComponent } from './star-level.component';

describe('StarLevelComponent', () => {
  let component: StarLevelComponent;
  let fixture: ComponentFixture<StarLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
