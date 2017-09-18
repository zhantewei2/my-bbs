import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandListComponent } from './recommand-list.component';

describe('RecommandListComponent', () => {
  let component: RecommandListComponent;
  let fixture: ComponentFixture<RecommandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
