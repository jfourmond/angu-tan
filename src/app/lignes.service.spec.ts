import { TestBed, inject } from '@angular/core/testing';

import { LignesService } from './lignes.service';

describe('LignesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LignesService]
    });
  });

  it('should be created', inject([LignesService], (service: LignesService) => {
    expect(service).toBeTruthy();
  }));
});
