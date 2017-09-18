import { TestBed, inject } from '@angular/core/testing';

import { MoveBlockService } from './move-block.service';

describe('MoveBlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoveBlockService]
    });
  });

  it('should be created', inject([MoveBlockService], (service: MoveBlockService) => {
    expect(service).toBeTruthy();
  }));
});
