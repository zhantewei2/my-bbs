import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtwPaginationComponent } from './ztw-pagination.component';

describe('ZtwPaginationComponent', () => {
  let component: ZtwPaginationComponent;
  let fixture: ComponentFixture<ZtwPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtwPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtwPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
