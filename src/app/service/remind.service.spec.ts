import { TestBed, inject } from '@angular/core/testing';

import { RemindService } from './remind.service';

describe('RemindService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemindService]
    });
  });

  it('should be created', inject([RemindService], (service: RemindService) => {
    expect(service).toBeTruthy();
  }));
});
