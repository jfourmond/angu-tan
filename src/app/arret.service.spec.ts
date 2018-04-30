import { TestBed, inject } from '@angular/core/testing';

import { ArretService } from './arret.service';

describe('ArretService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArretService]
    });
  });

  it('should be created', inject([ArretService], (service: ArretService) => {
    expect(service).toBeTruthy();
  }));
});
