import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinPaginationComponent } from './min-pagination.component';

describe('MinPaginationComponent', () => {
  let component: MinPaginationComponent;
  let fixture: ComponentFixture<MinPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
