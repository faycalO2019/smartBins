import { TestBed } from '@angular/core/testing';

import { PoubelleService } from './poubelle.service';

describe('PoubelleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoubelleService = TestBed.get(PoubelleService);
    expect(service).toBeTruthy();
  });
});
