import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBlockComponent } from './move-block.component';

describe('MoveBlockComponent', () => {
  let component: MoveBlockComponent;
  let fixture: ComponentFixture<MoveBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
