import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateBriefComponent } from './plate-brief.component';

describe('PlateBriefComponent', () => {
  let component: PlateBriefComponent;
  let fixture: ComponentFixture<PlateBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
