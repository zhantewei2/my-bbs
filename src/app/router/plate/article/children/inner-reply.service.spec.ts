import { TestBed, inject } from '@angular/core/testing';

import { InnerReplyService } from './inner-reply.service';

describe('InnerReplyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnerReplyService]
    });
  });

  it('should be created', inject([InnerReplyService], (service: InnerReplyService) => {
    expect(service).toBeTruthy();
  }));
});
