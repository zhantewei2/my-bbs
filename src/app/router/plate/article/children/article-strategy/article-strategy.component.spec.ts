import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleStrategyComponent } from './article-strategy.component';

describe('ArticleStrategyComponent', () => {
  let component: ArticleStrategyComponent;
  let fixture: ComponentFixture<ArticleStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
