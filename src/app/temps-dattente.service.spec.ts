import { TestBed, inject } from '@angular/core/testing';

import { TempsDattenteService } from './temps-dattente.service';

describe('TempsDattenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TempsDattenteService]
    });
  });

  it('should be created', inject([TempsDattenteService], (service: TempsDattenteService) => {
    expect(service).toBeTruthy();
  }));
});
