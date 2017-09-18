import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishStatisticsComponent } from './publish-statistics.component';

describe('PublishStatisticsComponent', () => {
  let component: PublishStatisticsComponent;
  let fixture: ComponentFixture<PublishStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
