import { TestBed, inject } from '@angular/core/testing';

import { TempDBService } from './temp-db.service';

describe('TempDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TempDBService]
    });
  });

  it('should be created', inject([TempDBService], (service: TempDBService) => {
    expect(service).toBeTruthy();
  }));
});
