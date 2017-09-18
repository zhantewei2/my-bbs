import { TestBed, inject } from '@angular/core/testing';

import { GetCgRgService } from './get-cg-rg.service';

describe('GetCgRgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCgRgService]
    });
  });

  it('should be created', inject([GetCgRgService], (service: GetCgRgService) => {
    expect(service).toBeTruthy();
  }));
});
