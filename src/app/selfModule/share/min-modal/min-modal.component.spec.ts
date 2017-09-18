import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinModalComponent } from './min-modal.component';

describe('MinModalComponent', () => {
  let component: MinModalComponent;
  let fixture: ComponentFixture<MinModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
