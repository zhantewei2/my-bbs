import { TestBed, inject } from '@angular/core/testing';

import { UserMsnService } from './user-msn.service';

describe('UserMsnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserMsnService]
    });
  });

  it('should be created', inject([UserMsnService], (service: UserMsnService) => {
    expect(service).toBeTruthy();
  }));
});
